export function formatPhone(phone: string): string {
  const phoneString = String(phone).trim();

  const lada = phoneString.substr(0, 2);
  const first = phoneString.substr(2, 4);
  const second = phoneString.substr(6, 4);

  return `(${lada}) ${first} ${second}`;
}
