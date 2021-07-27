export interface Partners {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  availableDates: string[];
}

export interface Countries {
  attendeeCount: number;
  attendees: string[];
  name: string;
  startDate: string;
}

export interface PairedDates {
  day1: string;
  day2: string;
  counter: number;
  people: string[];
}

export interface DatesAndPeople {
  availableDates: string[][];
  dates: PairedDates[];
  partners: Partners[];
  attendees: string[];
  startDate: string;
}
