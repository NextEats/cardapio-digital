import Link from 'next/link';
import { useRouter } from 'next/router';

interface iSidebarListItem
  extends React.ButtonHTMLAttributes<HTMLImageElement> {
  name: string;
  icon: any;
  path: string;
}

export default function SidebarListItem(props: iSidebarListItem) {
  const { name, icon, path } = props;
  const router = useRouter();
  const isTheCurrentPage = router.asPath === path;
  let stateDependentClasses: string;

  if (isTheCurrentPage) {
    stateDependentClasses = 'text-[#FFA53A] cursor-default';
  } else {
    stateDependentClasses =
      'text-white opacity-50 hover:opacity-100 cursor-pointer';
  }

  return (
    <Link
      href={path}
      className={`flex flex-row h-14 items-center px-3 text-md ${stateDependentClasses}`}
    >
      <li className="flex flex-row items-center">
        {icon} {name}
      </li>
    </Link>
  );
}
