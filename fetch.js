const { default: axios } = require("axios");
const { checkingDuration, pincodes } = require("./config");
const { getDates, sleepNow } = require("./utils");
const player = require("play-sound")((opts = {}));

const fetchByPincode = async () => {
  const dates = getDates();
  for (let i = 0; i < pincodes.length; i++) {
    for (let j = 0; j < dates.length; j++) {
      if (process.argv.every((el) => el !== "hide-output")) {
        console.log(
          `Trying for ${pincodes[i]} pincode and for ${dates[j]} date`
        );
      }
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
                if (process.argv.every((el) => el !== "mute-sound")) {
                  player.play("./beep.mp3");
                }
              }
            }
          }
        })
        .catch((err) => console.log(err.response));
    }
  }
};

const fetchIteratively = async () => {
  while (true) {
    fetchByPincode();
    await sleepNow(checkingDuration * 1000);
  }
};

module.exports = { fetchIteratively };
