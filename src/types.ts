export type Bindings = {
  DB: D1Database;
};

export type Item = {
  id: number;
  title: string;
  content: string;
  status: 'pending' | 'completed';
  created_at: string;
  updated_at: string;
};
