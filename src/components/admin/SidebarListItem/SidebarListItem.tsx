import Link from "next/link";
import { useRouter } from "next/router";

export default function SidebarListItem({
  name,
  icon,
  path,
}: {
  name: string;
  icon: JSX.Element;
  path: string;
}) {
  const router = useRouter();

  var linkClasses =
    "flex flex-row h-14 items-center text-gray-500 hover:bg-gray-700 hover:text-gray-100 px-3 cursor-pointer";

  if (router.asPath === path) {
    linkClasses =
      "flex flex-row h-14 items-center bg-gray-700 text-gray-100 px-3";
  }

  return (
    <Link href={path} className={linkClasses}>
      <li className="flex flex-row items-center">
        {icon} {name}
      </li>
    </Link>
  );
}
