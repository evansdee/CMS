import supabase from "./supabase";

export async function updateCourseCount({item, countId}) {
  const { data, error } = await supabase
    .from("courseCounter")
    .update(item)
    .eq("courseCode", countId)
    .select()

    console.log(data)
  if (error) throw new Error("Failed to update count");
  return data;
}

export async function getCount() {
  const { data, error } = await supabase.from("courseCounter").select("*");
  if (error) throw new Error("Failed to fetch count");

  return data;
}

