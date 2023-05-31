import { GoSearch } from 'react-icons/go';

export function TeamForm() {
  return (
    <>
      <div>
        <div className="flex flex-1 items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="text"
              className="bg-transparent outline-none border-b-2 border-b-gray-300 focus:border-b-brand-light-orange px-1 text-base text-gray-500"
            />
            <div className="bg-transparent outline-none border-b-2 border-b-gray-300 focus:border-b-brand-light-orange px-1 focus-within:text-brand-light-orange">
              <GoSearch className="text-gray-300" size={26} />
            </div>
          </div>
          <button className="px-3 py-1 text-white text-base bg-brand-light-orange rounded">
            convidar
          </button>
        </div>
      </div>
    </>
  );
}
