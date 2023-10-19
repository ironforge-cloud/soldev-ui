import Link from 'next/link';
import Image from 'next/image';

export default function AnnauncementBanner() {
  return (
    <div className="relative isolate mx-auto flex w-fit items-center gap-x-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#14F195] to-[#9945FF] px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        className="top-1/2 absolute left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#14F195] to-[#9945FF] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)'
          }}
        />
      </div>
      <div
        className="top-1/2 absolute left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="to-[#9945FF]] aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#14F195] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)'
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="flex flex-row gap-2 text-sm leading-6 text-gray-900">
          <Image src="/ironforge.svg" width={24} height={24} alt="Ironforge logo" />
          <strong className="font-semibold">Ironforge</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          Accelerate your Solana development.
        </p>
        <Link
          href="https://www.ironforge.cloud"
          className="mx-auto flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Get Started <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
