import { createClient } from "@supabase/supabase-js";

export const useDatabase = () => {
  const supabaseUrl = "https://okhmiydbagubyoeheoso.supabase.co";
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseKey) {
    throw new Error(
      "Supabase key is not defined. Please set the SUPABASE_KEY environment variable."
    );
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Function to add an item to a specified table
  const addItem = async (table: string, item: Record<string, any>) => {
    const { data, error } = await supabase.from(table).insert([item]);
    if (error) {
      throw error;
    }
    return data;
  };

  return {
    supabase,
    addItem,
  };
};
