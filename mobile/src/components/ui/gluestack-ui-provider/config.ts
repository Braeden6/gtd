'use client';
import { vars } from 'nativewind';
import { generateColorPalette } from './colorUtils';

const baseColors = {
  light: {
    primary: '51 51 51', 
    secondary: '217 217 219', 
    tertiary: '231 129 40',    
    error: '230 53 53',       
    success: '52 131 82',     
    warning: '231 120 40',    
    info: '13 166 242',      
    background: '18 4 82',   
  },
  dark: {
    primary: '230 230 230',  
    secondary: '63 64 64',     
    tertiary: '251 157 75',    
    error: '239 68 68',       
    success: '72 151 102',     
    warning: '251 149 75',     
    info: '50 180 244',        
    background: '18 18 18',   
  }
};

export const config = {
  light: vars({
    // ...generateColorPalette('primary', baseColors.light.primary),
    // ...generateColorPalette('secondary', baseColors.light.secondary),
    // ...generateColorPalette('tertiary', baseColors.light.tertiary),
    // ...generateColorPalette('error', baseColors.light.error),
    // ...generateColorPalette('success', baseColors.light.success),
    // ...generateColorPalette('warning', baseColors.light.warning),
    // ...generateColorPalette('info', baseColors.light.info),
    
    // '--color-background-0': baseColors.light.background,
    // '--color-background-error': '254 241 241',
    // '--color-background-warning': '255 243 234',
    // '--color-background-success': '237 252 242',
    // '--color-background-muted': '247 248 247',
    // '--color-background-info': '235 248 254',

    // '--color-indicator-primary': '55 55 55',
    // '--color-indicator-info': '83 153 236',
    // '--color-indicator-error': '185 28 28',
    '--color-test-0': '20 32 200',
    '--color-test-1': '100 100 100',
  }),
  dark: vars({
    // ...generateColorPalette('primary', baseColors.dark.primary),
    // ...generateColorPalette('secondary', baseColors.dark.secondary),
    // ...generateColorPalette('tertiary', baseColors.dark.tertiary),
    // ...generateColorPalette('error', baseColors.dark.error),
    // ...generateColorPalette('success', baseColors.dark.success),
    // ...generateColorPalette('warning', baseColors.dark.warning),
    // ...generateColorPalette('info', baseColors.dark.info),
    
    // '--color-typography-0': '23 23 23',
    // '--color-outline-0': '26 23 23',
    // '--color-background-0': baseColors.dark.background,
    // '--color-background-error': '66 43 43',
    // '--color-background-warning': '65 47 35',
    // '--color-background-success': '28 43 33',
    // '--color-background-muted': '51 51 51',
    // '--color-background-info': '26 40 46',
    // '--color-indicator-primary': '247 247 247',
    // '--color-indicator-info': '161 199 245',
    // '--color-indicator-error': '232 70 69',


    '--color-test-0': '20 32 100',
    '--color-test-1': '0 0 0',
  }),
};

// export const config = {
//   light: vars({
//     '--color-primary-0': '255 255 255',
//     '--color-test-0': '20 32 32',
//     // other light mode variables
//   }),
//   // dark: vars({
//   //   '--color-primary-0': '#000000',
//   //   // other dark mode variables
//   // }),
// };