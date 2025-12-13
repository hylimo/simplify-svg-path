# SimplifySvgPath

> **A minimal path simplification library based on Skia's PathOps**
> 
> **This is a fork of [google/skia](https://github.com/google/skia) - specifically a stripped-down version focusing only on SVG path simplification.**

## About

This package provides a tiny WebAssembly build of Skia's powerful PathOps functionality, allowing you to simplify SVG paths by removing self-intersections and overlaps. The entire WASM bundle is only ~260KB, making it suitable for use in browsers and Node.js applications.

## Installation

```bash
npm install simplify-svg-path
```

## Features

- ✨ **Simple API** - Easy-to-use functions for path simplification
- 🎯 **Tiny Size** - Only ~260KB WASM bundle
- 🚀 **Fast** - Powered by Skia's battle-tested PathOps
- 🌐 **Universal** - Works in Node.js and browsers
- 📦 **Self-contained** - No external dependencies

## Quick Start

```javascript
import SimplifySvgPathInit from 'simplify-svg-path';

async function main() {
  // Initialize the module
  const SimplifySvgPath = await SimplifySvgPathInit();

  // Convenience helper: takes an SVG path string, returns simplified string
  const simplified = SimplifySvgPath.simplifySvgPath('M0 0L100 100L100 0L0 100Z');
  console.log(simplified);

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

- **Parameters**
  - `svgPathString` (string) - An SVG path data string
  - `fillType` (optional, enum) - Fill type for the path (default is `Winding`)
- **Returns**: Simplified SVG path string, or `null` if the path is invalid

### Fill Types

An enumeration with supported fill types:

- `Winding` - Non-zero winding fill rule
- `EvenOdd` - Even-odd fill rule

### Path API

For more advanced usage:

- `Path.MakeFromSVGString(svgPath)` - Create a path from SVG path data
- `Path.MakeFromSVGString(svgPath, fillType)` - Create a path with specified fill type
- `path.toSVGString()` - Convert path back to SVG string format
- `path.simplify()` - Simplify the path by removing self-intersections and overlaps
- `path.getFillType()` - Get the fill type of the path
- `path.setFillType(fillType)` - Set the fill type of the path

## TypeScript

TypeScript definitions are included in the package.

```typescript
import SimplifySvgPathInit from 'simplify-svg-path';

const SimplifySvgPath = await SimplifySvgPathInit();
const result = SimplifySvgPath.simplifySvgPath('M0 0L10 10');
```

## Repository Structure

```
.
├── skia/                         # Skia source code (submodule or fork)
│   └── modules/simplifypath/     # Our minimal PathOps module
│       ├── compile.sh            # Build script for the WASM module
│       ├── path_simplify_bindings.cpp
│       ├── pathops.js
│       ├── BUILD.gn
│       └── BUILD.bazel
├── simplify-svg-path/            # NPM package
│   ├── dist/                     # Build outputs (generated)
│   │   ├── simplifypath.js
│   │   ├── simplifypath.wasm
│   │   └── index.d.ts
│   ├── test.js
│   ├── package.json
│   ├── LICENSE
│   └── README.md
├── setup.sh                      # Setup script (sync dependencies)
├── build.sh                      # Build script (compile and copy)
└── README.md                     # This file
```

## Setup

### Prerequisites

- Python 3.12+
- Node.js 22+

### Initial Setup

1. **Clone this repository**:
   ```bash
   git clone https://github.com/hylimo/simplify-svg-path.git
   cd simplify-svg-path
   ```

2. **Run the setup script** to sync Skia dependencies:
   ```bash
   ./setup.sh
   ```

   This will run `python3 tools/git-sync-deps` inside the Skia directory to fetch all required dependencies.

## Building

To build the SimplifySvgPath module:

```bash
./build.sh
```

This will:
1. Navigate to `skia/modules/simplifypath/`
2. Run the compile script to build the WASM module
3. Copy the generated `simplifypath.js` and `simplifypath.wasm` files to `simplify-svg-path/dist/`
4. Copy this README to `simplify-svg-path/`

The built files will be available in `simplify-svg-path/dist/`.

## Testing

After building, you can run the test suite:

```bash
cd simplify-svg-path
npm test
```

## CI/CD

This repository includes GitHub Actions workflows:

- **`.github/workflows/build.yml`** - Builds and tests on push/PR
- **`.github/workflows/publish.yml`** - Publishes to NPM on releases

To publish a new version:
1. Update the version in `simplify-svg-path/package.json`
2. Create a new GitHub release
3. The publish workflow will automatically build and publish to NPM

## License

This project is based on Skia and is licensed under the BSD-3-Clause license, the same as Skia.

Original Skia license text:

```
Copyright (c) 2011 Google Inc. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in
    the documentation and/or other materials provided with the
    distribution.

  * Neither the name of the copyright holder nor the names of its
    contributors may be used to endorse or promote products derived
    from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

See [LICENSE](skia/LICENSE) for the full Skia license.

## Attribution

This is a fork and minimal build of [google/skia](https://github.com/google/skia). All credit for the PathOps implementation goes to the Skia team at Google.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Links

- [Skia Project](https://skia.org/)
- [Skia GitHub Repository](https://github.com/google/skia)
- [CanvasKit (Full Skia WASM build)](https://skia.org/docs/user/modules/canvaskit/)
