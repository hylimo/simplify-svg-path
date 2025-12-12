#!/bin/bash
# Build script for SimplifySvgPath
# Compiles the Skia module and copies output to the npm package

set -e

echo "Building SimplifySvgPath module..."

# Navigate to the simplifypath module and compile
cd skia/modules/simplifypath
./compile.sh

# Navigate back to workspace root
cd ../../..

# Create dist directory if it doesn't exist
mkdir -p simplify-svg-path/dist

# Copy the compiled files
echo "Copying compiled files to simplify-svg-path/dist..."
cp skia/out/simplifypath_wasm/simplifypath.js simplify-svg-path/dist/
cp skia/out/simplifypath_wasm/simplifypath.wasm simplify-svg-path/dist/

# Copy the root README into the package (generated during build, not tracked)
cp README.md simplify-svg-path/README.md

echo ""
echo "Build complete!"
echo "Files copied to simplify-svg-path/dist/"
ls -lh simplify-svg-path/dist/