const SimplifySvgPathInit = require('./dist/simplifypath.js');

async function runTests() {
  console.log('Initializing SimplifySvgPath...');
  const SimplifySvgPath = await SimplifySvgPathInit();
  console.log('✓ Module initialized\n');

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`✓ ${name}`);
      passed++;
    } catch (error) {
      console.error(`✗ ${name}`);
      console.error(`  Error: ${error.message}`);
      failed++;
    }
  }

  // Test 1: Simple helper function with crossing paths
  test('simplifySvgPath - crossing paths', () => {
    const input = 'M0 0L100 100L100 0L0 100Z';
    const result = SimplifySvgPath.simplifySvgPath(input);
    if (!result) throw new Error('Expected simplified path, got null');
    if (typeof result !== 'string') throw new Error('Expected string result');
    console.log(`  Input:  ${input}`);
    console.log(`  Output: ${result}`);
  });

  // Test 2: Simple path that doesn't need simplification
  test('simplifySvgPath - simple line', () => {
    const input = 'M0 0L10 10';
    const result = SimplifySvgPath.simplifySvgPath(input);
    // Simple paths may return null if they don't need simplification
    // This is expected behavior
    if (result === null) {
      console.log(`  Input:  ${input} (no simplification needed)`);
    } else {
      console.log(`  Input:  ${input}`);
      console.log(`  Output: ${result}`);
    }
  });

  // Test 3: Rectangle path
  test('simplifySvgPath - rectangle', () => {
    const input = 'M0 0L100 0L100 100L0 100Z';
    const result = SimplifySvgPath.simplifySvgPath(input);
    if (!result) throw new Error('Expected simplified path, got null');
    console.log(`  Input:  ${input}`);
    console.log(`  Output: ${result}`);
  });

  // Test 4: Invalid path should return null
  test('simplifySvgPath - invalid path returns null', () => {
    const input = 'invalid path data';
    const result = SimplifySvgPath.simplifySvgPath(input);
    if (result !== null) throw new Error('Expected null for invalid path');
  });

  // Test 5: Path API - MakeFromSVGString
  test('Path.MakeFromSVGString', () => {
    const path = SimplifySvgPath.Path.MakeFromSVGString('M0 0L10 10');
    if (!path) throw new Error('Expected path object, got null');
  });

  // Test 6: Path API - toSVGString
  test('Path.toSVGString', () => {
    const path = SimplifySvgPath.Path.MakeFromSVGString('M0 0L10 10');
    if (!path) throw new Error('Failed to create path');
    const svgString = path.toSVGString();
    if (typeof svgString !== 'string') throw new Error('Expected string from toSVGString');
    console.log(`  Output: ${svgString}`);
  });

  // Test 7: Path API - simplify method
  test('Path.simplify', () => {
    const path = SimplifySvgPath.Path.MakeFromSVGString('M0 0L100 100L100 0L0 100Z');
    if (!path) throw new Error('Failed to create path');
    const simplified = path.simplify();
    if (!simplified) throw new Error('Expected simplified path, got null');
    const result = simplified.toSVGString();
    console.log(`  Output: ${result}`);
  });

  // Test 8: Complex self-intersecting path
  test('simplifySvgPath - self-intersecting star', () => {
    const input = 'M50 0L61 35L98 35L68 57L79 91L50 70L21 91L32 57L2 35L39 35Z';
    const result = SimplifySvgPath.simplifySvgPath(input);
    if (!result) throw new Error('Expected simplified path, got null');
    console.log(`  Input:  ${input}`);
    console.log(`  Output: ${result}`);
  });

  // Test 9: Overlapping rectangles
  test('simplifySvgPath - overlapping rectangles', () => {
    const path1 = SimplifySvgPath.Path.MakeFromSVGString('M0 0L50 0L50 50L0 50Z');
    const path2 = SimplifySvgPath.Path.MakeFromSVGString('M25 25L75 25L75 75L25 75Z');
    if (!path1 || !path2) throw new Error('Failed to create paths');
    // For now, just test that individual paths can be simplified
    const simplified1 = SimplifySvgPath.simplifySvgPath('M0 0L50 0L50 50L0 50Z');
    if (!simplified1) throw new Error('Expected simplified path');
    console.log(`  Output: ${simplified1}`);
  });

  // Test 10: Initialize with custom wasmBinary (manually providing WASM file content)
  console.log('\n--- Testing with manually provided WASM binary ---');
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Read the WASM file as a buffer
    const wasmPath = path.join(__dirname, 'dist', 'simplifypath.wasm');
    const wasmBinary = fs.readFileSync(wasmPath);
    console.log(`  Loaded WASM binary: ${wasmBinary.length} bytes`);
    
    // Initialize with the WASM binary directly
    const CustomModule = await SimplifySvgPathInit({
      wasmBinary: wasmBinary
    });
    
    test('Custom wasmBinary - simple path', () => {
      const input = 'M0 0L100 0L100 100L0 100Z';
      const result = CustomModule.simplifySvgPath(input);
      if (!result) throw new Error('Expected simplified path, got null');
      console.log(`  Input:  ${input}`);
      console.log(`  Output: ${result}`);
    });
  } catch (error) {
    console.error(`✗ Failed to initialize with custom wasmBinary`);
    console.error(`  Error: ${error.message}`);
    failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`Tests passed: ${passed}`);
  console.log(`Tests failed: ${failed}`);
  console.log('='.repeat(50));

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

