# Cloudflare + D1 專案工作規範

當使用者在這個專案中與你對話時，請遵循以下原則：
1. 本專案使用 Hono + Cloudflare Workers + D1 資料庫 + 原生靜態前端（Tailwind CSS）。
2. 配置檔採用 `wrangler.jsonc`。
3. 如果使用者要求「初始化專案」或「啟動」，請直接閱讀並執行 `SETUP_PROMPT.md` 中的步驟。
4. 資料庫查詢請一律使用參數化查詢（`prepare.bind(...)`），嚴禁字串拼接 SQL，以確保資訊安全。
5. 所有本地測試優先使用 `--local`，不要在測試階段影響雲端正式資料。
