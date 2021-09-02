import { saveAs } from 'file-saver';

export function saveFile(file: Blob, fileName: string): void {
  const blob = new Blob([file], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
}
