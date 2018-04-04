// Perlin noise class (ES6)
class PerlinNoise {
  constructor(octaves, amplitude, roughness, seed) {
    Math.seedrandom();
    this.seed = seed || Math.random();
    Math.seedrandom(this.seed);
    this.octaves = octaves;
    this.amplitude = amplitude;
    this.roughness = roughness;
  }

  getPerlinNoise(x, y) {
		let total = 0.0;
		let d = Math.pow(2, this.octaves - 1);
		for (let i = 0; i < this.octaves; i++) {
			let freq = Math.pow(2, i) / d;
			let amp = Math.pow(this.roughness, i) * this.amplitude;
			total += this.getInterpolatedNoise(x * freq, y * freq) * amp;
		}
		return total;
	}

  getSmoothNoise(x, y) {
		let corners = (this.getNoise(x - 1, y - 1) + this.getNoise(x + 1, y - 1) +
        this.getNoise(x - 1, y + 1) + this.getNoise(x + 1, y + 1)) / 16.0;
		let sides = (this.getNoise(x - 1, y) + this.getNoise(x + 1, y) +
        this.getNoise(x, y - 1) + this.getNoise(x, y + 1)) / 8;
		let center = this.getNoise(x, y) / 4.0;
		return corners + sides + center;
	}

	getNoise(x, y) {
		return (Math.random() * x * 49632 + y * 325176 + seed) * 2 - 1;
	}

  interpolate(a, b, blend) {
		let theta = blend * Math.PI;
		let f = (float) ((1 - Math.cos(theta)) * 0.5);
		return a * (1 - f) + b * f;
	}

  getInterpolatedNoise(x, y) {
		let intX = parseInt(x);
		let fracX = x - intX;
		let intY = parseInt(y);
		let fracY = y - intY;

		let v1 = this.getSmoothNoise(intX, intY);
		let v2 = this.getSmoothNoise(intX + 1, intY);
		let v3 = this.getSmoothNoise(intX, intY + 1);
		let v4 = this.getSmoothNoise(intX + 1, intY + 1);
		let i1 = this.interpolate(v1, v2, fracX);
		let i2 = this.interpolate(v3, v4, fracX);
		return this.interpolate(i1, i2, fracY);
	}
}
