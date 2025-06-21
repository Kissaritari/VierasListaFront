import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useMemo } from 'react';

export function useSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://okhmiydbagubyoeheoso.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseAnonKey) {
    throw new Error('Supabase key is not defined. Please set the SUPABASE_KEY environment variable.');
  }
  // Memoize client so it's not recreated on every render
  return useMemo(() => createClient(supabaseUrl, supabaseAnonKey), [supabaseUrl, supabaseAnonKey]);
}
