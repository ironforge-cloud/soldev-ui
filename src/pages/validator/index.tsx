import DefaultLayout from '@/layouts/default';
import { NextSeoProps } from 'next-seo';
import PageHero from '@/components/core/PageHero';
import Link from 'next/link';

const seo: NextSeoProps = {
  title: 'SolDev Validator',
  description: 'SolDev Validator by @italoacasas'
};

export default function Page() {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container space-y-3 text-center">
        <h1>
          <Link href={'/validator'}>SolDev Validator</Link>
        </h1>

        <p className="text-base text-gray-500">
          <Link
            target="_blank"
            href="https://www.validators.app/validators/SDEVqCDyc3YzjrDn375SMWKpZo1m7tbZ12fsenF48x1?locale=en&network=mainnet"
          >
            SDEVqCDyc3YzjrDn375SMWKpZo1m7tbZ12fsenF48x1
          </Link>
        </p>

        <p className="max-w-2xl md:text-xl">
          by{' '}
          <Link
            className="underline"
            href="https://twitter.com/italoacasas"
            target="_blank"
            rel="noreferrer"
          >
            @italoacasas
          </Link>
        </p>
      </PageHero>

      <section className="container prose mb-10 max-w-4xl">
        <div className="flex flex-col space-y-3 md:space-x-3 md:space-y-0">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">What is SolDev Validator?</h2>

            <div className="mt-3 max-w-2xl">
              The SolDev Validator's mission is to support developers' journey into the Solana
              Ecosystem by providing grants to developers who are contributing to open source or
              creating high-quality developer content.
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">Grants, How and When</h2>

            <div className="mt-3 max-w-2xl">
              The SolDev Validator will start giving grants when it reaches profitability. More
              information will be shared soon on this page about the grant process and validator
              profitability status.
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">How to delegate to SolDev Validator</h2>

            <div className="mt-3 max-w-2xl">
              To delegate to the SolDev Validator, you can do it directly using a wallet like{' '}
              <Link target="_blank" href="https://phantom.app/">
                Phantom
              </Link>{' '}
              and{' '}
              <Link target="_blank" href="https://solflare.com/access-wallet">
                Solflare
              </Link>{' '}
              or using staking pools like Marinade(soon) and{' '}
              <Link
                target="_blank"
                href="https://stake.solblaze.org/app/?validator=9jYFwBfbjYmvasFbJyES9apLJDTkwtbgSDRWanHEvcRw"
              >
                Blaze
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">Commission</h2>

            <div className="mt-3 max-w-2xl">
              Our validator server is well-equipped to handle heavy loads and spam attacks that
              affect lesser systems.
              <ul role="list" className="list-disc space-y-3 pl-5">
                <li>Regular: 3%</li>
                <li>Jito: 8%</li>
              </ul>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">Specification</h2>

            <div className="mt-3 max-w-2xl">
              Our validator server is well-equipped to handle heavy loads and spam attacks that
              affect lesser systems.
              <ul role="list" className="list-disc space-y-3 pl-5">
                <li>Client: Jito</li>
                <li>Datacenter Partner: Latitude.sh</li>
                <li>Location: NYC</li>
                <li>CPU: AMD EPYC 7443P processor</li>
                <li>RAM: 256 GB of RAM</li>
                <li>Disk: 2 X 2 TB NVMe</li>
                <li>NICs: 10 Gbit/s + 1 Gbit/s</li>
              </ul>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">Security & Monitoring</h2>

            <div className="mt-3 max-w-2xl">
              For security, we follow Solana's recommended practices and have strong{' '}
              <Link href="https://www.latitude.sh/ddos-protection">
                DDOS protection from our datacenter
              </Link>{' '}
              . We also have a quick-alert monitoring system for any issues with server performance.
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
