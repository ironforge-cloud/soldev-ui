/*
  Collection of helper functions for the course section
*/

/**
 * Save the given course lesson's completion state into local storage
 * @string key - the slug
 * @boolean isComplete - the completion state of the given course lesson
 * @returns value of `isComplete` once saved to local storage
 */
export function saveCourseLessonProgress(key: string, isComplete: boolean) {
  try {
    if (window) {
      let savedCourseState = JSON.parse(window.localStorage.getItem('course') as string);
      if (!savedCourseState) savedCourseState = {};

      // Save state for later using LocalStorage
      savedCourseState[key] = isComplete;
      window.localStorage.setItem('course', JSON.stringify(savedCourseState));

      return isComplete;
    }
  } catch (err) {
    console.log(err);
  }
  return false;
}

export function getCourseLessonProgress(key: string) {
  try {
    if (window) {
      let savedCourseState = JSON.parse(window.localStorage.getItem('course') as string);
      if (!savedCourseState) savedCourseState = {};

      if (savedCourseState.hasOwnProperty(key) && savedCourseState[key]) return true;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}
