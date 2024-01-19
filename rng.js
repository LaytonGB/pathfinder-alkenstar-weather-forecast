function newRng(seed) {
    return function() {
      seed |= 0; seed = seed + 0x9e3779b9 | 0;
      var t = seed ^ seed >>> 16; t = Math.imul(t, 0x21f0aaad);
          t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
      return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
    }
}