import { HiOutlineUserCircle } from 'react-icons/hi';

export function UserTable() {
  return (
    <>
      <div>
        <table className="table-auto w-full">
          <thead className="rounded-tl-md rounded-tr-md  bg-white-blue h-9">
            <tr>
              <th className="text-base font-medium w-9"></th>
              <th className="text-base font-medium text-left px-4">
                Usuário {'(3)'}
              </th>
              <th className="text-base font-medium text-left px-4">Cargo</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="">
              <td className="pl-3 pr-4 py-[14px]">
                <HiOutlineUserCircle size={36} />{' '}
              </td>
              <td className="px-4">
                <div className="flex flex-col ">
                  <span className="text-base font-medium">Nome do Usuário</span>
                  <span className="text-sm font-light">
                    emailsousuário@gmail.com
                  </span>
                </div>
              </td>
              <td className="px-4">name</td>
              <td className="pr-3 pl-4 cursor-pointer">...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
