/*
Collection of helper function to standardize certain tasks
*/

import { SITE_ADDR, SITE_TWITTER_HANDLE } from "@/lib/constants/general";

/**
 * Compute the standard slug format used for SIMD proposals
 * @param simd record item
 * @returns `string` slug
 */
export function computeSlugForSIMD(simd: ParsedGitHubPullContent) {
  return (
    simd?.metadata?.simd +
    "-" +
    simd?.metadata?.title?.toLowerCase().replace(/\s+/g, "-")
  );
}

/*
  Shorthand function for creating the "Share on Twitter" links
*/
export function shareOnTwitterUrl({
  href,
  message,
  includeHandle = true,
}: TwitterShareMessage) {
  // auto convert internal routes to use the site's domain
  if (href.substring(0, 1) == "/") href = `${SITE_ADDR}${href}`;

  return `https://twitter.com/share?url=${href}&text=${message}${
    includeHandle ? ` on @${SITE_TWITTER_HANDLE}` : ""
  }%0A%0A`;
}

/*
  Parse the given comma-separated string into an array, with de-blanking
  (e.g. for parsing url arrays)
*/
export function computeFilterFromUrlParam(val: string): string[] {
  return decodeURIComponent(val)
    .split(",")
    .filter((item) => item && item);
}
