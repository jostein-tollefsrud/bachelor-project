import { getThreeLatestNews } from '../news';
import { getThreeLatestEvents } from '../events';
import { getEmployees } from '../employees';

export const latestNewsCards = async (dynamicZone, locale) => {
  let latestCards = false;
  let latestNews = false;
  dynamicZone.forEach((zone) => {
    if (zone.__component === 'blocks.latest-cards') latestCards = true;
    if (zone.TypeOfCards === 'LatestNews') latestNews = true;
  });
  if (!latestCards) return null;
  if (!latestNews) return null;
  return await getThreeLatestNews(locale);
};

export const latestEventsCards = async (dynamicZone, locale) => {
  let latestCards = false;
  let latestEvents = false;
  dynamicZone.forEach((zone) => {
    if (zone.__component === 'blocks.latest-cards') latestCards = true;
    if (zone.TypeOfCards === 'LatestEvents') latestEvents = true;
  });
  if (!latestCards) return null;
  if (!latestEvents) return null;
  return await getThreeLatestEvents(locale);
};

export const employeeList = async (dynamicZone, locale) => {
  let employeeList = false;

  dynamicZone.forEach((zone) => {
    if (zone.__component === 'blocks.staff-box') employeeList = true;
  });
  if (!employeeList) return null;

  return await getEmployees(locale);
};
