import { CourseStructure, Translations } from '../lib/types';
import { get } from 'fetch-unfucked';

const BRANCH: 'main' | 'draft' = 'main';

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

export const fetchCourseTranslations: (locale?: string) => Promise<Translations> = async (
  locale = 'en'
) => {
  const url = `https://raw.githubusercontent.com/Unboxed-Software/solana-course/${BRANCH}/translations/${locale}/titles.json`;
  const response = await get(url, null, 'application/json');

  const { body } = response;

  return body;
};

export const fetchMessages: (locale?: string) => Promise<Translations> = async (locale = 'en') => {
  const url = `https://raw.githubusercontent.com/Unboxed-Software/solana-course/${BRANCH}/translations/${locale}/messages.json`;
  const response = await get(url, null, 'application/json');

  const { body } = response;

  return body;
};
