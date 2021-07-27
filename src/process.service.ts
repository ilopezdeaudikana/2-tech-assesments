import compareAsc from "date-fns/compareAsc";
import compareDesc from "date-fns/compareDesc";
import differenceInDays from "date-fns/differenceInDays";
import { Partners, PairedDates, DatesAndPeople } from "./models";

export const groupPartnersBy = (
  collection: Partners[],
  property: string
): { [key: string]: DatesAndPeople } => {
  const col = collection.reduce(
    (accumulator: { [key: string]: DatesAndPeople }, value: any) => {
      const key = value[property];
      if (!accumulator[key]) {
        accumulator[key] = {} as DatesAndPeople;
        accumulator[key].partners = [];
        accumulator[key].availableDates = [];
      }
      accumulator[key].partners.push(value);
      accumulator[key].availableDates.push(value.availableDates);
      return accumulator;
    },
    {} as { [key: string]: DatesAndPeople }
  );
  return col;
};

export const calculateDates = (collection: DatesAndPeople): DatesAndPeople => {
  const dates = collection.dates.map((a) => a.counter);
  const max = Math.max(...dates);
  const maxPeopleDates = collection.dates.filter((a) => a.counter === max);
  maxPeopleDates.sort((a, b) => compareAsc(new Date(a.day1), new Date(b.day1)));
  collection.startDate = maxPeopleDates.length ? maxPeopleDates[0].day1 : "";
  collection.attendees = maxPeopleDates.length ? maxPeopleDates[0].people : [];
  return collection;
};

export const calculatePeople = (collection: DatesAndPeople): DatesAndPeople => {
  if (collection.dates.length) {
    collection.partners.forEach((item) => {
      collection.dates.forEach((date) => {
        const { day1, day2 } = date;
        if (
          item.availableDates.includes(day1) &&
          item.availableDates.includes(day2)
        ) {
          date.counter++;
          date.people.push(item.email);
        }
      });
    });
  } else {
    collection.attendees = [];
  }

  return collection;
};

export const getConsecutiveDates = (
  collection: DatesAndPeople
): DatesAndPeople => {
  const paired: PairedDates[] = [];
  collection.availableDates.forEach((datesArray: string[]) => {
    datesArray.sort((a, b) => compareDesc(new Date(a), new Date(b)));
    for (let i = 0; i < datesArray.length; i++) {
      if (
        i > 0 &&
        differenceInDays(new Date(datesArray[i - 1]), new Date(datesArray[i])) >
          1
      ) {
      } else {
        if (i !== 0) {
          paired.push({
            day1: datesArray[i],
            day2: datesArray[i - 1],
            counter: 0,
            people: [],
          });
        }
      }
    }
    return datesArray;
  });
  collection.dates = Array.from(new Set(paired));
  return collection;
};
