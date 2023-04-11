import { TableContext } from '@/src/contexts/TableContext';
import Image from 'next/image';
import { useContext } from 'react';

interface iTableHeaderProps {}

export default function TableHeader({}: iTableHeaderProps) {
  const { table } = useContext(TableContext);
  console.log(table);

  return (
    <div className="flex items-center gap-3 pt-6 pb-4 px-12 ">
      <Image
        className="h-10 w-10"
        src="/table_icon.jpg"
        alt=""
        height={200}
        width={200}
      />

      <h1 className="text-lg font-medium"> {table.name} </h1>
    </div>
  );
}
