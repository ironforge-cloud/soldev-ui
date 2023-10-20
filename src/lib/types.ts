// Should match https://github.com/Unboxed-Software/solana-course/blob/main/src/lib/types.ts

export type CourseStructure = {
  tracks: Array<Track>;
};

type Track = {
  title: string;
  units: Array<Unit>;
};

// Formerly called 'Module' or 'CourseModule'
export type Unit = {
  title: string;
  lessons: Array<Lesson>;
};

// Formerly was previously called both 'Lesson' and 'ModuleItem' and 'Line Item'
type Lesson = {
  title: string;
  slug: string;
  lab?: string;
  hidden?: boolean;
};
