/*
    Constants related to specific playlists
*/

// define the important playlist keys for easily retrieving their content
export const PLAYLIST_KEYS = {
  coreCommunityCalls: 'PLilwLeBwGuK7e_mH_sFwTytYQxalh7xd5',
  validatorCommunityCalls: 'PLilwLeBwGuK78yjGBZwYhTf7rao0t13Zw',
  superteamEcosystemCalls: 'PL3lU6B-N55SorbjvAYTFL6svTu6hfjKH8'
};

// hard code a listing of the important playlists to use within the `library/playlist/[slug]` page
export const PLAYLIST_LISTING: PlaylistItem[] = [
  {
    key: PLAYLIST_KEYS.coreCommunityCalls,
    slug: 'core-community-calls',
    title: 'Core Community Calls',
    description:
      'Monthly updates on changes to the Solana protocol, including discussions around proposed Solana Improvement Documents.',
    authorOverride: 'Solana Foundation',
    titleFilter: 'solana core community call - '
  },
  {
    key: PLAYLIST_KEYS.validatorCommunityCalls,
    slug: 'validator-community-discussions',
    title: 'Community Validator Discussions',
    description:
      'Discussions from the Solana Validator Community on operations, upcoming changes, and best practices.',
    authorOverride: 'Solana Foundation',
    // titleFilter: "solana community validator discussion - ",
    titleFilter: 'solana community'
  },
  {
    key: PLAYLIST_KEYS.superteamEcosystemCalls,
    slug: 'superteam-ecosystem-calls',
    title: "Superteam's Ecosystem Calls",
    description: 'Community updates from around the Solana ecosystem, brought to you by Superteam.',
    authorOverride: 'Superteam',
    titleFilter: 'solana ecosystem call - '
  },
  {
    key: 'PLilwLeBwGuK7Z2dXft_pmLZ675fuPgkA0',
    slug: 'solana-bootcamp',
    title: 'Solana Bootcamp',
    description:
      'Learn the fundamentals of building with the complete introductory Solana bootcamp.',
    authorOverride: 'Jarry Xiao'
    // titleFilter: "solana community",
  }
];
