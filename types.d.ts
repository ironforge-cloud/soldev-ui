/* Primary type definitions */

// for `shareOnTwitterUrl()`
type TwitterShareMessage = {
  href: string;
  message: string;
  includeHandle?: boolean;
};
