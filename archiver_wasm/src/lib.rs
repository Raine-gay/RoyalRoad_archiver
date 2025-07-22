#![allow(non_snake_case)] // Gets rid of the annoying "Oh no the project is using a non snake case name" warning.

use time::OffsetDateTime;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}

/// Prints a log message to the RoyalRoad Archiver extension background service saying Wasm has loaded correctly.
///
/// If this message is not present in the console, something has gone wrong loading Wasm.
#[wasm_bindgen]
pub fn check_wasm() {
    match OffsetDateTime::now_local() {
        Ok(time) => { log(format!("[{0}] RoyalRoad Archiver: Wasm Module loaded correctly.",
                time
            ).as_str());
        }
        Err(_) => { log("[INDETERMINATE TIME] RoyalRoad Archiver: The Wasm Module seems to have loaded, but it could not get the local time. Everything else could work fine, or it could be fucked. Who knows.",); }
    }
}