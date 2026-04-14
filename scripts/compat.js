export const foundryVersion = (() => {
  try {
    const versionString = game?.version || game?.data?.version || "0";
    return Number(versionString.toString().split(".")[0]) || 0;
  } catch {
    return 0;
  }
})();

export function isFoundryV11() {
  return foundryVersion === 11;
}

export function isFoundryV12Plus() {
  return foundryVersion >= 12;
}

export function getFilePickerClass() {
  return (
    foundry?.applications?.apps?.FilePicker?.implementation ||
    window?.FilePicker ||
    foundry?.FilePicker ||
    FilePicker
  );
}

export async function browseFolderApi(folderPath) {
  const FilePickerClass = getFilePickerClass();
  if (!FilePickerClass) {
    throw new Error("Loading Screen | FilePicker implementation not found");
  }

  if (typeof FilePickerClass.browse === "function") {
    return FilePickerClass.browse("data", folderPath);
  }

  const filePicker = new FilePickerClass({
    type: "folder",
    current: folderPath,
    callback: () => {},
  });

  if (typeof filePicker.browse === "function") {
    return await filePicker.browse();
  }

  throw new Error("Loading Screen | FilePicker.browse is not available");
}

export async function openFolderPicker(current, callback) {
  const FilePickerClass = getFilePickerClass();
  if (!FilePickerClass) {
    throw new Error("Loading Screen | FilePicker implementation not found");
  }

  const filePicker = new FilePickerClass({
    type: "folder",
    current,
    callback,
  });

  if (typeof filePicker.browse === "function") {
    return filePicker.browse();
  }

  return filePicker;
}
