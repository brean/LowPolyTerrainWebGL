/**
 * color is different from the Java implementation. Here it
 * is just an array/vector of the 3 values for red, green and blue
 */

class Color {
  static convert(color, multi) {
    if (multi)
      return [color[0] * 255, color[1] * 255, color[2] * 255];
    else
      return [color[0] / 255, color[1] / 255, color[2] / 255];
  }

  static interpolatecolors(color1, color2, blend) {
		let color1Weight = 1 - blend;
		let r = (color1Weight * color1[0]) + (blend * color2[0]);
		let g = (color1Weight * color1[1]) + (blend * color2[1]);
		let b = (color1Weight * color1[2]) + (blend * color2[2]);
		return [r, g, b];
  }
}
