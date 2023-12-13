import { writeFile } from 'fs/promises';
import { join } from 'path';

export const uploadImage = async (foto: Blob, destinationFolder: string): Promise<string> => {
  const timestamp = Date.now();
  const fileName = `${timestamp}.jpg`;
  const filePath = join(destinationFolder, fileName);
  const fileData = await foto.arrayBuffer();
  
  await writeFile(filePath, Buffer.from(fileData));

  const publicPath = filePath.slice(filePath.indexOf('public/') + 7);
  return publicPath;
};
