import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { DateObject } from 'react-multi-date-picker';

export const persianToGregorianDate = (param: string, format: string) => {
  const date = new DateObject({ calendar: persian, date: param });
  date.convert(gregorian, gregorian_en);
  return date.format(format);
};
export const gregorianToPersianDate = (param: string) => {
  const date = new Date(Date.parse(param)); // Parse the date string explicitly
  console.log('Parsed date:', date); // Add this line for debugging
  return date.toLocaleDateString('fa-IR');
};

