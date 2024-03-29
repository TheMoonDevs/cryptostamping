import { useState, useEffect, useRef, MutableRefObject } from "react";
import { fromWei } from "web3-utils";
import { DATE_START } from "lib/data";

export const refreshTokenSetup = (res) => {
  // Timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log("newAuthRes:", newAuthRes);
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    localStorage.setItem("authToken", newAuthRes.id_token);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};

export const generateUID = () => {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart: string|number = (Math.random() * 46656) | 0;
  var secondPart: string|number = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

export const getCurrentStampDay = () => {
  const date = new Date(DATE_START).setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);
  const days: string = (now - date) / (1000 * 3600 * 24) + "";
  return parseInt(days) + 1;
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const useImageFade = () => {
  const [style, setStyle] = useState({
    opacity: 0,
    transition: "opacity 0.33s ease",
  });
  return {
    style,
    onLoad: (evt) => {
      console.log(evt);
      setStyle({ opacity: 1, transition: "opacity 0.33s ease" });
    },
    complete: () => {
      console.log("complete");
    },
  };
};

export const useNextImageImageFade = (_className) => {
  const [className, setClassName] = useState(`${_className} opacity-0`);
  return {
    className,
    onLoad: (target) => {
      //if (target.src.indexOf("data:image/gif;base64") < 0) {
      setClassName(`${_className} opacity-1`);
      //}
    },
  };
};

export const useTimer = (dateString) => {
  const [timer, setTimer] = useState({});
  let prevInterval: MutableRefObject<NodeJS.Timer> = useRef();
  const launchDate = new Date(dateString);
  const launchDateUTC = Date.UTC(
    launchDate.getUTCFullYear(),
    launchDate.getUTCMonth(),
    launchDate.getUTCDate(),
    0,
    0,
    0
  );

  useEffect(() => {
    function updateTimer() {
      const nowDate = new Date();
      var duration =
        launchDateUTC -
        Date.UTC(
          nowDate.getUTCFullYear(),
          nowDate.getUTCMonth(),
          nowDate.getUTCDate(),
          nowDate.getUTCHours(),
          nowDate.getUTCMinutes(),
          nowDate.getUTCSeconds()
        );
      const seconds = Math.floor((duration / 1000) % 60);
      const minutes = Math.floor((duration / (1000 * 60)) % 60);
      let hours = Math.floor(duration / (1000 * 60 * 60));
      if (hours > 24) hours = hours % 24;
      const days = Math.floor(duration / (1000 * 60 * 60 * 24));
      setTimer({
        days: days > 9 ? "" + days : "0" + days,
        hours: hours > 9 ? "" + hours : "0" + hours,
        minutes: minutes > 9 ? "" + minutes : "0" + minutes,
        seconds: seconds > 9 ? "" + seconds : "0" + seconds,
      });
    }
    if (prevInterval.current) {
      clearInterval(prevInterval.current);
    }
    updateTimer();
    prevInterval.current = setInterval(updateTimer, 1000);
  }, [dateString, launchDateUTC]);

  return {
    timer,
  };
};

export const getCutOutReleaseDate = (number) => {
  const date = new Date(DATE_START).setHours(0, 0, 0, 0);
  const newDate = new Date(date + (number - 1) * 24 * 60 * 60 * 1000);
  const d = newDate.getDate();
  return (
    monthNames[newDate.getMonth()] +
    "  .  " +
    (d > 9 ? d : "0" + d) +
    "  .  " +
    newDate.getFullYear()
  );
};

export const getCutOutAvailability = (availability) => {
  if (availability == "reserved") {
    return "Reserved.";
  } else if (availability == "locked") {
    return "Locked.";
  } else if (availability == "sold") {
    return "Sold Out.";
  }
  return "Available";
};

export const getCutOutAvailStock = (availability) => {
  if (availability == "reserved") {
    return "Sold Out.";
  } else if (availability == "locked") {
    return "Join Whitelist.";
  } else if (availability == "presale") {
    return "Join Whitelist.";
  } else if (availability == "sold") {
    return "Sold Out.";
  }
  return "Buy Now.";
};

export const getCutOutDescription = (availability, cutout_no) => {
  if (cutout_no === 1) {
    return `The Spartan stamp is reserved for Team-Cutouts, 
    it belongs to the dare-devils who made the first call and 
    will be stamped on the first 100 investor's websites. 
    The brave red blood will only belong to 
    those who will take the dive.`;
  }
  if (availability === "locked") {
    if (isPrime(cutout_no)) {
      return `All Prime No. Editions that are not sold 
      in the first 24hrs of it's pre-sale period 
      will be Auction-Locked and will only be available 
      for the Live Public Auction.`;
    }
    return `To reward early adopters who can find truly amazing 
    projects before anyone, 
    This Cut Out will be available for direct sale 
    at floor price for whitelist holders`;
  }
  if (availability === "presale") {
    return `Available for direct sale 
    at floor price for whitelist holders. 
    The oppurtunity will only be given to those
    who were prepared and could seize it.
    Join the Whitelist Now.`;
  }
  return null;
};

export const printCutOutNumber = (number) => {
  if (number < 10) return "00" + number;
  if (number < 100) return "0" + number;
  return number;
};

export const getCutOutLinkStyle = (theme_color) => {
  return {
    color: theme_color,
    "text-decoration": "1px underline " + theme_color,
  };
};

export const isPrime = (num) => {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
};

export const getVideoDisplayLink = (num) => {
  if (num <= 9) return `/videos/00${num}.mp4`;
  if (num <= 99) return `/videos/0${num}.mp4`;
  return `/videos/${num}.mp4`;
};

export function prettyPrintDate(date_string?: string, must?: boolean) {
  if (!date_string) return "";
  const dt = new Date(date_string);
  if (!dt) return "";
  const seconds = Math.floor(((new Date()).getUTCMilliseconds() - dt.getUTCMilliseconds()) / 1000);
  let interval = seconds / 86400;
  // if more than a week ago print date
  if (interval > 7 || must || seconds < 0) {
    const printedDates = dt.toDateString().split(" ");
    if (printedDates.length > 3)
      return `${printedDates[1]} ${printedDates[2]}, ${printedDates[3]}`;
    return `${printedDates[0]} ${printedDates[1]}, ${printedDates[2]}`;
  }
  if (interval > 1) {
    const days = Math.floor(interval);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const hourse = Math.floor(interval);
    return `${hourse} hour${hourse > 1 ? "s" : ""} ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

export const prettyPrintEth = (wei) => {
  return wei;
};

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const toHex = (num) => {
  return "0x" + num.toString(16);
};

export const fromHex = (hexString) => {
  return parseInt(hexString, 16);
};

export const getWithCommas = (value) => {
  if (value <= 0) return "...";
  return value
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const printAddress = (_add) => {
  if (!_add) return "0x000";
  return (
    _add?.substr(0, 6).toUpperCase() +
    "..." +
    _add?.substr(_add.length - 4).toUpperCase()
  );
};

export const printBalance = (_bal) => {
  if (!_bal) return "0";
  return parseFloat(_bal).toFixed(3)?.toString()?.substring(0, 11);
};

export const getRandPrice = (_index) => {
  if (_index === 0) return "0.000";
  if (_index >= 0) return _index / 1000;
  return Math.floor(Math.random() * 999 + 1) / 1000;
};

export const printPrice = (_moralis, _price) => {
  return parseFloat(fromWei(_price.toString()))?.toFixed(3).toString();
};
