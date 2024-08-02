import supabase from "./supabase";

export async function getSession() {
  let { data, error } = await supabase.from("session_course").select("*");

  if (error) throw new Error("Failed to fetch Courses");

  return data;
}

export async function createEditSession(newSession, id) {
  let query = supabase.from("session_course");

  if (!id) query = query.insert([newSession]);
  if (id) query = query.update({ ...newSession }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) throw new Error("Session not Uploaded");

  return data;
}

export async function deleteSession(id) {
  const { data,error } = await supabase
    .from("session_course")
    .delete()
    .eq("id", id);

  if (error) throw new Error("Session not Uploaded");

  return data
}
