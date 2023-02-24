import dataTableStyles from "@/styles/core/dataTable.module.css";
import Link from "next/link";

import {
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";

type AuthorDetails = {
  name: string;
  link: string;
};

export type SIMDTableLineItemProps = {
  className?: string;
  id: number;
  href: string;
  githubLink: string;
  title: string;
  status: "draft";
  type: "core" | "meta";
  date?: string;
  authors?: Array<string | AuthorDetails>;
  description?: string;
};

export default function SIMDTableLineItem({
  className,
  id,
  title,
  href,
  githubLink,
  authors,
  date,
  type,
  status,
  description,
}: SIMDTableLineItemProps) {
  return (
    <tr>
      <td>{("000" + id.toString()).slice(-4)}</td>
      <td>
        <Link href={href} className="font-semibold underline">
          {title}
        </Link>
      </td>
      <td>{type}</td>
      <td>{status}</td>
      <td>
        <ul className={dataTableStyles.dataList}>
          {authors?.map((author, id) => (
            <SIMDAuthorLineItem key={id} author={author} />
          )) || <li>no authors found</li>}
        </ul>
      </td>
      <td>{date}</td>
      <td>
        <div className="flex space-x-2">
          <Link
            href={githubLink}
            target="_blank"
            className=""
            title="View on GitHub"
          >
            <ArrowTopRightOnSquareIcon className="icon-md" />
          </Link>
          <Link href={href} className="" title="Read more">
            <ArrowUpRightIcon className="icon-md" />
          </Link>
        </div>
      </td>
    </tr>
  );
}

export function SIMDAuthorLineItem({
  author,
}: {
  author: string | AuthorDetails;
}) {
  if (typeof author == "object")
    return (
      <li>
        <Link
          href={author.link}
          target="_blank"
          className="inline-flex hover:underline"
        >
          {author.name}
          <ArrowTopRightOnSquareIcon className="mx-1 icon-sm" />
        </Link>
      </li>
    );
  else return <li>{author}</li>;
}
