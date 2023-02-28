/*
  Collection of helper function to standardize certain tasks
*/

/**
 * Card Image helper function
 * @param {Object} content
 * @return {String}
 */
export function computeImage(content: ContentRecord) {
  if (content.Img) return content.Img;
  else if (content.ContentType === "threads")
    return "/twitter-placeholder.webp";
  else if (
    content?.Url.includes("twitter") &&
    content.ContentType === "podcasts"
  )
    return "/twitter-placeholder.webp";

  return "/placeholder.webp";
}
