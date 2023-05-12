import { iWeekdayOperatingTimeWithFKData } from '../types/iWeekday';

function getDayName(weekDayIndex: number) {
  const days = [
    null,
    'domingo',
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sábado',
  ];
  return days[weekDayIndex];
}

export function isRestaurantOpenNow({
  operatingTimes,
}: {
  operatingTimes: iWeekdayOperatingTimeWithFKData[];
}) {
  const now = new Date();
  const currentWeekDayIndex = now.getDay() + 1;
  const adjustedWeekDayIndex =
    currentWeekDayIndex === 0 ? 7 : currentWeekDayIndex;
  const currentWeekDayName = getDayName(adjustedWeekDayIndex);
  const currentTime = now.toTimeString().slice(0, 8);

  return operatingTimes.some(({ opening_time, closing_time, weekdays }) => {
    return (
      opening_time !== null &&
      closing_time !== null &&
      weekdays.name.split('-')[0].toLocaleLowerCase() === currentWeekDayName &&
      currentTime >= opening_time &&
      currentTime <= closing_time
    );
  });
}
