import { CONTENT_LEVELS, CONTENT_TYPES, CONTENT_TAGS } from '@/lib/constants/content';

import LibraryFilterItem from './LibraryFilterItem';

type ComponentProps = {
  className?: string;
};

export default function LibraryFilters({ className }: ComponentProps) {
  return (
    <div className={className}>
      <LibraryFilterItem name="types" label="Type" items={CONTENT_TYPES} />
      <LibraryFilterItem name="levels" label="Level" items={CONTENT_LEVELS} />
      {CONTENT_TAGS.map((section, id) => (
        <LibraryFilterItem
          key={id}
          name={section.label.toLowerCase()}
          label={section.label}
          items={section.options}
        />
      ))}
    </div>
  );
}
