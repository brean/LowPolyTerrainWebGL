class SpecialTerrainGenerator extends TerrainGenerator {
  static get VERTEX_SIZE_BYTES() {
    return 12 + 4 + 4;// position + normal
  }

  constructor(perlinNoise, colorGen) {
    super(perlinNoise, colorGen);
  }
}
