import { ProductContext } from '@/src/contexts/ProductContext';
import { useContext } from 'react';

const CategoriesHorizontalListMenu = () => {
  const { categories, setFilter, filter } = useContext(ProductContext);

  function handleFilterByCategory(categoryId: number) {
    setFilter({
      name: null,
      category: categoryId,
    });
  }

  return (
    <div className="w-full overflow-x-auto flex items-center gap-2 pb-3 scrollbar-custom">
      <div
        onClick={() => handleFilterByCategory(0)}
        className={`flex items-center justify-center px-6 border border-[#c5c5c5] cursor-pointer rounded font-semibold transition 
            ${
              filter.category === 0
                ? 'bg-brand-dark-orange border-brand-dark-orange text-white'
                : 'border-[#c5c5c5] text-[#717171]'
            }`}
      >
        <span className="text-base mb-[3px]"> TODOS </span>
      </div>
      {categories.map((category: any) => {
        return (
          <div
            key={category.id}
            onClick={() => handleFilterByCategory(category.id)}
            className={`flex items-center justify-center px-6 border border-[#c5c5c5] cursor-pointer rounded font-semibold  transition
                ${
                  filter.category === category.id
                    ? 'bg-brand-dark-orange border-brand-dark-orange text-white'
                    : 'border-[#c5c5c5] text-[#717171]'
                }`}
          >
            <span className="text-base mb-[3px] truncate">
              {' '}
              {category.name}{' '}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesHorizontalListMenu;
