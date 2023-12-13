export const validateFile = (file: any) => {
    const MAX_FILE_SIZE = 1024 * 1024 * 5;
    const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (file.size > MAX_FILE_SIZE) {
      return {
        message: 'Max image size is 5MB.',
        status: 400,
      };
    }
  
    if (!ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)) {
      return {
        message: 'Only .jpg, .jpeg, .png, and .webp formats are supported.',
        status: 400,
      };
    }
  
    return null
}