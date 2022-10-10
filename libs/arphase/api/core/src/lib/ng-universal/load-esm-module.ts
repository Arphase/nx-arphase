export function loadEsmModule<T>(modulePath: string | URL): Promise<T> {
  return new Function('modulePath', 'return import(modulePath);')(modulePath);
}
