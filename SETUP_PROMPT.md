# 🤖 OpenCode 自動啟動引導指令

親愛的 OpenCode，請依序自動執行以下步驟，將此 Cloudflare + D1 全端專案初始化並啟動：

---

### 步驟 1：安裝依賴套件
- 檢查當前目錄，並自動在終端機執行：
  ```bash
  npm install
  ```

---

### 步驟 2：建立遠端 Cloudflare D1 資料庫與自動綁定
1. 在終端機執行建立 D1 資料庫指令：
   ```bash
   npx wrangler d1 create my-starter-db
   ```
2. **非常重要**：
   - 讀取終端機輸出結果中的 `database_id`（UUID 格式）。
   - 自動開啟專案根目錄的 `wrangler.jsonc`。
   - 將 `"database_id": "REPLACE_WITH_YOUR_D1_DATABASE_ID"` 替換為實際取得的 `database_id`。
   - 保存 `wrangler.jsonc`。

---

### 步驟 3：套用資料庫 Migration（本地環境）
- 在終端機執行本地資料庫初始化：
  ```bash
  npx wrangler d1 migrations apply my-starter-db --local
  ```
- 當終端機詢問確認（Yes/No）時，請自動確認套用。

---

### 步驟 4：本地啟動與驗證
1. 執行本地開發伺服器：
   ```bash
   npm run dev
   ```
2. 檢查本地伺服器是否有正常在 `http://localhost:8787` 啟動。
3. 測試呼叫 API：
   - 驗證 `GET /api/items` 是否有成功回傳初始的 2 筆資料。
4. 在對話框中向使用者回報：
   - 「🎉 專案已成功在本地端啟動！可前往 http://localhost:8787 預覽成果。」
   - 同時詢問使用者：「是否需要我為您將資料庫與網站正式發布到 Cloudflare 上線（執行 `wrangler deploy`）？」
