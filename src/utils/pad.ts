// Format number into two digit. (e.g. 2 to 02)
export default function pad(value: number) {
  return String('0' + value).slice(-2);
}
