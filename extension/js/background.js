import initWasmModule, { check_wasm } from "../wasm/royal_road_archiver.js"

(async () => {
    await initWasmModule();
    check_wasm();
})();