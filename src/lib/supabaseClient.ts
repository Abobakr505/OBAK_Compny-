// ثم، أنشئ ملفًا للعميل، مثل supabaseClient.ts أو .js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dozxegbyisebwxnotigx.supabase.co'; // استبدل بـ URL مشروعك في Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvenhlZ2J5aXNlYnd4bm90aWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMzI0ODIsImV4cCI6MjA3MzYwODQ4Mn0.twOK0tf2RIXfylvTK6Lyr7ZMrNRoVomyTQTcpWEbTRo'; // استبدل بـ Anon Key من Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);