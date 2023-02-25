/*
  Collection of helper function to standardize certain tasks
*/

/**
 * Compute the standard slug format used for SIMD proposals
 * @param simd record item
 * @returns `string` slug
 */
export function computeSlugForSIMD(simd: ParsedGitHubPullContent) {
  return (
    simd?.metadata?.simd +
    "-" +
    simd?.metadata?.title.toLowerCase().replace(/\s+/g, "-")
  );
}
