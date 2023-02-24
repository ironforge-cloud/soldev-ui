import dataTableStyles from "@/styles/core/dataTable.module.css";
import Link from "next/link";

import {
  ArrowTopRightOnSquareIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

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
  prevLabel,
}: ComponentProps) {
  return (
    <section
      className={`grid w-full gap-y-4 lg:gap-8 lg:grid-cols-2 ${className}`}
    >
      <Link
        href={prevHref}
        className="flex justify-between order-2 w-full space-x-5 lg:justify-start lg:order-1 btn btn-lg btn-light"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>{prevLabel || "Previous"}</span>
      </Link>
      <Link
        href={nextHref}
        className="flex justify-between order-1 w-full space-x-5 font-semibold text-gray-700 lg:justify-end lg:order-2 btn-lg btn btn-light"
      >
        <span>{nextLabel || "Next"}</span>
        <ArrowRightIcon className="w-5 h-5" />
      </Link>
    </section>
  );
}
