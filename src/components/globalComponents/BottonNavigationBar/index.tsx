import { TableContext } from '@/src/contexts/TableContext';
import Link from 'next/link';
import { ReactNode, useContext } from 'react';

export interface iBottonNavigationBarProps {
  options: {
    url?: string;
    prefetch?: boolean;
    title?: string | ReactNode;
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
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-around py-4 px-2 md:px-12 border border-t border-t-white-blue">
      {options.map((option, index) => {
        if (option.openDialogTrigger) {
          return (
            <div key={index} className="flex items-center gap-2">
              <div> {option.icon} </div>
              <div className={` ${option.icon ? 'hidden lg:flex' : 'flex'}`}>
                {' '}
                {option.openDialogTrigger}{' '}
              </div>
            </div>
          );
        }
        if (!option.url) {
          return <div key={index}>{option.title}</div>;
        }
        return (
          <Link
            key={index}
            className="flex items-center gap-2 py-2"
            href={option.url!}
            prefetch={option.prefetch}
          >
            <div> {option.icon} </div>
            <span className="hidden lg:flex">{option.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
