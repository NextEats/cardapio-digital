import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

interface iSubscriptionPlanCard {
  monthlyPrice: number;
  name: string;
  description?: string;
  benefits: Array<string>;
}

export function SubscriptionPlanCard(props: iSubscriptionPlanCard) {
  const { monthlyPrice, name, description, benefits } = props;

  return (
    <div
      className={`flex flex-col justify-between gap-6 p-4 bg-white shadow-md rounded w-[20rem]`}
    >
      {/* <div className="w-full">
        <span className="text-4xl inline font-bold text-brand-dark-orange">
          R$&nbsp;{monthlyPrice}
        </span>
        <span className="ml-3 italic text-gray-500">por mês</span>
      </div> */}
      <div>
        <h4 className="w-full text-4xl font-semibold leading-8">{name}</h4>
        <p className="w-full mt-3 mb-6 italic text-gray-800">{description}</p>
        <ul className="w-full flex flex-col gap-1">
          {benefits.map((benefit, index) => {
            return (
              <li
                className="flex justify-start items-center gap-2 text-gray-700 font-medium"
                key={index}
              >
                <div className="h-8 w-8 min-h-8 min-w-8 flex items-center justify-center bg-gradient-to-r from-red-orange to-yellow-400 rounded-full">
                  <FaCheck className="text-lg text-white" />
                </div>
                <div className="flex justify-start max-w-[240px]">
                  <p className="">{benefit}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Link
        href={'https://wa.me/5511985872255'}
        prefetch={false}
        target="_blank"
        className="h-10 w-full flex items-center justify-center text-lg text-brand-light-orange font-medium bg-white rounded-sm border border-brand-light-orange hover:text-white hover:bg-brand-light-orange transition-all duration-200 "
      >
        Teste por 7 dias grátis
      </Link>
    </div>
  );
}

/* <div className="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-white z-30 border-t-2 md:border-2 border-[#CED1D5] md:rounded-2xl md:min-w-[250px]">
  <div className="">
    <h1 className="text-gray-700 text-4xl font-black">Start</h1>
    <p className="text-gray-500  mt-2">Plano Base</p>
  </div>
  <div className="text-center mt-3">
    <ul className="space-y-3 min-h-[200px]">
      <li className="flex items-center space-x-2" key={1}>
        <span className="bg-orange-600 rounded-full p-1">
          <svg
            xmlns="httwww.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <span className="text-gray-600 capitalize">vantagem 1</span>
      </li>
      <li className="flex items-center space-x-2" key={2}>
        <span className="bg-orange-600 rounded-full p-1">
          <svg
            xmlns="httwww.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <span className="text-gray-600 capitalize">Email Support</span>
      </li>
    </ul>
  </div>
  <button className="flex items-center justify-center w-full h-12 px-6 text-sm font-bold uppercase bg-gray-200 rounded">
    Testar por 7 dias grátis
  </button>
</div>  */
