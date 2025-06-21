
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://okhmiydbagubyoeheoso.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error(
    "Supabase key is not defined. Please set the SUPABASE_KEY environment variable."
  );
}

// Create a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

export const useDatabase = () => {
  // Function to add an item to a specified table
  interface GuestItem {
    name: string;
    number_of_quests: number;
    diets?: string;
  }

  // AUTH
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // DATA
  const addItem = async (table: string, item: GuestItem) => {
    const { data, error } = await supabase.from(table).insert([item]);
    if (error) {
      throw error;
    }
    return data;
  };

  const getItems = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
      throw error;
    }
    return data;
  };

  return {
    addItem,
    getItems,
    getUser,
    signIn,
    signOut,
  };
};
