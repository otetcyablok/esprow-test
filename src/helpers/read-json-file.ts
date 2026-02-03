const readJsonFile = async <T>(file: Blob): Promise<T | undefined> => {
  try {
    return JSON.parse(await file.text());
  } catch (error) {
    // fall silently (because of "No need for data validation" in the task)
    return undefined;
  }
}

export default readJsonFile;
