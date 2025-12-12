# SimplifySvgPath

> **A minimal path simplification library based on Skia's PathOps**
> 
> **This is a fork of [google/skia](https://github.com/google/skia) - specifically a stripped-down version focusing only on SVG path simplification.**

## About

This package provides a tiny WebAssembly build of Skia's powerful PathOps functionality, allowing you to simplify SVG paths by removing self-intersections and overlaps. The entire WASM bundle is only ~260KB, making it suitable for use in browsers and Node.js applications.

## Installation

```bash
npm install pathkit-simplify
```

## Features

- ✨ **Simple API** - Easy-to-use functions for path simplification
- 🎯 **Tiny Size** - Only ~260KB WASM bundle
- 🚀 **Fast** - Powered by Skia's battle-tested PathOps
- 🌐 **Universal** - Works in Node.js and browsers
- 📦 **Self-contained** - No external dependencies

## Quick Start

```javascript
const SimplifySvgPathInit = require('pathkit-simplify');

async function main() {
  // Initialize the module
  const SimplifySvgPath = await SimplifySvgPathInit();
  
  // Simple helper function - takes an SVG path string, returns simplified string
  const simplified = SimplifySvgPath.simplifySvgPath('M0 0L100 100L100 0L0 100Z');
  console.log(simplified); // Simplified SVG path string or null if failed
  
  // Or use the Path API for more control:
  const path = SimplifySvgPath.Path.MakeFromSVGString('M0 0L100 100L100 0L0 100Z');
  const simplifiedPath = path.simplify();
  if (simplifiedPath) {
    console.log(simplifiedPath.toSVGString());
  }
}

main();
```

## API

### `simplifySvgPath(svgPathString)`

A convenience function that takes an SVG path string and returns the simplified path string.

- **Parameters**: `svgPathString` (string) - An SVG path data string
- **Returns**: Simplified SVG path string, or `null` if the path is invalid

### Path API

For more advanced usage:

- `Path.MakeFromSVGString(svgPath)` - Create a path from SVG path data
- `path.toSVGString()` - Convert path back to SVG string format
- `path.simplify()` - Simplify the path by removing self-intersections and overlaps

## TypeScript

TypeScript definitions are included in the package.

```typescript
import SimplifySvgPathInit from 'pathkit-simplify';

const SimplifySvgPath = await SimplifySvgPathInit();
const result = SimplifySvgPath.simplifySvgPath('M0 0L10 10');
```

## License

This project is based on Skia and is licensed under the same BSD-3-Clause license. See the [LICENSE](./LICENSE) file for details.

Copyright (c) 2011 Google Inc. All rights reserved.

## Attribution

This is a fork and minimal build of [google/skia](https://github.com/google/skia). All credit for the PathOps implementation goes to the Skia team at Google.
```bash
npm test
```

## How It Works

This module is built directly from Skia's C++ source code with all unnecessary features removed:
- No canvas rendering
- No GPU support (WebGL/WebGPU)
- No image codecs
- No text/font support
- No effects or filters
- Only core path operations and PathOps

The result is a tiny, focused library perfect for server-side or client-side path simplification tasks.

## Output Verification

The output of `simplifypath.js` is **identical** to the full CanvasKit's path simplification, ensuring compatibility while providing massive size savings.

## License

Based on Skia (BSD-3-Clause License)
