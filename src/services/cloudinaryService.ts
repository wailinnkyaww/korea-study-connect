const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const uploadProfileImage = async (
  file: File,
  folder: "students" | "agencies",
): Promise<string> => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary configuration is missing.");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WebP images are allowed.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image size must be less than 5 MB.");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", `korea-study-connect/${folder}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || "Image upload failed.");
  }

  if (!result.secure_url) {
    throw new Error("Cloudinary did not return an image URL.");
  }

  return result.secure_url as string;
};
