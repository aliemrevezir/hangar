const TURKISH_MAP: Record<string, string> = {
  'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G',
  'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O',
  'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U',
};

export function slugify(text: string): string {
  return text
    .split('')
    .map((char) => TURKISH_MAP[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function buildWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const fullPhone = cleanPhone.startsWith('90') ? cleanPhone : `90${cleanPhone}`;
  const defaultMessage = 'Merhaba, Hangar üzerinden ulaşıyorum.';
  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message || defaultMessage)}`;
}

export function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 10) {
    return `0${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }
  if (clean.length === 11 && clean.startsWith('0')) {
    return `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}`;
  }
  return phone;
}
