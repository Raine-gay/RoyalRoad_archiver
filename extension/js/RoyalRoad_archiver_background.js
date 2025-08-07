// Import the wasm module.
import initWasmModule, { 
    test_wasm,
} from "../wasm/RoyalRoad_archiver.js"

// Variable to denote if wasm has been loaded yet.
let wasm_loaded = false;


// Create an event listener for the content script connecting.
browser.runtime.onConnect.addListener(content_script_runtime_connected);

// Check the Wasm module is loaded correctly. A message should be logged inside the extension's log.
// This async block will break listeners.
(async () => {
    await initWasmModule();
    if(test_wasm()) {
        wasm_loaded = true;
    }
    else {
        console.log("[ERROR] Wasm module unable to load.")
    }
})();

/**
 * Init function for when the content_script establishes contact with the background script.
 */
function content_script_runtime_connected(content_script_port) {
    content_script_port.onMessage.addListener((message) => {on_message_from_content_script(content_script_port, message);})
    //browser.runtime.onSuspend.addListener(() => {content_script_port.postMessage({"SUSPENDING": undefined});}); // Create a listener that tells the content script the background script is about to suspend.
}

/**
 * Function to run when a message is received from the content script.
 */
function on_message_from_content_script(content_script_port, message) {
    switch (Object.keys(message)[0]) {

        /**
         * WASM_LOADED_STATUS: undefined
         */
        case "WASM_LOADED_STATUS": {
            message_wasm_loaded_status();
            break;
        }

        /**
         * Default case for when the switch statement does not have the message key.
         */
        default: {
            console.log("[ERROR] Unable to parse message key: " + Object.keys(message)[0])
            break;
        }
    }
}

/**
 * Used by the content script to check if the background script is functional and that wasm has been loaded.
 * This code will send back the wasm status to the content script.
 */
function message_wasm_loaded_status() {
    content_script_port.postMessage({"WASM_LOADED_STATUS": wasm_loaded})
}