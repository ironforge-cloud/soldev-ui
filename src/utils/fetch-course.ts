import { fetchFile, fetchRaw } from '@/utils/fetch-github';

interface Result<T> {
  data?: T;
  error?: string;
}

type TranslationsByLanguage = Record<
  // ISO 639-1 language code, eg 'es' for Spanish, 'cz' for Czech, etc.
  // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
  string,
  {
    title: string;
    objectives: Array<string>;
  }
>;

/**
 * Defines the type of single course module/lesson item.
 */
type Lesson = {
  title: string;
  slug: string;
  objectives: Array<string>;
  number: number;
  hidden: boolean;
  translations: TranslationsByLanguage;
};

/**
 * Defines the type of course module containing lessons.
 */
export type CourseModule = {
  number: number;
  title: string;
  lessons: Array<Lesson>;
};

/**
 * Fetches course lesson from the remote repository
 * @returns {Promise<Result<string | undefined>>}
 */
export const fetchLesson: (lessonName: string) => Promise<Result<string | undefined>> = async (
  lessonName: string
) => {
  const response = await fetchFile<Result<ParsedGitHubContent>>(
    'Unboxed-Software',
    'solana-course',
    `content/${lessonName}`
  );

  const { data, error } = response;

  if (data === undefined) {
    return {
      data: undefined,
      error: response.error
    };
  }

  return {
    data: await fetchRaw(data.download_url)
  };
};

/**
 * Fetches a list of course modules from a remote JSON file.
 * @returns {Promise<Result<CourseModule[]>>}
 */
export const fetchModuleMap: () => Promise<Result<CourseModule[]>> = async () => {
  const response = await fetchFile<Result<ParsedGitHubContent>>(
    'Unboxed-Software',
    'solana-course',
    'course-structure.json'
  );

  const { data, error } = response;

  if (data === undefined) {
    return {
      data: undefined,
      error: response.error
    };
  }

  const moduleMap = JSON.parse(await fetchRaw(data.download_url)) as CourseModule[];

  return {
    data: moduleMap
  };
};
