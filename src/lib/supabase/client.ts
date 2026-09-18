import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sfojwjlbhbhxppfxgxxb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmb2p3amxiaGJoeHBwZnhneHhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2ODQzNjksImV4cCI6MjEwNTI2MDM2OX0.IRTS689f2ehvYh_mbGDmUykN0A2w5fZ0FEcab5cgiWo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
