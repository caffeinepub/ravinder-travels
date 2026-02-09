/**
 * Helper to generate correct static asset URLs using the app's configured base path.
 * Supports both regular assets and generated assets for deployment compatibility.
 */
export function assetUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production, assets are served from the root
  // In development, Vite handles asset resolution
  return `/${cleanPath}`;
}

/**
 * Helper specifically for generated assets
 */
export function generatedAssetUrl(filename: string): string {
  return assetUrl(`assets/generated/${filename}`);
}
