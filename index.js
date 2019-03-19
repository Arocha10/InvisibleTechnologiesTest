const request = require('request');

let apiKey = 'c2b8f6b55d3824a13920f02def813dbf';
let city = 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function (err, response, body) {
    let res = JSON.parse(body);
  if(err || res.cod=="404" ){
    console.log('error:\n ', res.message);
  } else {
        let weather = res;
        let zipCode = 35951;
        let apikeyZipcode = '6e268c70d0424bb29a0150447191903'; 
        url = `http://api.worldweatheronline.com/premium/v1/tz.ashx?key=${apikeyZipcode}&q=${zipCode}&format=json`
        request(url, function (err, response, body) {
            res = JSON.parse(body);
            if(err || res.data.error){
              console.log('error:\n', res.data.error[0].msg);
            } else {
                let timezone = JSON.parse(body).data.time_zone[0];
                let zone = timezone.zone.split("/")[1];
                let currentTime = timezone.localtime.split(" ")[1];
                let currentDate= timezone.localtime.split(" ")[0];
                let message = ` We are today, ${currentDate} in the closeness of zone ${zone} at ${currentTime} \n We have a temperature of ${weather.main.temp} degrees in ${weather.name} city!`;
                console.log(message);
            }
          });
  }
});