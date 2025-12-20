const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Formats a published date string into a short, readable format.
 *
 * @param dateString - Date string in the format "DD/MM/YYYY HH:mm:ss"
 * @returns A formatted date string in the form "Mon DD, YYYY" (e.g. "Dec 25, 2022").
 *
 * If the input does not match the expected format, an empty string is returned.
 */
export function formatPublishedDate(dateString: string): string {
  const [datePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);

  if (!day || !month || !year) {
    return '';
  }

  const monthLabel = MONTHS[month - 1];

  return `${monthLabel} ${day}, ${year}`;
}
