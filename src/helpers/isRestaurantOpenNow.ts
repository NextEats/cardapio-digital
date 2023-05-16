import { addDays, isBefore, isWithinInterval, parse } from 'date-fns';
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

  return operatingTimes.some(({ opening_time, closing_time, weekdays }) => {
    if (opening_time === null || closing_time === null) {
      return false;
    }

    // Parse opening and closing times to Date objects
    const openingTime = parse(opening_time, 'HH:mm:ss', new Date());
    let closingTime = parse(closing_time, 'HH:mm:ss', new Date());

    // If closing time is before opening time, it means the restaurant closes after midnight.
    // Therefore, add 1 day to closing time to handle this case.
    if (isBefore(closingTime, openingTime)) {
      closingTime = addDays(closingTime, 1);
    }

    // Check if the current time is within the interval
    const isOpen = isWithinInterval(now, {
      start: openingTime,
      end: closingTime,
    });

    return (
      weekdays.name.split('-')[0].toLocaleLowerCase() === currentWeekDayName &&
      isOpen
    );
  });
}
