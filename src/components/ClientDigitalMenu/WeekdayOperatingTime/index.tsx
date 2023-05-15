import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { useContext } from 'react';
import { BsX } from 'react-icons/bs';

export function WeekdayOperatingTime() {
  const { restaurant, modals } = useContext(DigitalMenuContext);

  const handleClose = () => {
    modals?.set(prev => {
      return {
        ...prev,
        operatingTime: false,
      };
    });
  };

  if (!restaurant) {
    return <></>;
  }
  // Crie uma lista com todos os dias da semana
  const daysOfWeek = [
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
    'Domingo',
  ];

  // Preencha os arrays associados a cada dia da semana com os registros correspondentes

  return (
    <div className="fixed z-[5000] top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div
        className="absolute w-full h-screen bg-[#000000] opacity-80 overflow-x-hidden cursor-pointer"
        onClick={handleClose}
      />
      <div className="absolute bg-[#fefefe] w-[95%] max-w-[700px] min-h-[600px] rounded-lg shadow-lg">
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
            <table className="w-full table-auto">
              <thead>
                <tr className="child:font-bold child:text-[#525252] ">
                  <td>Dia</td>
                  <td className="text-center">Horario</td>
                  {/* <td>Fechamento</td> */}
                </tr>
              </thead>
              <tbody className="child:child:font-light child:child:text-2xl child:child:h-12">
                {daysOfWeek.map((day, index) => {
                  // Encontre todos os horários de funcionamento para esse dia da semana
                  const operatingTimes =
                    restaurant.weekday_operating_time.filter(
                      weekday => weekday.weekdays.name === day
                    );

                  if (operatingTimes.length === 0) {
                    // Se não houver horários de funcionamento para esse dia, renderize "Fechado"
                    return (
                      <tr key={index}>
                        <td>{day}</td>
                        <td className="text-red-400 text-center">Fechado</td>
                      </tr>
                    );
                  } else {
                    // Se houver horários de funcionamento para esse dia, renderize-os de acordo com as regras
                    const activeTimes = operatingTimes.filter(
                      weekday => weekday.is_active
                    );

                    if (activeTimes.length === 0) {
                      // Se todos os horários de funcionamento para esse dia estiverem inativos, renderize "Fechado"
                      return (
                        <tr key={index}>
                          <td>{day}</td>
                          <td className="text-red-400 text-center">Fechado</td>
                        </tr>
                      );
                    } else {
                      // Se houver horários de funcionamento ativos para esse dia, renderize-os
                      return activeTimes.map((weekday, subIndex) => (
                        <tr key={`${index}-${subIndex}`}>
                          <td>{day}</td>
                          <td className="text-green-500 text-center">
                            {weekday.opening_time?.slice(0, 5)}h -&nbsp;
                            {weekday.closing_time?.slice(0, 5)}h
                          </td>
                        </tr>
                      ));
                    }
                  }
                })}
                {/* {restaurant.weekday_operating_time
                  .sort((a, b) => a.weekday_id - b.weekday_id)
                  .map((weekday, index) => {
                    if (weekday.is_active === false) {
                      return
                      (
                        <tr key={index} className="child:">
                          <td>{weekday.weekdays.name}</td>
                          <td colSpan={2} className="text-red-400 text-center">
                            Fechado
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={index}>
                          <td>{weekday.weekdays.name}</td>
                          <td className="text-green-500 text-center">
                            {weekday.opening_time?.slice(0, 5)}h -&nbsp;
                            {weekday.closing_time?.slice(0, 5)}h
                          </td>
                        </tr>
                      );
                    }
                  })} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <td className="text-green-500">
                                {weekday.closing_time?.slice(
                                    0,
                                    5
                                )}
                                h
                            </td> */
}
