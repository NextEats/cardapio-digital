import TableOrder from './TableOrder';
import TableValueCards from './TableValueCards';

export default function TableContent() {
  return (
    <div className="h-[calc(100%-80px)] px-16 py-4 flex flex-col 2md:flex-row gap-3 lg:gap-10">
      <TableValueCards />
      <TableOrder />
    </div>
  );
}
