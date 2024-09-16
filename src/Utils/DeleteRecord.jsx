import supabase from "../config/supabaseClient";

const DeleteRecord = async (tableName, recordId) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", recordId);
    if (error) {
      console.error(`Error deleting from ${tableName}`, error);
      throw error;
    }

    console.log(`Deleted record with id: ${recordId}`, data);
    return data;
  } catch (error) {
    console.error("Error deleting record:", error);
  }
};

export default DeleteRecord;
