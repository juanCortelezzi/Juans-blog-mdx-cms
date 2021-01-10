export const parseDate = (Odate: Date): string => {
  const [month, date, year] = new Date(Odate).toLocaleDateString("en-US").split("/");
  return `${date}-${month}-${year}`;
};
