const url = `https://www.metaweather.com/api/location/search/?query=`;
const urlLocat = `https://www.metaweather.com/api/location/`;
const fecha = new Date();
let day = fecha.getDate();
let month = fecha.getMonth() + 1;
let year = fecha.getFullYear();
let date = `/${year}/${month}/${day}`;

let icono = document.querySelector(".iconPng");
let res = document.querySelector(".result");
let temp = document.querySelector(".temperatura");
let back_img = document.querySelector("#container");

// date managment done

// getting data from api

const getCity = async () => {
  let ciudad = document.getElementById("cityRequest").value;
  ciudad = ciudad.toLowerCase();
  let myClass = back_img.className;
  try {
    let id = await fetch(`${url}${ciudad}`);
    id = await id.json();
    id = id[0].woeid;
    let data = await fetch(`${urlLocat}${id}${date}`);
    data = await data.json();
    console.log("getCity", data[0]);
    res.innerHTML = data[0].weather_state_name;
    let temperatura = Math.floor(data[0].the_temp);
    temp.innerHTML = `: ${temperatura}ºC`;
    let ico = data[0].weather_state_abbr;

    icono.src = `https://www.metaweather.com/static/img/weather/${ico}.svg`;

    back_img.classList.remove(myClass);
    if (ico === "sn") {
      back_img.classList.add("snow");
    }
    if (ico === "h") {
      back_img.classList.add("hail");
    }
    if (ico === "t") {
      back_img.classList.add("storm");
    }
    if (ico === "hr") {
      back_img.classList.add("rain");
    }
    if (ico === "lr") {
      back_img.classList.add("rain");
    }
    if (ico === "hc") {
      back_img.classList.add("heavy_clouds");
    }
    if (ico === "lc") {
      back_img.classList.add("light_clouds");
    }
    if (ico === "c") {
      back_img.classList.add("sunny");
    }
  } catch (error) {
    console.log("error");
    back_img.classList.remove(myClass);
    back_img.classList.add("start_back");
    res.innerHTML = "Please try again";
    temp.innerHTML = "";
  }
};

// const successCallback = async (position) => {
//   lat = position.coords.latitude;
//   long = position.coords.longitude;
//   lat = lat.toString();
//   lat = lat.slice(0, 5);
//   long = long.toString();
//   long = long.slice(0, 5);
//   lattlong = `search/?lattlong=${lat},${long}`;
//   let res = await fetch(`${urlLocat}${lattlong}`);
//   res = await res.json();
//   let id = res[0].woeid;
//   try {
//     let data = await fetch(`${urlLocat}${id}${date}`);
//     data = await data.json();
//     res.innerHTML = data[0].weather_state_name;
//     temp.innerHTML = `: ${data[0].the_temp}ºC`;
//     let ico = data[0].weather_state_abbr;
//     icono.src = `https://www.metaweather.com/static/img/weather/${ico}.svg`;
//   } catch (error) {
//     console.log("error");
//     res.innerHTML = "Please try again";
//   }
// };
// const errorCallback = (error) => {
//   console.log(error);
// };
// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
