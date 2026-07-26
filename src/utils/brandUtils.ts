import { BrandProfile } from '../types';

export const SESSION_DURATION_MS = 3 * 60 * 60 * 1000; // 3 Hours in milliseconds

export interface ColorPreset {
  name: string;
  hex: string;
  bgClass: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Ayurvedic Amber', hex: '#92400e', bgClass: 'bg-amber-800' },
  { name: 'Forest Emerald', hex: '#065f46', bgClass: 'bg-emerald-800' },
  { name: 'Terracotta Earth', hex: '#9a3412', bgClass: 'bg-orange-800' },
  { name: 'Crimson Rose', hex: '#991b1b', bgClass: 'bg-red-800' },
  { name: 'Royal Indigo', hex: '#3730a3', bgClass: 'bg-indigo-800' },
  { name: 'Deep Teal', hex: '#115e59', bgClass: 'bg-teal-800' },
  { name: 'Golden Saffron', hex: '#d97706', bgClass: 'bg-amber-600' },
  { name: 'Warm Bronze', hex: '#854d0e', bgClass: 'bg-yellow-800' },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const num = percent > 0 ? (255 - rgb.r) * (percent / 100) : rgb.r * (percent / 100);
  const r = Math.min(255, Math.max(0, Math.round(rgb.r + num)));

  const numG = percent > 0 ? (255 - rgb.g) * (percent / 100) : rgb.g * (percent / 100);
  const g = Math.min(255, Math.max(0, Math.round(rgb.g + numG)));

  const numB = percent > 0 ? (255 - rgb.b) * (percent / 100) : rgb.b * (percent / 100);
  const b = Math.min(255, Math.max(0, Math.round(rgb.b + numB)));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function applyBrandColor(hex: string) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const rgb = hexToRgb(hex) || { r: 146, g: 64, b: 14 };

  root.style.setProperty('--brand-color', hex);
  root.style.setProperty('--brand-color-hover', adjustBrightness(hex, -20));
  root.style.setProperty('--brand-color-light', adjustBrightness(hex, 85));
  root.style.setProperty('--brand-color-border', adjustBrightness(hex, 60));
  root.style.setProperty('--brand-color-text', adjustBrightness(hex, -30));
  root.style.setProperty('--brand-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
}

export function encodeDemoToken(profile: Partial<BrandProfile>): string {
  try {
    const jsonStr = JSON.stringify({
      bn: profile.businessName || '',
      cn: profile.contactName || '',
      ph: profile.phone || '',
      ad: profile.address || '',
      pc: profile.primaryColor || '#92400e',
      ts: Date.now(),
    });
    return btoa(encodeURIComponent(jsonStr));
  } catch {
    return '';
  }
}

export function decodeDemoToken(token: string): Partial<BrandProfile> | null {
  try {
    const jsonStr = decodeURIComponent(atob(token));
    const data = JSON.parse(jsonStr);
    if (!data.bn) return null;
    return {
      businessName: data.bn,
      contactName: data.cn,
      phone: data.ph,
      address: data.ad,
      primaryColor: data.pc || '#92400e',
      submittedAt: Date.now(),
    };
  } catch {
    return null;
  }
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return '00m 00s';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}
