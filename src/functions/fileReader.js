export function fileReader(fileContent) {
  try {
    const data = JSON.parse(fileContent);
    return data;
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return null;
  }
}