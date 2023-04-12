import TableOrder from './TableOrder';
import TableValueCards from './TableValueCards';

export default function TableContent() {
  return (
    <div className="w-full h-full px-16 flex justify-center gap-10">
      <TableValueCards />
      <TableOrder />
    </div>
  );
}
