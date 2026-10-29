-- 建立基礎示範表格：備忘/任務清單
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  status TEXT DEFAULT 'pending', -- pending, completed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 插入 2 筆初始示範資料
INSERT INTO items (title, content, status) VALUES 
('歡迎使用 Cloudflare + D1', '這個專案由 OpenCode 自動建置完成！', 'completed'),
('探索 D1 資料庫操作', '試著新增、更新或刪除這筆資料吧！', 'pending');
