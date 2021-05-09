const { default: axios } = require("axios");
const player = require("play-sound")((opts = {}));

const pincodes = ["335051"];
const checkingDuration = 5000;

const sleepNow = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const getDateReprest = (date) => {
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
  const date = [getDateReprest(today), getDateReprest(tomorrow)];
  return date;
};

const fetchByPincode = async () => {
  const dates = getDates();
  for (let i = 0; i < pincodes.length; i++) {
    for (let j = 0; j < dates.length; j++) {
      let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincodes[i]}&date=${dates[j]}`;
      axios
        .get(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0",
          },
        })
        .then((res) => {
          let data = res.data;
          for (c in data.centers) {
            for (s in data.centers[c].sessions) {
              if (data.centers[c].sessions[s].available_capacity > 0) {
                console.log(
                  "Try Booking for",
                  data.centers[c].pincode,
                  data.centers[c].name,
                  data.centers[c].sessions[s].available_capacity
                );
                player.play("./beep.mp3");
              }
            }
          }
        })
        .catch((err) => console.log(err.response));
    }
  }
  await sleepNow(5000);
  fetchByPincode();
};

module.exports = { fetchByPincode };
