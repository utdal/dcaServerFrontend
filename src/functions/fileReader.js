export function fileReader(fileContent) {
  try {
    const data = JSON.parse(fileContent);
    console.log(data);
    return data;
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return null;
  }
}