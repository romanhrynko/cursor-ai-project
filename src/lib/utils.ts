export function maskKey(key: string, show: boolean) {
  if (show) return key;
  if (!key || key.length <= 8) return '*'.repeat(key.length);
  return key.slice(0, 4) + '-' + '*'.repeat(Math.max(0, key.length - 8)) + '-' + key.slice(-4);
}

export function generateApiKey() {
  // Generates a key like 'tvly-' + 32 random hex chars
  const prefix = 'tvly-';
  const arr = new Uint8Array(16);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(arr);
    return prefix + Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // fallback for SSR (not cryptographically secure)
  return prefix + Math.random().toString(16).slice(2, 18).padEnd(32, '0');
} 