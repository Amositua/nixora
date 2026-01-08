import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kjsxhoclcgqoptilmptv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqc3hob2NsY2dxb3B0aWxtcHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NTIxODIsImV4cCI6MjA4MTEyODE4Mn0.znR1ojf_8E6WazbKwLdlbcRbfVy0YxdFl5DUqif7IAg";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
