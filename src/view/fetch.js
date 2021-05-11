import axios from "axios";
import { changeResult } from "../redux/reducer/result";
import { store } from "../redux/store";

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
  const strRepresent = dd + "-" + mm + "-" + yyyy;
  return strRepresent;
};

const getDates = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = [getDateReprestation(tomorrow)];
  return date;
};

const fetchByPincode = async () => {
  const dates = getDates();
  const result = store.getState().result.result;
  const pincodes = store.getState().pincodes.pincodes.filter((pincode) => {
    return (
      result[pincode].status === "finding" || result[pincode].status === "error"
    );
  });
  for (const pincode of pincodes) {
    for (let j = 0; j < dates.length; j++) {
      let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${dates[j]}`;
      axios
        .get(url)
        .then((res) => {
          let data = res.data;
          let centers = [];
          let availability = 0;
          let resultFound = false;
          for (const c in data.centers) {
            for (const s in data.centers[c].sessions) {
              if (data.centers[c].sessions[s].available_capacity > 0) {
                resultFound = true;
                availability += data.centers[c].sessions[s].available_capacity;
                centers.push(data.centers[c].name);
              }
            }
          }
          if (resultFound === false) {
            store.dispatch(
              changeResult({
                pincode,
                result: {
                  status: "finding",
                  availability: 0,
                  centers: [],
                },
              })
            );
          } else {
            store.dispatch(
              changeResult({
                pincode,
                result: {
                  status: "found",
                  availability,
                  centers,
                },
              })
            );
          }
        })
        .catch((err) => {
          store.dispatch(
            changeResult({
              pincode,
              result: {
                status: "error",
                availability: 0,
                centers: [],
              },
            })
          );
        });
    }
  }
};

const fetchIteratively = async () => {
  while (true) {
    fetchByPincode();
    const timeToSleep = store.getState().pincodes.pincodes.length * 5;
    await sleepNow(timeToSleep * 1000);
  }
};

export { fetchIteratively };
