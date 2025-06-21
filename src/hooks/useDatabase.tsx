import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://okhmiydbagubyoeheoso.supabase.co'
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

  const addItem = async (table: string, item: GuestItem) => {
    const { data, error } = await supabase.from(table).insert([item]);
    if (error) {
      throw error;
    }
    return data;
  };
  // Function to get all items from a specified table
  const getItems = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
      throw error;
    }
    return data;
  };

  return {
    supabase,
    addItem,
    getItems,
  };
};
