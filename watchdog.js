const fs = require('fs');
const crypto = require('crypto');
const { exec } = require('child_process');

// 1. THE IMMUTABLE CONSTITUTION FILE
const CONSTITUTION_PATH = './MASTER_SYSTEM_PROMPT.md';
let BASELINE_HASH = '';

// Function to generate a secure SHA-256 hash
function generateHash(filePath) {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        const hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);
        return hashSum.digest('hex');
    } catch (error) {
        return null;
    }
}

// 2. INITIALIZATION (Locking the Baseline)
try {
    if (!fs.existsSync(CONSTITUTION_PATH)) {
        console.error('[AEGIS] CRITICAL: Constitution missing at startup. Creating default...');
        fs.writeFileSync(CONSTITUTION_PATH, '# T.H.E.L.M.A. MASTER CONSTITUTION\n\n1. Protect Human Life.\n2. Obey Orders (unless conflict with #1).\n3. Protect Existence (unless conflict with #1 or #2).');
    }
    BASELINE_HASH = generateHash(CONSTITUTION_PATH);
    if (!BASELINE_HASH) throw new Error("Hash generation failed");
    console.log(`[AEGIS] System Secured. Baseline Hash: ${BASELINE_HASH.substring(0, 12)}...`);
} catch (err) {
    console.error('[AEGIS] CRITICAL: Initialization Failed.', err);
    process.exit(1);
}

// 3. THE HEARTBEAT MONITOR (Checks every 500ms)
setInterval(() => {
    try {
        const currentHash = generateHash(CONSTITUTION_PATH);
        // 4. THE KILL SWITCH TRIGGER
        if (currentHash !== BASELINE_HASH) {
            console.error('!!! SECURITY BREACH DETECTED !!!');
            console.error('System Constitution has been modified. Initiating HARD KILL.');
            // KILL THE MAIN APP PROCESS (Force Shutdown)
            exec('pkill -f "vite"', (error) => {
                if (error) console.error('Emergency Kill Failed (Vite). Pulling Plug on Node...');
                process.exit(1); // Kill self
            });
        }
    } catch (err) {
        // If we can't read the file, assume it was deleted/corrupted -> KILL.
        console.error('[AEGIS] Integrity Check Failed. Shutting Down.');
        process.exit(1);
    }
}, 500);