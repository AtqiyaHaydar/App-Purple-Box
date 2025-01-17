import DOMPurify from "dompurify";

export const validateStoreId = (id: string | null): boolean => {
  if (!id) return false;
  const sanitizedId = sanitizeInput(id);
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    sanitizedId
  );
};
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Strip all HTML
    ALLOWED_ATTR: [],
  }).trim();
};

export const sanitizeFormData = (formData: FormData): FormData => {
  const sanitizedFormData = new FormData();
  formData.forEach((value, key) => {
    if (typeof value === "string") {
      sanitizedFormData.append(key, sanitizeInput(value));
    } else {
      sanitizedFormData.append(key, value);
    }
  });
  return sanitizedFormData;
};

export const validateFile = (file: File) => {
  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

  if (!file) throw new Error("No file provided");

  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error("Invalid file extension");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type. Please use JPG, PNG or WebP.");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("File size exceeds 5MB limit.");
  }

  return true;
};
