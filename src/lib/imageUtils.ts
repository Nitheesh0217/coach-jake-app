/**
 * Image generation utilities for avatars and placeholder images
 * Generates consistent, deterministic images based on user data
 */

// Color palette for avatar backgrounds
const AVATAR_COLORS = [
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#f59e0b", // amber
  "#a855f7", // violet
  "#ec4899", // pink
  "#8b5cf6", // purple
  "#3b82f6", // blue
  "#14b8a6", // teal
];

/**
 * Generate a consistent color for a user based on their name/ID
 */
export function getAvatarColor(nameOrId: string): string {
  let hash = 0;
  for (let i = 0; i < nameOrId.length; i++) {
    hash = nameOrId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

/**
 * Generate SVG avatar with initials
 * Returns a data URL that can be used directly as an image source
 */
export function generateAvatarSvg(
  name: string,
  size: number = 64
): string {
  const initials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const backgroundColor = getAvatarColor(name);
  const textSize = size * 0.4;

  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="${size / 8}"/>
      <text
        x="${size / 2}"
        y="${size / 2 + textSize / 3}"
        font-size="${textSize}"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="system-ui, -apple-system, sans-serif"
      >
        ${initials}
      </text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Generate workout image with category icon
 * Returns a data URL
 */
export function generateWorkoutImageSvg(
  title: string,
  focusArea: string,
  size: number = 400
): string {
  const bgGradient = getWorkoutGradient(focusArea);

  const svg = `
    <svg width="${size}" height="${size * 0.6}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgGradient[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${bgGradient[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size * 0.6}" fill="url(#grad)"/>
      <rect width="${size}" height="${size * 0.6}" fill="rgba(0,0,0,0.3)"/>
      <text
        x="${size / 2}"
        y="${(size * 0.6) / 2}"
        font-size="${size * 0.12}"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="system-ui, -apple-system, sans-serif"
      >
        ${title}
      </text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Get gradient colors based on workout focus area
 */
function getWorkoutGradient(focusArea: string): [string, string] {
  const area = focusArea.toLowerCase();

  const gradients: Record<string, [string, string]> = {
    "ball handling": ["#06b6d4", "#0891b2"],
    "handles": ["#06b6d4", "#0891b2"],
    "shooting": ["#f59e0b", "#d97706"],
    "strength": ["#ef4444", "#dc2626"],
    "conditioning": ["#10b981", "#059669"],
    "finishing": ["#a855f7", "#9333ea"],
    "defense": ["#3b82f6", "#1d4ed8"],
    "footwork": ["#ec4899", "#be185d"],
  };

  // Find matching gradient or use default
  for (const [key, value] of Object.entries(gradients)) {
    if (area.includes(key)) {
      return value;
    }
  }

  // Default gradient
  return ["#10b981", "#06b6d4"];
}

/**
 * Cache for generated images to avoid re-generation
 */
const imageCache = new Map<string, string>();

/**
 * Get or generate avatar SVG with caching
 */
export function getAvatarImage(name: string, size: number = 64): string {
  const cacheKey = `avatar-${name}-${size}`;
  if (!imageCache.has(cacheKey)) {
    imageCache.set(cacheKey, generateAvatarSvg(name, size));
  }
  return imageCache.get(cacheKey)!;
}

/**
 * Get or generate workout image with caching
 */
export function getWorkoutImage(
  title: string,
  focusArea: string,
  size: number = 400
): string {
  const cacheKey = `workout-${title}-${focusArea}-${size}`;
  if (!imageCache.has(cacheKey)) {
    imageCache.set(cacheKey, generateWorkoutImageSvg(title, focusArea, size));
  }
  return imageCache.get(cacheKey)!;
}
