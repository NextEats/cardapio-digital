import React, { useContext, useCallback } from "react";
import { BsX } from "react-icons/bs";
import { RestaurantContext } from "../../contexts/restaurantContext";

export function WeekdayOperatingTime({ close }: { close: Function }) {
  const [restaurant, setRestaurant] = useContext(RestaurantContext).restaurant;

  const handleClose = () => {
    close();
  };

  if (!restaurant) {
    return <></>;
  }

  return (
    <div className="fixed z-[5000] top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div
        className="absolute w-full h-screen bg-[#000000] opacity-80 overflow-x-hidden cursor-pointer"
        onClick={handleClose}
      />
      <div className="absolute bg-[#fefefe] w-[95%] max-w-[500px] min-h-[600px] rounded-lg shadow-lg">
        <BsX
          className="my-8 cursor-pointer absolute right-7"
          size={30}
          onClick={handleClose}
        />
        <div className="flex flex-col justify-center items-center pt-12">
          <span className="block text-2xl font-semibold text-[#3e3e3e]">
            Horário de Abertura
          </span>
          <span className="font-light text-lg">{restaurant.name}</span>
          <hr className="mt-6 my-2 w-full h-[2px] bg-[#d9d9d9]" />
          <div className="w-[90%] mt-6">
            <table className="w-full">
              <thead>
                <tr className="child:font-bold child:text-[#525252] ">
                  <td>Dia</td>
                  <td>Abertura</td>
                  <td>Fechamento</td>
                </tr>
              </thead>
              <tbody className="child:child:font-light child:child:text-2xl child:child:h-12">
                {restaurant.weekday_operating_time
                  .sort((a, b) => a.weekday_id - b.weekday_id)
                  .map((weekday, index) => {
                    if (weekday.is_active === false) {
                      return (
                        <tr key={index} className="child:">
                          <td>{weekday.weekdays.name}</td>
                          <td colSpan={2} className="text-red-400">
                            Fechado
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={index}>
                          <td>{weekday.weekdays.name}</td>
                          <td className="text-green-500">
                            {weekday.opening_time?.slice(0, 5)}h
                          </td>
                          <td className="text-green-500">
                            {weekday.closing_time?.slice(0, 5)}h
                          </td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
