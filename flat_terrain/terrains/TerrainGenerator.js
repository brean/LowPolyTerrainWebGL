class TerrainGenerator {
  constructor(perlinNoise, colorGen) {
    this.perlinNoise = perlinNoise;
    this.colorGen = colorGen;
  }

	/**
	 * Generates a terrain. First the heights and colors of all the vertices
	 * are generated.
	 *
	 * @param gridSize
	 *            - The number of grid squares along one side of the terrain.
	 * @return The generated terrain.
	 */
  generateTerrain(gridSize) {
    let heights = this.generateHeights(gridSize, perlinNoise);
    // implemented in inheritted class
    let colors = this.colorGen.generateColors(heights, perlinNoise.amplitude);
    // implemented in inheritted class
    return this.createTerrain(heights, colors);
  }
  /**
	 * Uses the perlin noise generator (which might actually not be using the
	 * Perlin Noise algorithm - I'm not quite sure if it is or isn't) to
	 * generate heights for all of the terrain's vertices.
	 *
	 * @param gridSize - The number of grid squares along one edge of the terrain.
	 * @param perlinNoise - The heights generator.
	 * @return All the heights for the vertices.
	 */
  generateHeights(gridSize, perlinNoise) {
    let heights = [];
    for (let z = 0; z <= gridSize; z++) {
      heights.push([]);
      for (let x = 0; x <= gridSize; x++) {
        heights[z].push([]);
				heights[z][x] = perlinNoise.getPerlinNoise(x, z);
			}
    }
    return heights;
  }
}
