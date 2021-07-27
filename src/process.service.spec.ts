import { input } from './test-input';
import {
  groupPartnersBy,
  calculateDates,
  calculatePeople,
  getConsecutiveDates,
} from './process.service';
import { DatesAndPeople } from './models';

describe('ProcessService', () => {
  describe('groupPartnersBy', () => {
    it('it should group by country', () => {
      const testInput = groupPartnersBy([...input.partners], 'country');
      expect(Object.keys(testInput)).toEqual([
        'United States',
        'Ireland',
        'Spain',
      ]);
    });
  });

  describe('calculateDates', () => {
    it('it should return startDate and attendees', () => {
      const testInput = {
        dates: [
          {
            counter: 2,
            day1: '2017-04-30',
            day2: '2017-05-01',
            people: [
              'jgustison@acme.com',
              'sfilipponi@acme.com',
            ],
          },
          {
            counter: 2,
            day1: '2017-04-29',
            day2: '2017-04-30',
            people: [
              'jgustison@acme.com',
              'whatever@acme.com',
            ],
          },
        ],
        attendees: [],
        startDate: '',
      };
      const result = calculateDates(testInput as any);
      expect(result).toEqual({
        dates: testInput.dates,
        attendees: [
          'jgustison@acme.com',
          'whatever@acme.com',
        ],
        startDate: '2017-04-29',
      } as DatesAndPeople);
    });
  });

  describe('calculatePeople', () => {
    it('it should add people to dates', () => {
      const testInput = {
        dates: [
          {
            counter: 0,
            day1: '2017-04-30',
            day2: '2017-05-01',
            people: [],
          },
          {
            counter: 0,
            day1: '2017-04-29',
            day2: '2017-04-30',
            people: [],
          },
        ],
        attendees: [],
        startDate: '',
        partners: [
          {
            availableDates: ['2017-05-01', '2017-04-30'],
            country: 'Spain',
            email: 'jgustison@acme.com',
            firstName: 'Janyce',
            lastName: 'Gustison',
          },
        ],
      };
      const result = calculatePeople(testInput as any);
      expect(result.dates).toEqual([
        {
          counter: 1,
          day1: '2017-04-30',
          day2: '2017-05-01',
          people: ['jgustison@acme.com'],
        },
        { counter: 0, day1: '2017-04-29', day2: '2017-04-30', people: [] },
      ]);
    });
  });

  describe('getConsecutiveDates', () => {
    it('it should return a set of paired dates', () => {
      const testInput = {
        dates: [],
        availableDates: [
          ['2017-05-01', '2017-04-30'],
          ['2017-04-01', '2017-04-30'],
          ['2017-04-29', '2017-04-30'],
        ],
      };
      const result = getConsecutiveDates(testInput as any);
      expect(result.dates).toEqual([
        { counter: 0, day1: '2017-04-30', day2: '2017-05-01', people: [] },
        {
          counter: 0,
          day1: '2017-04-29',
          day2: '2017-04-30',
          people: [],
        },
      ]);
    });
  });
});
