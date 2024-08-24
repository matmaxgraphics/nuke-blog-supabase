import supabase from "../config/supabaseClient";

const EditRecord = async (tableName, record) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert([record])
      .select();

    if (error) {
      console.error(`Error creating ${tableName}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
};

export default EditRecord;
