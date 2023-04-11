import { TableContext } from '@/src/contexts/TableContext';
import { serverURL } from '@/src/server/api';
import Link from 'next/link';
import { useContext } from 'react';

interface iBottonNavigationBarProps {}

export default function BottonNavigationBar({}: iBottonNavigationBarProps) {
  const { table, restaurant } = useContext(TableContext);
  console.log(table);

  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-around py-4 px-12 ">
      <Link
        className="py-2"
        href={`${serverURL}${restaurant.slug}/admin/table-control`}
        prefetch={false}
      >
        Voltar
      </Link>
      <Link
        className="py-2"
        href={`${serverURL}${restaurant.slug}/admin/table-control`}
        prefetch={false}
      >
        Voltar
      </Link>
      <Link
        className="py-2"
        href={`${serverURL}${restaurant.slug}/admin/table-control`}
        prefetch={false}
      >
        Voltar
      </Link>
      <Link
        className="py-2"
        href={`${serverURL}${restaurant.slug}/admin/table-control`}
        prefetch={false}
      >
        Voltar
      </Link>
      <Link
        className="py-2"
        href={`${serverURL}${restaurant.slug}/admin/table-control`}
        prefetch={false}
      >
        Voltar
      </Link>
    </div>
  );
}
