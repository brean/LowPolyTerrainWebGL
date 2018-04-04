class LowPolyDemoApp {
  constructor(config) {
    // TODO: light and engine!

    //init generators for heights and colours
    let noise = new PerlinNoise(config.octaves, config.amplitude, config.roughness);
    let colorGen = new ColorGenerator(config.terrain_colors, config.color_spread);

    let hybridTerrain = specialGenerator.generateTerrain(config.terrain_size);
  }
}
