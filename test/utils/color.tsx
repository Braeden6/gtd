/**
 * Generates a color palette with different shades based on a base color
 * @param name The name of the color (e.g., 'primary', 'secondary')
 * @param baseColor The base color in RGB format (e.g., '100 51 51')
 * @returns An object with color variables for different shades
 */
export function generateColorPalette(name: string, baseColor: string) {
    const [r, g, b] = baseColor.split(' ').map(Number);
    const palette: Record<string, string> = {};
    const shades = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    
    shades.forEach((shade, index) => {
      let newR, newG, newB;
      
      if (shade < 500) {
        const lightFactor = 1 - (index / 6);
        newR = Math.round(r + (255 - r) * lightFactor);
        newG = Math.round(g + (255 - g) * lightFactor);
        newB = Math.round(b + (255 - b) * lightFactor);
      } else if (shade === 500) {
        newR = r;
        newG = g;
        newB = b;
      } else {
        const darkFactor = (index - 6) / 5;
        newR = Math.round(r * (1 - darkFactor));
        newG = Math.round(g * (1 - darkFactor));
        newB = Math.round(b * (1 - darkFactor));
      }
      newR = Math.max(0, Math.min(255, newR));
      newG = Math.max(0, Math.min(255, newG));
      newB = Math.max(0, Math.min(255, newB));
      
      palette[`--color-${name}-${shade}`] = `${newR} ${newG} ${newB}`;
    });
    
    return palette;
  }