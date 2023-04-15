import { TableContext } from '@/src/contexts/TableContext';
import Link from 'next/link';
import { ReactNode, useContext } from 'react';

export interface iBottonNavigationBarProps {
  options: {
    url?: string;
    prefetch?: boolean;
    title: string;
    icon?: ReactNode;
    openDialogTrigger?: ReactNode;
    button?: ReactNode;
  }[];
}

export default function BottonNavigationBar({
  options,
}: iBottonNavigationBarProps) {
  const { table, restaurant } = useContext(TableContext);

  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-around py-4 px-12 border border-t border-t-white-blue">
      {options.map((option, index) => {
        if (option.openDialogTrigger) {
          return <div key={index}>{option.openDialogTrigger}</div>;
        }
        return (
          <Link
            key={index}
            className="py-2"
            href={option.url!}
            prefetch={option.prefetch}
          >
            {option.icon} {option.title}
          </Link>
        );
      })}
    </div>
  );
}
