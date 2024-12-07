'use client';

import { useTransition } from 'react';

import classNames from 'classnames';
import { useParams } from 'next/navigation';

import { usePathname, useRouter } from '@/navigation';

type AuthFooterLocaleSwitcherSelectProps = {
  defaultValue: string;
  label: string;
  children: React.ReactNode;
};

export const AuthFooterLocaleSwitcherSelect = ({
  defaultValue,
  label,
  children,
}: AuthFooterLocaleSwitcherSelectProps) => {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;

    startTransition(() =>
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      router.replace({ pathname, params }, { locale: nextLocale })
    );
  };

  return (
    <label
      className={classNames('text-tertiary relative text-sm', {
        '[&:disabled]:opacity-30': isPending,
      })}
      htmlFor="locale-select"
    >
      <span className="sr-only">{label}</span>
      <select
        aria-labelledby="locale-switcher-title"
        className="bg-transparent"
        defaultValue={defaultValue}
        disabled={isPending}
        id="locale-select"
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
};
