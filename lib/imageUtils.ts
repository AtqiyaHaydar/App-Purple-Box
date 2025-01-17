export const validateAndResizeImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Check minimum dimensions
      if (img.width < 640 || img.height < 640) {
        reject(new Error("Image must be at least 640x640 pixels"));
        return;
      }

      // Create canvas for square crop and resize
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      // Calculate square crop dimensions
      const size = Math.min(img.width, img.height);
      const startX = (img.width - size) / 2;
      const startY = (img.height - size) / 2;

      // Set canvas to required dimensions
      canvas.width = 640;
      canvas.height = 640;

      // Draw and crop image
      ctx.drawImage(
        img,
        startX,
        startY, // Source start point
        size,
        size, // Source dimensions
        0,
        0, // Destination start point
        640,
        640 // Destination dimensions
      );

      // Convert to file
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to process image"));
            return;
          }
          const convertedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(convertedFile);
        },
        "image/jpeg",
        0.9
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
};
