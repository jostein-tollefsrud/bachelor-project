const convertToLocaleDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};

const convertToLocaleTime = (time) => {
  const newTime = new Date('2000-01-01T' + time);
  const localeTimeString = newTime.toLocaleTimeString();
  return localeTimeString.slice(0, -3);
};

export { convertToLocaleDate, convertToLocaleTime };
