/* eslint-disable react/no-unescaped-entities */

const Features = () => {
  return (
    <div className="flex flex-col sm:flex-col lg:flex-row xl:flex-row md:flex-row justify-center mt-10">
      <div className="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-white z-30 border-t-2 md:border-2 border-[#CED1D5] md:rounded-2xl md:min-w-[250px]">
        {/* <h1 className="text-gray-500 font-semibold text-xl ">Start</h1> */}
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
      </div>
      <div className="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-orange-500 transform scale-1 sm:scale-1 md:scale-105 lg:lg:scale-105 xl:scale-105 z-40  shadow-none sm:shadow-none md:shadow-xl lg:shadow-xl xl:shadow-xl md:rounded-2xl md:min-w-[300px] lg:min-h-[400px]">
        {/* <h1 className="text-purple-200 font-semibold text-xl ">Expert</h1> */}
        <div className="">
          <h1 className="text-white text-4xl font-black">Expert</h1>
          <p className="text-white mt-2">Tudo do Plano Pro +</p>
        </div>
        <div className="text-center mt-3">
          <ul className="space-y-3 min-h-[200px]">
            <li className="flex items-center space-x-2" key={1}>
              <span className="bg-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-[#FC6E25]"
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
              <span className="text-white capitalize">vantagem 1</span>
            </li>
            <li className="flex items-center space-x-2" key={2}>
              <span className="bg-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-[#FC6E25]"
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
              <span className="text-white capitalize">Email Support</span>
            </li>
          </ul>
        </div>
        <button className="flex items-center justify-center w-full h-12 px-6 text-sm font-bold uppercase bg-gray-200 rounded">
          Testar por 7 dias grátis
        </button>
      </div>
      <div className="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-white z-30 border-b-2  md:border-2 border-[#CED1D5] md:rounded-2xl md:min-w-[250px]">
        {/* <h1 className="text-gray-500 font-semibold text-xl ">Pro</h1> */}
        <div className="7">
          <h1 className="text-gray-700 text-4xl font-black">Pro</h1>
          <p className="text-gray-500  mt-2">Tudo do Plano Start +</p>
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
      </div>
    </div>
  );
};

export default Features;
