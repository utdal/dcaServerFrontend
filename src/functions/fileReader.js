export function fileReader(fileContent) {
  const lines = fileContent.trim().split('\n').map(line => line.trim());

  const inputs = [];

  for (let i = 0; i < lines.length; i += 4) {
    let obj = {};

    for (let j = 0; j < 4; j++) {
      const line = lines[i + j];
      if (!line) continue;

      const [key, val] = line.split(':');
      if (!key || !val) continue;


      try {
        obj[key] = JSON.parse(val.trim());
      } catch (err) {
        console.error(`Error parsing JSON for ${key}: ${val}`, err);
        obj[key] = null;
      }
    }
    inputs.push(obj);
  }
  console.log(inputs)
  return inputs;
}
