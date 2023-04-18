import { ReactNode } from 'react';

interface iPageHeadersProps {
  icon?: ReactNode;
  title: string;
  rightContent?: ReactNode;
}

export default function PageHeaders({
  icon,
  title,
  rightContent,
}: iPageHeadersProps) {
  return (
    <div className="flex items-center justify-between pt-6 pb-4 px-12 ">
      <div className="flex items-center gap-3">
        <span>{icon}</span>
        <h1 className="text-lg font-medium"> {title} </h1>
      </div>
      <div>{rightContent}</div>
    </div>
  );
}
