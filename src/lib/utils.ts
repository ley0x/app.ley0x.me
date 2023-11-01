export const arrayBufferToString = (buffer: ArrayBuffer) => {
  const decoder = new TextDecoder('utf-8');
  const decodedString = decoder.decode(buffer);
  return decodedString;
};
