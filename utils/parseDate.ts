import moment from "moment";
export const parseDate = (Odate: Date): string => {
  return moment(Odate).format("DD-MM-YYYY").toString();
};

export const parseDateFromNow = (Odate: Date): string => {
  return moment(Odate).fromNow().toString();
};
