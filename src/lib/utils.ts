export const arrayBufferToString = (buffer: ArrayBuffer) => {
  const decoder = new TextDecoder('utf-8');
  const decodedString = decoder.decode(buffer);
  return decodedString;
};


export const copyImageToClipboard = async (link: string) => {
  try {
    // Create an image element
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Set CORS to anonymous to handle cross-origin images

    // Wait for the image to load
    await new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = link;
    });

    // Create a canvas and draw the image
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get canvas context');
    }
    context.drawImage(img, 0, 0);

    // Convert canvas to a blob
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) {
      throw new Error('Failed to create image blob');
    }

    // Copy the image blob to clipboard
    const clipboardItem = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([clipboardItem]);

    console.log('Image copied to clipboard!');
  } catch (error) {
    console.error('Error copying image to clipboard:', error);
  }
};
