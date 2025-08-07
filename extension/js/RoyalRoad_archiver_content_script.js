// Set if this is a webnovel's index page or not into the session storage.
const IS_NOVEL_INDEX_PAGE = is_novel_index_page();

// Define the archival buttons & options:
const BEGIN_ARCHIVAL_BUTTON = document.createElement("button"); BEGIN_ARCHIVAL_BUTTON.disabled = true;


// Connect to the background script and build an event listeners.
let background_script_port = browser.runtime.connect();

background_script_port.onMessage.addListener((message) => { on_message_from_background_script(message); });
background_script_port.onDisconnect.addListener(() => { background_script_port = undefined; }); // Set the background script port to undefined when the disconnect listener is triggered.

// Ask the background script if wasm has loaded yet?
background_script_port.postMessage({"WASM_LOADED_STATUS": undefined});
const WASM_STATUS_REQUEST_TIMEOUT = 250; // The wasm status sleep duration in milliseconds.
const WASM_STATUS_REQUEST_MAX_TRIES = 6; // The maximum number of tries the extension will request the status of the wasm module in the background script before giving up and throwing an error.
let wasm_status_request_tries = 1; // Counter for how many times the extension has requested the status of the wasm module.

/** !--Functions start here--! */

/**
 * Checks if the current webpage is a webnovel index page.
 * 
 * This is worked out by checking for the existence of the following meta tag:
 * `<meta property="og:type" content="books.book">`
 */
function is_novel_index_page() {
    let meta_tags = document.head.getElementsByTagName('meta');

    for (let i = 0; i < meta_tags.length; i+=1) {
        if (meta_tags[i].getAttribute("property") == "og:type") {
            if (meta_tags[i].getAttribute("content") == "books.book") { return true; }
        }
    }

    return false;
}

/**
 * Function to run when a message is received from the background script.
 */
function on_message_from_background_script(message) {
    switch (Object.keys(message)[0]) {
        
        /**
         * WASM_LOADED_STATUS: bool
         */
        case "WASM_LOADED_STATUS": {
            message_wasm_loaded_status(message);
            break;
        }

        /**
         * Default case for when the switch statement does not have the message key.
         */
        default: {
            console.log("[ERROR] Unable to parse message key: " + Object.keys(message)[0]);
            break;
        }
    }
}
/**
 * Check if the wasm module in the background script is loaded then do shit.
 * 
 * If not keep checking every n seconds x times.
 * The limits for this is defined via WASM_STATUS_REQUEST_TIMEOUT & WASM_STATUS_REQUEST_MAX_TRIES.
 */
async function message_wasm_loaded_status(message) {
    if (message["WASM_LOADED_STATUS"] == true) {
        if (IS_NOVEL_INDEX_PAGE) { add_archival_buttons(); } // Only add archival buttons to the index page.
    }
    else {
        if (wasm_status_request_tries == WASM_STATUS_REQUEST_MAX_TRIES) {
            console.log("[ERROR] Unable to verify the status of the WASM module.\nThis extension will not function.");
            return;
        }

        await new Promise(r => setTimeout(r, WASM_STATUS_REQUEST_TIMEOUT)); // Sleep for WASM_STATUS_REQUEST_TIMEOUT milliseconds.
        background_script_port.postMessage({"WASM_LOADED_STATUS": undefined});
        wasm_status_request_tries +=1;
    }
}

/**
 * Adds the archival buttons and any options to the webnovel index page.
 * Also binds the begin_archival() function to the archival_button's onclick event.
 * 
 * CSS for this is stored in `../css/RoyalRoad.css`
 */
function add_archival_buttons() {
    let page_content_div = document.getElementsByClassName("page-content-inner")[0];

    let archival_buttons_div = document.createElement("div");
    archival_buttons_div.id = "archival_buttons_div";

    BEGIN_ARCHIVAL_BUTTON.id = "begin_archive_button";
    BEGIN_ARCHIVAL_BUTTON.innerText = "Begin archival!"
    BEGIN_ARCHIVAL_BUTTON.addEventListener("click", () => { begin_archival() });
    archival_buttons_div.appendChild(BEGIN_ARCHIVAL_BUTTON);

    page_content_div.insertAdjacentElement("afterbegin", archival_buttons_div);
}

/**
 * Begins the archival process using the options set in the archival_buttons_div.
 * (If there are any options to be set.)
 */
function begin_archival() {

}