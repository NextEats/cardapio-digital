import { ReactNode } from 'react';

interface iPageHeadersProps {
  icon?: ReactNode;
  title: string;
}

export default function PageHeaders({ icon, title }: iPageHeadersProps) {
  return (
    <div className="flex items-center gap-3 pt-6 pb-4 px-12 ">
      {icon}
      <h1 className="text-lg font-medium"> {title} </h1>
    </div>
  );
}
