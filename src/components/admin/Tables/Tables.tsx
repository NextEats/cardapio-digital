import { TableControlContext } from '@/src/contexts/TableControlContext';
import { useContext } from 'react';
import CreateTableModal from './CreateTableModal';
import InactiveTablesModal from './InactiveTables';
import TableCard from './TableCard';
// import TableModal from './TableModal';
import { serverURL } from '@/src/server/api';
import Link from 'next/link';

export default function Tables() {
  const { tables, restaurant } = useContext(TableControlContext);

  return (
    <div>
      <div className="flex flex-1 items-center justify-end mb-4">
        <CreateTableModal />
      </div>
      <span className="flex flex-1 items-center justify-end m-2">
        {<InactiveTablesModal />}
      </span>
      <div className="flex flex-col  sm:grid sm:grid-cols-2 xl:grid-cols-3 1280px gap-5 pb-24">
        {tables.map((t, index) => {
          if (t.is_active === true) return;
          return (
            <Link
              key={index}
              href={`${serverURL}${restaurant.slug}/admin/table-control/${t.table_slug}`}
              // prefetch={false}
            >
              <TableCard table={t} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
