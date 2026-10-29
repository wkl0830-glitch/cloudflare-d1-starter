import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Bindings, Item } from './types';

const app = new Hono<{ Bindings: Bindings }>();

// 啟用 CORS
app.use('/api/*', cors());

// 健康檢查
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 1. 取得所有項目清單 (GET /api/items)
app.get('/api/items', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM items ORDER BY id DESC'
    ).all<Item>();

    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 2. 取得單一項目 (GET /api/items/:id)
app.get('/api/items/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const item = await c.env.DB.prepare(
      'SELECT * FROM items WHERE id = ?'
    )
      .bind(id)
      .first<Item>();

    if (!item) {
      return c.json({ success: false, error: '找不到該項目' }, 404);
    }

    return c.json({ success: true, data: item });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 3. 新增項目 (POST /api/items)
app.post('/api/items', async (c) => {
  try {
    const body = await c.req.json<{ title: string; content?: string }>();

    if (!body.title || !body.title.trim()) {
      return c.json({ success: false, error: '標題不可為空' }, 400);
    }

    const result = await c.env.DB.prepare(
      'INSERT INTO items (title, content, status) VALUES (?, ?, ?)'
    )
      .bind(body.title.trim(), body.content || '', 'pending')
      .run();

    return c.json(
      { success: true, message: '新增成功', id: result.meta.last_row_id },
      201
    );
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 4. 更新項目狀態或內容 (PUT /api/items/:id)
app.put('/api/items/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json<{
      title?: string;
      content?: string;
      status?: 'pending' | 'completed';
    }>();

    const current = await c.env.DB.prepare('SELECT * FROM items WHERE id = ?')
      .bind(id)
      .first<Item>();

    if (!current) {
      return c.json({ success: false, error: '找不到該項目' }, 404);
    }

    const newTitle = body.title !== undefined ? body.title : current.title;
    const newContent = body.content !== undefined ? body.content : current.content;
    const newStatus = body.status !== undefined ? body.status : current.status;

    await c.env.DB.prepare(
      'UPDATE items SET title = ?, content = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    )
      .bind(newTitle, newContent, newStatus, id)
      .run();

    return c.json({ success: true, message: '更新成功' });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 5. 刪除項目 (DELETE /api/items/:id)
app.delete('/api/items/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const result = await c.env.DB.prepare('DELETE FROM items WHERE id = ?')
      .bind(id)
      .run();

    if (result.meta.changes === 0) {
      return c.json({ success: false, error: '找不到欲刪除的項目' }, 404);
    }

    return c.json({ success: true, message: '刪除成功' });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default app;
