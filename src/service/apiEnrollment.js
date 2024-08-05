import supabase, { supabaseUrl } from "./supabase";

export async function createEditEnrollment(newEnrollment, id) {
  console.log(newEnrollment.photo);
  const hasImagePath = newEnrollment.photo?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newEnrollment.photo.name}`.replaceAll(
    "/",
    ""
  );
  //   https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/passport/Capture.PNG

  const imagePath = hasImagePath
    ? newEnrollment.photo
    : `${supabaseUrl}/storage/v1/object/public/passport/${imageName}`;

  let query = supabase.from("enrolled");

  if (!id) query = query.insert([{ ...newEnrollment, photo: imagePath }]);
  if (id)
    query = query.update({ ...newEnrollment, photo: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) throw new Error("Student not Enrolled");
  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("passport")
    .upload(imageName, newEnrollment.photo);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("enrolled").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function getEnrollment() {
  const { data, error } = await supabase.from("enrolled").select("*");
  if (error) throw new Error("Failed to fetch data");

  return data;
}

export async function deleteEnrollment(id) {
  const { data, error } = await supabase.from("enrolled").delete().eq("id", id);

  if (error) throw new Error("Couldnt decline");

  return data;
}
