# SimplifySvgPath - Skia Fork

This repository contains a fork of [google/skia](https://github.com/google/skia) with a minimal WebAssembly build focused on SVG path simplification using Skia's powerful PathOps.

## What is this?

This project extracts Skia's path operations functionality and compiles it to WebAssembly, creating a tiny (~260KB) library for simplifying SVG paths. It removes self-intersections, overlaps, and redundant segments from SVG path data.

## Repository Structure

```
.
├── skia/                          # Skia source code (submodule or fork)
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

- Python 3.x
- Node.js 16+
- Emscripten SDK (for building from source)
- Git

### Initial Setup

1. **Clone this repository**:
   ```bash
   git clone https://github.com/yourusername/simplifysvgpath.git
   cd simplifysvgpath
   ```

2. **Run the setup script** to sync Skia dependencies:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

   This will run `python3 tools/git-sync-deps` inside the Skia directory to fetch all required dependencies.

3. **Install Emscripten** (if not already installed):
   ```bash
   cd ~
   git clone https://github.com/emscripten-core/emsdk.git
   cd emsdk
   ./emsdk install latest
   ./emsdk activate latest
   source ./emsdk_env.sh
   ```

## Building

To build the SimplifySvgPath module:

```bash
chmod +x build.sh
./build.sh
```

This will:
1. Navigate to `skia/modules/simplifypath/`
2. Run the compile script to build the WASM module
3. Copy the generated `simplifypath.js` and `simplifypath.wasm` files to `simplify-svg-path/dist/`

The built files will be available in `simplify-svg-path/dist/`.

## Testing

After building, you can run the test suite:

```bash
cd simplify-svg-path
npm test
```

## Using the NPM Package

The `simplify-svg-path/` directory contains a publishable NPM package. See [simplify-svg-path/README.md](simplify-svg-path/README.md) for usage instructions.

Quick example:

```javascript
const SimplifySvgPathInit = require('pathkit-simplify');

const SimplifySvgPath = await SimplifySvgPathInit();
const simplified = SimplifySvgPath.simplifySvgPath('M0 0L100 100L100 0L0 100Z');
console.log(simplified);
```

## Development

### Project Structure

- **`skia/modules/simplifypath/`** - Contains the C++ bindings and build configuration for the minimal PathOps WASM module
- **`simplify-svg-path/`** - The NPM package that wraps the built WASM module
- **`setup.sh`** - Syncs Skia dependencies
- **`build.sh`** - Builds the module and copies outputs to the NPM package

### Making Changes

1. Modify the C++ bindings in `skia/modules/simplifypath/path_simplify_bindings.cpp`
2. Update build configuration in `skia/modules/simplifypath/BUILD.gn` if needed
3. Run `./build.sh` to rebuild
4. Test your changes with `cd simplify-svg-path && npm test`

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
