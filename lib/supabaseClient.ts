import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabaseの環境変数が設定されていません");
}

// 緊急
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
console.log("supabaseServiceRoleKey", supabaseServiceRoleKey);
if (!supabaseServiceRoleKey) {
  throw new Error("Supabaseのサービスロールキーが設定されていません");
}
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
