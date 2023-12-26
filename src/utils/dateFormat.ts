import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { DateObject } from 'react-multi-date-picker';

export default function convertDateFormat(param: string, format: string) {
  const date = new DateObject({ calendar: persian, date: param });
  date.convert(gregorian, gregorian_en);
  return date.format(format);
}
