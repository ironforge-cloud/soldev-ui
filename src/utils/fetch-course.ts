import { CourseStructure } from '../lib/types';
import { get } from 'fetch-unfucked';
import { log, stringify } from '../utils/helpers';

const BRANCH: 'main' | 'draft' = 'draft';

export const fetchLessonText = async (slug: string, locale?: string): Promise<string> => {
  const url = `https://raw.githubusercontent.com/Unboxed-Software/solana-course/${BRANCH}/content${
    locale && locale != 'en' ? '/' + locale : ''
  }/${slug}.md`;
  const response = await get(url, null, 'text/plain');

  if (response.status !== 'OK') {
    throw new Error(`Error: ${response.status} GETting ${url}`);
  }

  return response.body;
};

export const fetchCourseStructure: () => Promise<CourseStructure> = async () => {
  const url = `https://raw.githubusercontent.com/Unboxed-Software/solana-course/${BRANCH}/course-structure.json`;
  const response = await get(url, null, 'application/json');

  if (response.status !== 'OK') {
    throw new Error(`Error: ${response.status} GETting ${url}`);
  }

  return response.body;
};

// /**
//  * Fetches a list of global UI messages from a remote JSON file.
//  * @returns {Promise<Result<string | undefined>>}
//  */
// export const fetchMessages: (locale?: string) => Promise<Result<any>> = async (locale = 'en') => {
//   const response = await fetchFile<Result<ParsedGitHubContent>>(
//     'Unboxed-Software',
//     'solana-course',
//     `translations/${locale}/messages.json`
//   );

//   const { data, error } = response;

//   if (data === undefined) {
//     return {
//       data: undefined,
//       error: response.error
//     };
//   }

//   const messages = JSON.parse(await fetchRaw(data.download_url));

//   return {
//     data: messages
//   };
// };
