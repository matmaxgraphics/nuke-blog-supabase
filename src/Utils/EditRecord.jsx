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
      return { data: null, error };
    }

    if (data) {
      console.log("Data from Supabase:", data);
      return { data, error: null };
    }
  } catch (error) {
    console.error("Error updating record:", error);
    return { data: null, error };
  }
};

export default EditRecord;
