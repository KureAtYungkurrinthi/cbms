export class FormatUtil {
  static formatTime(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Australia/Sydney'
    };
    return date.toLocaleTimeString('en-US', options);
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  }

  static formatDate2(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  }

  static createTimeStamp(date:string, time: string): string {
    const currentDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);  // Splits the time string into hours and minutes and converts them to numbers

    // Set the hours and minutes to the current date object
    currentDate.setHours(hours, minutes, 0, 0);

    // Convert the date object to an ISO string and slice to remove seconds and timezone info
    const isoDate = currentDate.toISOString();
    return isoDate.slice(0, 19);
  }
}
