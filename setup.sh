#!/bin/bash
# Setup script for building the Skia-based SimplifySvgPath module
# This script syncs all dependencies needed to build Skia

set -e

echo "Setting up Skia dependencies..."

# Navigate to the Skia directory
cd skia

# Sync Skia dependencies using git-sync-deps
echo "Running git-sync-deps to fetch all Skia dependencies..."
python3 tools/git-sync-deps

echo "Setup complete! You can now run ./build.sh to build the module."
