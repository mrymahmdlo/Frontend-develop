import { format, parse } from 'date-fns';
import { faIR } from 'date-fns/locale';

export default function convertDateFormat(
  dateString: string,
  inputFormat: string,
  outputFormat: string
) {
  const parsedDate = parse(dateString, inputFormat, new Date(), {
    locale: faIR
  });
  const formattedDate = format(parsedDate, outputFormat);
  return formattedDate;
}
