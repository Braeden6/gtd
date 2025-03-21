'use client';
import { vars } from 'nativewind';
// import { generateColorPalette } from '@/utils/color';

export const config = {
  light: vars({
    background: '#FFFFFF',
    foreground: '#000000',
    card: '#FFFFFF',
    cardForeground: '#000000',
    popover: '#FFFFFF',
    popoverForeground: '#000000',
    primary: '#0284C7',        
    primaryForeground: '#FFFFFF',
    secondary: '#7DD3FC',
    secondaryForeground: '#000000',
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    accent: '#F1F5F9',
    accentForeground: '#0F172A',
    destructive: '#EF4444',
    destructiveForground: '#FFFFFF',
    border: '#E2E8F0',
    input: '#E2E8F0',
    ring: '#7DD3FC',
  }),
  
  dark: vars({
    background: '#0F172A',     
    foreground: '#FFFFFF',
    card: '#1E293B',
    cardForeground: '#FFFFFF',
    popover: '#1E293B',
    popoverForeground: '#FFFFFF',
    primary: '#8B5CF6',         
    primaryForeground: '#FFFFFF',
    secondary: '#A78BFA',
    secondaryForeground: '#FFFFFF',
    muted: '#334155',
    mutedForeground: '#94A3B8',
    accent: '#334155',
    accentForeground: '#FFFFFF',
    destructive: '#EF4444',
    destructiveForground: '#FFFFFF',
    border: '#334155',
    input: '#334155',
    ring: '#A78BFA',
  }),
};