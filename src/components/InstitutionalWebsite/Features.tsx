/* eslint-disable react/no-unescaped-entities */

const Features = () => {
  return (
    // <div className="w-screen relative bg-gray-800">
    //   <div className="grid grid-cols-1 pt-16 p-6 gap-y-3 lg:grid-cols-3 gap-x-3 max-w-[1500px] mx-auto lg:pt-24 lg:pb-44">
    //     <CardSubscriptionPlan
    //       monthlyPrice={100}
    //       name="Start"
    //       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
    //       features={['Funcionalidade', 'Funcionalidade', 'Funcionalidade']}
    //     />
    //     <CardSubscriptionPlan
    //       monthlyPrice={270}
    //       name="Pro"
    //       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
    //       features={['Funcionalidade', 'Funcionalidade', 'Funcionalidade']}
    //     />
    //     <CardSubscriptionPlan
    //       monthlyPrice={670}
    //       name="Expert"
    //       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
    //       features={['Funcionalidade', 'Funcionalidade', 'Funcionalidade']}
    //     />
    //   </div>
    // </div>
    // <div className="flex flex-col items-center justify-center p-10 text-gray-700 md:p-10">
    //   {/* <!-- Component Start --> */}
    //   <div className="flex flex-wrap items-center justify-center w-full max-w-5xl mt-8">
    //     <div className="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg border-2 border-[#CED1D5] shadow-lg min-h-[450px] min-w-[300px] ">
    //       <div className="flex flex-col items-start p-6">
    //         <span className="text-4xl">Start</span>
    //       </div>
    //       <div className="p-6">
    //         <ul className="space-y-6">
    //           <li className="flex items-center space-x-2">
    //             <span className="bg-orange-600 rounded-full p-1">
    //               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
    //                 <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    //               </svg>
    //             </span>
    //             <span className="text-gray-600 capitalize">vantagem 1</span>
    //           </li>
    //           <li className="flex items-center space-x-2">
    //             <span className="bg-orange-600 rounded-full p-1">
    //               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
    //                 <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    //               </svg>
    //             </span>
    //             <span className="text-gray-600 capitalize">Email Support</span>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>

    //     {/* <!-- Tile 2 --> */}
    //     <div className="z-10 flex flex-col flex-grow mt-8 overflow-hidden transform bg-[#FC6E25] rounded-lg shadow-lg md:scale-110 min-h-[480px] w-[350px]">
    //       <div className="flex flex-col items-start p-6">
    //         <span className="text-4xl text-white">Expert</span>
    //         {/* <div className="flex items-center">
    //           <span className="text-3xl">$</span>
    //           <span className="text-5xl font-bold">20</span>
    //           <span className="text-2xl text-gray-500">/mo</span>
    //         </div> */}
    //       </div>
    //       <div className="p-6 h-full">
    //         <ul className="space-y-6 min-h-[200px]">
    //           <li className="flex items-center space-x-2">
    //             <span className="bg-white rounded-full p-1">
    //               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FC6E25]" viewBox="0 0 20 20" fill="currentColor">
    //                 <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    //               </svg>
    //             </span>
    //             <span className="text-white capitalize">vantagem 1</span>
    //           </li>
    //           <li className="flex items-center space-x-2">
    //             <span className="bg-white rounded-full p-1">
    //               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FC6E25]" viewBox="0 0 20 20" fill="currentColor">
    //                 <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    //               </svg>
    //             </span>
    //             <span className="text-white capitalize">Email Support</span>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="flex px-10 p-4 justfy-center">
    //         <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">Testar por 7 dias grátis</button>
    //       </div>
    //     </div>

    //     {/* <!-- Tile 3 --> */}
    //     <div className="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg border-2 border-[#CED1D5] shadow-lg min-h-[450px] min-w-[300px] mt-19">
    //       <div className="flex flex-col items-start p-6">
    //         <span className="text-4xl">Pro</span>
    //         {/* <div className="flex items-center">
    //           <span className="text-3xl">$</span>
    //           <span className="text-5xl font-bold">20</span>
    //           <span className="text-2xl text-gray-500">/mo</span>
    //         </div> */}
    //       </div>
    //       <div className="p-6">
    //         <ul className="space-y-6">
    //           <li className="flex items-center space-x-2">
    //             <span className="bg-orange-600 rounded-full p-1">
    //               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
    //                 <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    //               </svg>
    //             </span>
    //             <span className="text-gray-600 capitalize">vantagem 1</span>
    //           </li>
    //           <li className="flex items-center space-x-2">
    //             <span className="bg-orange-600 rounded-full p-1">
    //               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
    //                 <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    //               </svg>
    //             </span>
    //             <span className="text-gray-600 capitalize">Email Support</span>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>

    // </div>
    <div className="flex flex-col sm:flex-col lg:flex-row xl:flex-row md:flex-row justify-center mt-10">
      <div className="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-white z-30 lg:border-2 border-[#CED1D5] lg:rounded-2xl lg:min-w-[250px]">
        {/* <h1 className="text-gray-500 font-semibold text-xl ">Start</h1> */}
        <div className="">
          <h1 className="text-gray-700 text-4xl font-black">Start</h1>
        </div>
        <div className="text-center mt-3">
          <ul className="space-y-6">
            <li className="flex items-center space-x-2">
              <span className="bg-orange-600 rounded-full p-1">
                <svg
                  xmlns="httwww.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <span className="text-gray-600 capitalize">vantagem 1</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="bg-orange-600 rounded-full p-1">
                <svg
                  xmlns="httwww.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <span className="text-gray-600 capitalize">Email Support</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-orange-500 transform scale-1 sm:scale-1 md:scale-105 lg:lg:scale-105 xl:scale-105 z-40  shadow-none sm:shadow-none md:shadow-xl lg:shadow-xl xl:shadow-xl lg:rounded-2xl lg:min-w-[300px] lg:min-h-[400px]">
        {/* <h1 className="text-purple-200 font-semibold text-xl ">Expert</h1> */}
        <div className="">
          <h1 className="text-white text-4xl font-black">Expert</h1>
          <p className="text-white mt-2">Tudo do Plano Pro +</p>
        </div>
        <div className="text-center mt-3">
          <ul className="space-y-6 min-h-[200px]">
            <li className="flex items-center space-x-2">
              <span className="bg-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-[#FC6E25]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <span className="text-white capitalize">vantagem 1</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="bg-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-[#FC6E25]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
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
      <div className="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-white z-30 lg:border-2 border-[#CED1D5] lg:rounded-2xl lg:min-w-[250px]">
        {/* <h1 className="text-gray-500 font-semibold text-xl ">Pro</h1> */}
        <div className="7">
          <h1 className="text-gray-700 text-4xl font-black">Pro</h1>
          <p className="text-gray-500  mt-2">Tudo do Plano Start +</p>
        </div>
        <div className="text-center mt-3">
          <ul className="space-y-6">
            <li className="flex items-center space-x-2">
              <span className="bg-orange-600 rounded-full p-1">
                <svg
                  xmlns="httwww.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <span className="text-gray-600 capitalize">vantagem 1</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="bg-orange-600 rounded-full p-1">
                <svg
                  xmlns="httwww.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <span className="text-gray-600 capitalize">Email Support</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Features;
