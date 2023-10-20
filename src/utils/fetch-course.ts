import { CourseStructure } from '../lib/types';
import { get } from 'fetch-unfucked';
import { log, stringify } from '../utils/helpers';

const BRANCH: 'main' | 'draft' = 'draft';

export const fetchLessonText = async (slug: string): Promise<string> => {
  const url = `https://raw.githubusercontent.com/Unboxed-Software/solana-course/${BRANCH}/content/${slug}.md`;
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
