
#!/bin/bash
# T.H.E.L.M.A. Deployment Script
# Target: Google Cloud Run
# Region: us-central1 (Default)
PROJECT_ID="thelma-core-integrator"
SERVICE_NAME="thelma-poc-core"
REGION="us-central1"
echo "============================================"
echo "   T.H.E.L.M.A. CLOUD LAUNCH SEQUENCE"
echo "============================================"
echo "Project: $PROJECT_ID"
echo "Service: $SERVICE_NAME"
echo "Region:  $REGION"
echo "============================================"
# 0. Master Boot Sequence Check
# Ensure Dependencies
python3 -m pip install -r requirements.txt
# Hotfix for boot manager
python3 -m pip install pyyaml
echo "[0/3] Initiating Pre-Flight System Check..."
python3 system_boot_manager.py
if [ $? -ne 0 ]; then
    echo " "
    echo "FATAL: System Diagnostics FAILED. Aborting Deployment."
    echo "Run './master_boot.sh' locally to diagnose issues."
    exit 1
fi
echo "System Condition: GREEN. Proceeding to Build."
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
# 0.5 Build React Frontend
echo "[0.5/3] Compiling T.H.E.L.M.A. Frontend Interface..."
cd frontend
if [ -d "node_modules" ]; then
  echo "Node modules found. Skipping install..."
else
  echo "Installing Frontend Dependencies..."
  npm install
fi
echo "Building React Application..."
# Ensure API Key is available to Vite at build time
export GEMINI_API_KEY=$GEMINI_API_KEY
npm run build
cd ..
echo "[1/3] Building Container Image..."
~/google-cloud-sdk/bin/gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME --project $PROJECT_ID
# 2. Deploy to Cloud Run
echo "[2/3] Deploying to Cloud Run..."
# Load Env Vars
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
~/google-cloud-sdk/bin/gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --project $PROJECT_ID \
  --labels dev-tutorial=devnewyear2026 \
  --set-env-vars GEMINI_API_KEY=$GEMINI_API_KEY
# 3. Validation
echo "[3/3] Deployment Complete. Verifying..."
SERVICE_URL=$(~/google-cloud-sdk/bin/gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --project $PROJECT_ID --format 'value(status.url)')
echo " "
echo "SUCCESS: System Online at $SERVICE_URL"
echo " "
python3 tools/voice_module.py "Deployment Complete. System Online."
python3 tools/n8n_uplink.py "DEPLOYMENT_SUCCESS" "deploy.sh" "Cloud Run Deployment Verified. System Online."
