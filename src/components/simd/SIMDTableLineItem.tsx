import dataTableStyles from '@/styles/core/dataTable.module.css';
import Link from 'next/link';

import { ArrowTopRightOnSquareIcon, ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { computeSlugForSIMD } from '@/utils/helpers';

type AuthorDetails = {
  name: string;
  org?: string;
  link?: string;
};

export type SIMDTableLineItemProps = {
  simd: string;
  href?: string;
  githubLink: string;
  title: string;
  status: 'draft' | string;
  type: string;
  date?: string;
  authors?: Array<string | AuthorDetails>;
  description?: string;
};

export default function SIMDTableLineItem({
  simd = '????',
  title,
  href,
  githubLink,
  authors,
  date,
  type,
  status,
  description
}: SIMDTableLineItemProps) {
  // compute the href, if none is provided
  if (!href) href = `/simd/${encodeURIComponent(computeSlugForSIMD(simd, title))}`;

  return (
    <tr>
      <td className="uppercase">{('000' + simd.toString()).slice(-4)}</td>
      <td>
        <Link href={href} className="font-semibold underline">
          {title}
        </Link>
      </td>
      <td>{type}</td>
      <td className="lowercase">{status}</td>
      <td>
        <ul className={dataTableStyles.dataList}>
          {authors?.map((author, id) => <SIMDAuthorLineItem key={id} author={author} />) || (
            <li>[no authors found]</li>
          )}
        </ul>
      </td>
      <td className="whitespace-nowrap">{date}</td>
      <td>
        <div className="flex space-x-2">
          <Link href={githubLink} target="_blank" className="" title="View on GitHub">
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

export function SIMDAuthorLineItem({ author }: { author: string | AuthorDetails }) {
  // console.log(author);
  if (typeof author == 'object')
    return (
      <li>
        {author?.link ? (
          <Link href={author.link} target="_blank" className="inline-flex hover:underline">
            {author.name}
            <ArrowTopRightOnSquareIcon className="icon-sm mx-1" />
          </Link>
        ) : (
          <span>
            {author?.name}
            {author?.org && <span className="mx-1">({author.org})</span>}
          </span>
        )}
      </li>
    );
  else return <li>{author}</li>;
}
