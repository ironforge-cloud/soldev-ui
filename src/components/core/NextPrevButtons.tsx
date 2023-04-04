import Link from 'next/link';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

type ComponentProps = {
  className?: string;
  nextHref: string;
  nextLabel: string;
  prevHref: string;
  prevLabel: string;
};

export default function NextPrevButtons({
  className,
  nextHref,
  nextLabel,
  prevHref,
  prevLabel
}: ComponentProps) {
  return (
    <section className={`grid w-full gap-y-4 lg:grid-cols-2 lg:gap-8 ${className}`}>
      <Link
        href={prevHref}
        className="btn btn-lg btn-light order-2 flex w-full justify-between space-x-5 lg:order-1 lg:justify-start"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>{prevLabel || 'Previous'}</span>
      </Link>
      <Link
        href={nextHref}
        className="btn-lg btn btn-light order-1 flex w-full justify-between space-x-5 font-semibold text-gray-700 lg:order-2 lg:justify-end"
      >
        <span>{nextLabel || 'Next'}</span>
        <ArrowRightIcon className="h-5 w-5" />
      </Link>
    </section>
  );
}
