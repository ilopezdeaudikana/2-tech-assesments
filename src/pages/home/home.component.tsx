import { Fragment, useEffect, useState } from 'react';
import { getPartners } from '../../api.service';
import {
  groupPartnersBy,
  getConsecutiveDates,
  calculatePeople,
  calculateDates,
} from '../../process.service';
import { Countries, DatesAndPeople } from '../../models';
import styled from 'styled-components';

export const Paragraph = styled.p`
  text-align: left;
`;

export const HomePage = () => {
  const [data, setData] = useState({
    countries: [],
  });

  useEffect(() => {
    getPartners()
      .then((items) => {
        const submitBody: { countries: Countries[] } = {
          countries: [],
        };
        const groupedItems: { [key: string]: DatesAndPeople } = groupPartnersBy(
          items.partners,
          'country'
        );
        Object.keys(groupedItems).forEach((key) => {
          getConsecutiveDates(groupedItems[key]);
          calculatePeople(groupedItems[key]);
          calculateDates(groupedItems[key]);
        });

        Object.keys(groupedItems).forEach((key) => {
          submitBody.countries.push({
            name: key,
            attendeeCount: groupedItems[key].attendees.length,
            attendees: groupedItems[key].attendees,
            startDate: groupedItems[key].startDate,
          });
        });
        setData(submitBody as any);
      })
      .catch((err) => {
        /* perform error handling if desired */
      });
  }, []);

  return (
    <Fragment>
      <ul data-testid='countries'>
        {data.countries.map((country: Countries) => (
          country.attendeeCount > 0 && <div key={country.name}>
            <Paragraph>
              Country: {country.name} | Total: {country.attendeeCount} | When:{' '}
              {country.startDate}
            </Paragraph>
            <Paragraph>Attendees</Paragraph>
            <ul>
              {country.attendees.map((attendee: string, i: number) => (
                <li key={i}>{attendee}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </Fragment>
  );
};
