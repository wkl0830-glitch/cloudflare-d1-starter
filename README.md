# ⚡ Cloudflare + D1 全端極速範本 (OpenCode 開箱即用版)

這是一個專門為 **OpenCode 初學者** 設計的 Cloudflare + D1 全端網頁 Starter Kit。
已經預先寫好完整的 **Hono 後端 CRUD API**、**D1 資料庫 Migration** 與 **TailwindCSS 現代美觀前端**。

---

## 🚀 最速上手方式（只要複製一句話）

### 第 1 步：登入 Cloudflare（只要做一次）
在你的終端機（Terminal）輸入以下指令完成 Cloudflare 帳號登入：
```bash
npx wrangler login
```
*(瀏覽器跳出後點擊同意即可)*

---

### 第 2 步：打開 OpenCode，複製並貼上這句話！

打開 OpenCode，直接在對話框中貼上這段話：

> 💬 **「請讀取 SETUP_PROMPT.md，幫我自動安裝套件、建立 D1 資料庫、套用本地遷移並啟動測試！」**

🔥 **OpenCode 就會全自動完成：**
1. 自動跑 `npm install`。
2. 自動執行 `wrangler d1 create` 建立遠端資料庫。
3. 自動把取得到的 `database_id` 填寫進 `wrangler.jsonc`。
4. 自動跑本地 Migration（建立 items 資料表並塞入 2 筆範例資料）。
5. 自動跑 `npm run dev` 啟動網站並在終端機中測試確認。

你只要打開瀏覽器輸入 `http://localhost:8787`，就可以看到立即可用的全端網頁！

---

## 🛠️ 開發與常用指令

如果你想手動執行或自訂指令：

| 指令 | 說明 |
| :--- | :--- |
| `npm run dev` | 啟動本地開發環境 (`http://localhost:8787`) |
| `npm run db:create` | 建立遠端 D1 資料庫 |
| `npm run db:migrate:local` | 將 Migration 套用到本地 D1 資料庫 |
| `npm run db:migrate:remote`| 將 Migration 套用到雲端正式 D1 資料庫 |
| `npm run deploy` | 部署整個網站到 Cloudflare 上線 |

---

## 💡 如何指揮 OpenCode 幫你擴充功能？

專案跑起來之後，你可以隨時對 OpenCode 說：
- **增加新欄位**：「我想在待辦事項中加入『優先級（priority: high/medium/low）』欄位，請幫我寫新的 migration 並更新 API 與前端介面。」
- **做新功能**：「請幫我新增一個搜尋功能，可以在前端即時搜尋標題與內容。」
- **準備上線**：「請幫我把 Migration 套用到正式遠端 D1 資料庫，並執行 `wrangler deploy` 部署上線！」
