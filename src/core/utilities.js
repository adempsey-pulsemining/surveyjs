export function newGuid() {
  const u8 = new Uint8Array(16);
  window.crypto.getRandomValues(u8);
  u8[6] = (u8[6] & 0x0f) | 0x40;
  u8[8] = (u8[8] & 0x3f) | 0x80;
  return Array.from(u8).map(a => a.toString(16).padStart(2, '0')).join('').replace(/(.{8})(.{4})(.{4})(.{4})/, '$1-$2-$3-$4-');
}
