import supabase from "../config/supabaseClient";

const CreateRecord = async (tableName, record) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    const recordData = {...record, user_id}
    const { data, error } = await supabase
      .from(tableName)
      .insert([recordData])
      .select();

    if (error) {
      console.error(`Error creating ${tableName}:`, error);
      
    }
    
    return data;
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
};

export default CreateRecord;
