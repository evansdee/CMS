import supabase, { supabaseUrl } from "./supabase";

export async function addUpdateCourse(newCourse, id) {
  const imageName = `${Math.random()}-${newCourse.certImg.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/certificates/${imageName}`;

  let query = supabase.from("course");

  if(id) query = query.update({ ...newCourse }).eq("id", id);

  if (!id) query = query.insert([{ ...newCourse, certImg: imagePath }]);

  const { data, error } = await query.select().single();
  if (error) throw new Error("Course not added");

  const { error: storageError } = await supabase.storage
    .from("certificates")
    .upload(imageName, newCourse.certImg);

  if (storageError) {
    await supabase.from("course").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function updateCourseCount({ item, countId }) {
  const { data, error } = await supabase
    .from("course")
    .update(item)
    .eq("courseName", countId)
    .select();

  if (error) throw new Error("Failed to update course");
  return data;
}

export async function getCourse() {
  const { data, error } = await supabase.from("course").select("*");
  if (error) throw new Error("Failed to fetch course");

  return data;
}
