import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const LOCALES = {
  en: {
    title: 'English',
    icon: '🇺🇸'
  },
  es: {
    title: 'Spanish',
    icon: '🇪🇸'
  },
  fr: {
    title: 'French',
    icon: '🇫🇷'
  }
};

export default function LanguagePicker() {
  const router = useRouter();
  const { pathname, asPath, query, locale, defaultLocale } = router;

  const currentLocale = locale || defaultLocale || 'en';
  const localeObject = LOCALES[currentLocale as keyof typeof LOCALES];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedLocale = localStorage.getItem('locale');

      // Only push for alternative language if stored locale is not english (given it's the default locale)
      if (storedLocale && storedLocale != 'en' && currentLocale != storedLocale) {
        router.push({ pathname, query }, asPath, { locale: storedLocale });
      }
    }
  }, []);

  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button className="btn btn-dark w-36 justify-center gap-x-1.5 rounded-md px-3">
          {localeObject.title} {localeObject.icon}
          <ChevronDownIcon className="right-0 -mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-1 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            <LocaleItem locale="en" />
            <LocaleItem locale="es" />
            <LocaleItem locale="fr" />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const LocaleItem = ({ locale }: { locale: keyof typeof LOCALES }) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const localeObject = LOCALES[locale];

  const setLocale = (locale: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('locale', locale);
    }
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={() => {
            setLocale(locale);
          }}
          className={classNames(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block w-full rounded-md px-4 py-2 text-left text-sm'
          )}
        >
          {localeObject.title} {localeObject.icon}
        </button>
      )}
    </Menu.Item>
  );
};
