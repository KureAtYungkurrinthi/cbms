export class FormatUtil {
  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Australia/Sydney'
    };
    return date.toLocaleTimeString('en-US', options);
  }
}
