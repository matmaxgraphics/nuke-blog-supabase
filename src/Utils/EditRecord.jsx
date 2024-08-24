import supabase from "../config/supabaseClient";

const EditRecord = async (tableName, record, id) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update([record])
      .eq("id", id)
      .select();

    if (error) {
      console.error(`Error updating ${tableName}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
};

export default EditRecord;
