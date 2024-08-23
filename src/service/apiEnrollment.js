import supabase, { supabaseUrl } from "./supabase";

export async function createEditEnrollment(newEnrollment, id) {
  console.log(newEnrollment.photo);
  const hasImagePath = newEnrollment.photo?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newEnrollment.photo.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newEnrollment.photo
    : `${supabaseUrl}/storage/v1/object/public/passport/${imageName}`;

  let query = supabase.from("enrollment");

  if (!id) query = query.insert([{ ...newEnrollment, photo: imagePath }]);
  if (id)
    query = query.update({ ...newEnrollment, photo: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) throw new Error("Student not enrollment");
  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("passport")
    .upload(imageName, newEnrollment.photo);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("enrollment").delete().eq("id", data.id);
    // console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function getEnrollment() {
  const { data, error } = await supabase.from("enrollment").select("*");
  if (error) throw new Error("Failed to fetch data");

  return data;
}

export async function deleteEnrollment(id) {
  const { data, error } = await supabase.from("enrollment").delete().eq("id", id);

  if (error) throw new Error("Couldnt decline");

  return data;
}

export async function updateAllEnrollmentData(objects) {
  const uploadedData = await Promise.all(
    objects.map(async (object) => {
      const hasImagePath = object.photo?.startsWith?.(supabaseUrl);

      const imageName = `${Math.random()}-${object.photo.name}`.replaceAll(
        "/",
        ""
      );

      const imagePath = hasImagePath
        ? object.photo
        : `${supabaseUrl}/storage/v1/object/public/passport/${imageName}`;
      // Upload photo to Supabase Storage
      const { data: photoData, error: photoError } = await supabase.storage
        .from("passport")
        .upload(imageName, object.photo);

      // 3. Delete the cabin IF there was an error uplaoding image
      if (photoError) {
        await supabase.from("enrollment").delete().eq("id", data.id);
        // console.error(photoError);
        throw new Error(
          "Student image could not be uploaded and the cabin was not created"
        );
      }

      // Insert data into the table with the photo URL
      const { data, error } = await supabase.from("enrollment").insert({
        ...object,
        photo: imagePath,
      });

      if (error) {
        throw new Error(`Failed to insert data: ${error.message}`);
      }

      return data;
    })
  );

  return uploadedData;
}

export async function updateAllEnrollmentStatus(objects) {
  const updateData = await Promise.all(
    objects.map(async (object) => {
      const { id } = object;
      const { data, error } = await supabase
        .from("enrollment")
        .update({ ...object })
        .eq("id", id)
        .select();
      if (error) throw new Error("Failed to update data");

      return data;
    })
  );
  return updateData;
}
export async function updateAllEnrollmentSignature(objects, value) {
  const updateData = await Promise.all(
    objects?.map(async (object) => {
      const { id } = object;
      const { data, error } = await supabase
        .from("enrollment")
        .update({ ...object, isSignature: value })
        .eq("id", id)
        .select();
      if (error) throw new Error("Failed to update data");

      return data;
    })
  );
  return updateData;
}

export async function getCertificate(id) {
  const { data, error } = await supabase.from("enrollment").select("*").eq("id", id).single();

  if (error) throw new Error("Failed to fetch certificate");

  return data;
}
