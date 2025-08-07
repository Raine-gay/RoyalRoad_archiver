#![allow(non_snake_case)] // Gets rid of the annoying "Oh no the project is using a non snake case name" warning.

use wasm_bindgen::prelude::*;

/// Prints a log message to the RoyalRoad Archiver extension background service saying Wasm has loaded correctly.
///
/// If this message is not present in the console, something has gone wrong loading Wasm.
#[wasm_bindgen]
pub fn test_wasm() -> bool {
    wasm_logger::init(wasm_logger::Config::default());

    log::info!("Wasm Module loaded correctly.");
    return true;
}