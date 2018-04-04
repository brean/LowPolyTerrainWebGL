class ColorGenerator {
  constructor(binomeColors, spread) {
    this.binomeColors = binomeColors;
    this.spread = spread;
    this.halfSpread = spread / 2;
    this.part = 1 / (binomeColors.length - 1);
  }

  /**
	 * Calculates the color for every vertex of the terrain, by linearly
	 * interpolating between the biome colors depending on the vertex's height.
	 *
	 * @param heights
	 *            -The heights of all the vertices in the terrain.
	 * @param amplitude
	 *            - The amplitude range of the terrain that was used in the
	 *            heights generation. Maximum possible height is
	 *            {@code altitude} and minimum possible is {@code -altitude}.
	 * @return The colors of all the vertices in the terrain, in a grid.
	 */
  generateColors(heights, amplitude) {
    let colors = [];
    for (let z = 0; z < heights.length; z++) {
      colors.push([])
      for (let x = 0; x < heights[z].length; x++) {
        colors[z].push();
        colors[z][x] = calculateColor(heights[z][x], amplitude);
      }
    }
    return colors;
  }

  /**Determines the color of the vertex based on the provided height.
  	 * @param height - Height of the vertex.
  	 * @param amplitude - The maximum height that a vertex can be
  	 * @return
  	 */
  calculateColour(height, amplitude) {
		let value = (height + amplitude) / (amplitude * 2);
		value = Maths.clamp((value - halfSpread) * (1 / spread), 0, 0.9999);
		let firstBiome = Math.floor(value / part);
		let blend = (value - (firstBiome * part)) / part;
		return Color.interpolateColours(biomeColours[firstBiome], biomeColours[firstBiome + 1], blend, null);
	}
}
