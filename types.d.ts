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

// type for use with the content submission form
type SubmitContentData = {
  Title?: string;
  Author?: string;
  Description?: string;
  Url?: string;
  Tags?: string[];
  ContentType?: string;
  Position?: number;
  Vertical: "Solana";
  SpecialTag: "New";
  ContentStatus: "submitted";
};
