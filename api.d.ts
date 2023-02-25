/*
    Type definitions for the SolDev API
    ---
    NOTE: The API is handled by the separate repo located here:
    https://github.com/ironforge-cloud/soldev-api/
*/

type ContentRecord = {
  // DynamoDB composite key
  PK: string;
  SK: string;

  ContentStatus: string; // "active", "inactive" and "submitted"

  Position: number; // content != playlists means weight
  Tags: string[];
  Lists: string; // TODO: in the future this will be a slice
  SpecialTag: string; // "new", "hot", "best" and "old"

  Url: string;
  Title: string;
  Description: string;
  PublishedAt: string;
  Img: string;
  Author: string;
  ContentType: string;
  Vertical: string;

  // Newsletter specific
  ContentMarkdown: string;

  // Video specific
  PlaylistID: string;
  Promoted: number; // deprecated
  Live: number; // deprecated
  Provider: string;
  Expdate: number;

  PlaylistTitle: string;
};
