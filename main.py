
import os
from dotenv import load_dotenv
load_dotenv()
import json
import sqlite3
from flask import Flask, jsonify, request, render_template
import time
# Import Core Agents
from core.henry import HenryStrategy
from core.percy import PercySecurity
from core.thelma import ThelmaIdentity
from core.inception import InceptionUnit
app = Flask(__name__, static_folder='frontend/dist', static_url_path='')
# --- AGENT INITIALIZATION ---
henry = HenryStrategy()
percy = PercySecurity()
thelma_persona = ThelmaIdentity()
inception = InceptionUnit()
@app.route('/')
def home():
    """Serve React Frontend"""
    return app.send_static_file('index.html')
@app.route('/api/command', methods=['POST'])
def execute_command():
    """
    Voice Command Execution Endpoint
    """
    data = request.json
    cmd = data.get("cmd", "")
    print(f"[THELMA] Voice Command Received: {cmd}")
    
    # Henry parses the intent
    result = henry.execute_corpus_command(cmd)
    
    # Percy Validates (Redundant safety check)
    if result.get("action") == "TRIGGER_V4_BARRIER":
        allowed, reason = percy.validate_action("EXECUTE", cmd)
        if not allowed:
             result["percy_audit"] = reason
    return jsonify(result)
@app.route('/training')
def training_hub():
    """ Interactive Training Federation """
    return render_template('training.html')
@app.route('/api/status', methods=['GET'])
def system_status():
    """Returns the health of all agents"""
    return jsonify({
        "status": "OPERATIONAL",
        "system": "THELMA_POC_v2",
        "timestamp": time.time(),
        "agents": {
            "THELMA": {"status": "ONLINE", "persona": thelma_persona.NAME},
            "HENRY": {"status": "ONLINE", "mode": "LOGIC_OPTIMIZATION"},
            "PERCY": {"status": "ONLINE", "mode": "STRICT_ENFORCEMENT"}
        }
    })
@app.route('/api/memory/upload', methods=['POST'])
def memory_upload():
    """
    Memory Node Ingestion Endpoint
    Receives files (images, PDFs) from Mobile Companion.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    file_type = request.form.get('type', 'unknown') # receipt, signature, vision
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    # Ensure Memory Node Directory Exists
    memory_path = os.path.join(os.getcwd(), 'memory_node', file_type)
    os.makedirs(memory_path, exist_ok=True)
    
    # Save File
    timestamp = int(time.time())
    filename = f"{timestamp}_{file.filename}"
    save_path = os.path.join(memory_path, filename)
    file.save(save_path)
    
    print(f"[MEMORY NODE] Stored {file_type}: {filename}")
    
    # Log to Henry
    henry.log_metric(f"create_{file_type}", 1)
    return jsonify({"status": "SUCCESS", "path": save_path, "id": timestamp})
@app.route('/strategy/analyze', methods=['POST'])
def strategy_analyze():
    """
    Endpoint for Henry to analyze an objective (e.g. from n8n).
    """
    data = request.json
    objective = data.get("objective", "")
    
    # Security Check
    allowed, reason = percy.validate_action("ANALYZE", "STRATEGY_CORE")
    if not allowed:
        return jsonify({"error": reason}), 403
    # Execute Strategy
    result = henry.analyze_objective(objective)
    return jsonify(result)
@app.route('/assets/scan', methods=['POST'])
def asset_scan():
    """
    Endpoint for Inception to scan assets.
    """
    # Security Check
    # In a real deployed env, scanning '.' is the container, which is fine for demo.
    data = request.json
    target = data.get("path", ".")
    
    allowed, reason = percy.validate_action("SCAN", target)
    if not allowed:
        return jsonify({"error": reason}), 403
    manifest = inception.scan_directory(target)
    return jsonify({"count": len(manifest), "preview": manifest[:5]})
# Initialize Uplink
try:
    from tools.n8n_uplink import send_update
    send_update("SYSTEM_INIT", "main.py", "T.H.E.L.M.A. CORE ONLINE.")
except Exception as e:
    print(f"Uplink Init Failed: {e}")
if __name__ == "__main__":
    # Cloud Run expects the app to listen on PORT env var
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
