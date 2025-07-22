import initWasmModule, { check_wasm } from "../wasm/RoyalRoad_archiver.js"

(async () => {
    await initWasmModule();
    check_wasm();
})();