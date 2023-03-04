/* Primary type definitions */

// for `shareOnTwitterUrl()`
type TwitterShareMessage = {
  href: string;
  message: string;
  includeHandle?: boolean;
};

// for use within library playlists
type PlaylistItem = {
  key: string;
  slug?: string;
  title: string;
  description: string;
  titleFilter?: string;
  authorOverride?: string;
};
