import supabase from "../config/supabaseClient";

const EditRecord = async (tableName, record, id) => {
  console.log("Table Name:", tableName);
  console.log("Record to Update:", record);
  console.log("ID:", id);
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

    console.log(data);

    return data;
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
};

export default EditRecord;
