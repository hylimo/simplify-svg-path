/**
 * SimplifySvgPath - TypeScript Definitions
 * 
 * A minimal WASM build of Skia's PathOps for SVG path simplification.
 * Based on google/skia - Copyright (c) 2011 Google Inc.
 */

/**
 * Fill type determines how the interior of the path is computed for filling.
 */
export enum FillType {
  /**
   * Winding fill type (also known as non-zero). This is the default.
   * A point is inside if the winding number is non-zero.
   */
  Winding = 0,
  
  /**
   * Even-odd fill type.
   * A point is inside if the winding number is odd.
   */
  EvenOdd = 1
}

export interface Path {
  /**
   * Simplifies the path by removing self-intersections and overlaps.
   * @returns A new simplified Path, or null if simplification fails.
   */
  simplify(): Path | null;

  /**
   * Converts the path to an SVG path data string.
   * @returns SVG path data string (e.g., "M0 0L10 10Z")
   */
  toSVGString(): string;

  /**
   * Sets the fill type for the path.
   * @param fillType - The fill type to set (Winding or EvenOdd)
   */
  setFillType(fillType: FillType): void;

  /**
   * Gets the current fill type of the path.
   * @returns The current fill type
   */
  getFillType(): FillType;

  /**
   * Deletes the path and frees memory. Should be called when done with the path.
   */
  delete(): void;
}

export interface PathConstructor {
  /**
   * Creates a new empty Path.
   */
  new(): Path;

  /**
   * Creates a Path from an SVG path data string.
   * @param svgPath - SVG path data string (e.g., "M0 0L10 10Z")
   * @returns A new Path object, or null if parsing fails
   */
  MakeFromSVGString(svgPath: string): Path | null;
}

export interface SimplifySvgPathModule {
  /**
   * Path constructor for creating and manipulating paths.
   */
  Path: PathConstructor;

  /**
   * Fill type enumeration.
   */
  FillType: typeof FillType;

  /**
   * Convenience function to simplify an SVG path string in one call.
   * This function handles all path creation and cleanup automatically.
   * 
   * @param svgPath - SVG path data string to simplify
   * @param fillType - Optional fill type (defaults to FillType.Winding)
   * @returns Simplified SVG path string, or null if simplification fails
   * 
   * @example
   * // Using default Winding fill type
   * const simplified = SimplifySvgPath.simplifySvgPath('M0 0L100 100L100 0L0 100Z');
   * 
   * @example
   * // Using EvenOdd fill type
   * const simplified = SimplifySvgPath.simplifySvgPath(
   *   'M0 0L100 100L100 0L0 100Z',
   *   SimplifySvgPath.FillType.EvenOdd
   * );
   */
  simplifySvgPath(svgPath: string, fillType?: FillType): string | null;
}

export interface SimplifySvgPathInitOptions {
  /**
   * Path to the WASM file. If not provided, will try to load from the same directory as the JS file.
   */
  locateFile?: (file: string, scriptDirectory: string) => string;
  
  /**
   * Provide the WASM binary content directly instead of loading from a file.
   * This is useful when you want to bundle the WASM or load it from a custom source.
   * When provided, the WASM file will not be fetched automatically.
   * 
   * @example
   * const fs = require('fs');
   * const wasmBinary = fs.readFileSync('./simplifypath.wasm');
   * const SimplifySvgPath = await SimplifySvgPathInit({ wasmBinary });
   */
  wasmBinary?: ArrayBuffer | Uint8Array;
}

/**
 * Initializes the SimplifySvgPath module.
 * 
 * @param options - Optional initialization options
 * @returns Promise that resolves to the initialized module
 * 
 * @example
 * const SimplifySvgPath = await SimplifySvgPathInit();
 * const result = SimplifySvgPath.simplifySvgPath('M0 0L10 10');
 */
export default function SimplifySvgPathInit(
  options?: SimplifySvgPathInitOptions
): Promise<SimplifySvgPathModule>;
