const sleepNow = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const getDateReprestation = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  strRepresent = dd + "-" + mm + "-" + yyyy;
  return strRepresent;
};

const getDates = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = [getDateReprestation(today), getDateReprestation(tomorrow)];
  return date;
};

module.exports = { getDates, getDateReprestation, sleepNow };
