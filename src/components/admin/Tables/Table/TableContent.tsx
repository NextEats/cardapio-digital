import TableOrder from './TableOrder';
import TableValueCards from './TableValueCards';

export default function TableContent() {
  return (
    <div className="max-h-[calc(100%-80px)] overflow-y-auto pb-24">
      <div className="h-full  px-6 3xs:px-16 py-4 flex flex-col 2md:flex-row gap-3 lg:gap-10">
        <TableValueCards />
        <TableOrder />
      </div>
    </div>
  );
}
