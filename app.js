const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post("/", function (req, res) {
  const cityName = req.body.cityName;
  const keyid = "5dc2c575994451fbf80dc02def4105fe";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    keyid +
    "&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      const weatherObject = {
        cityName: cityName,
        temp: temp,
        description: description,
        icon: icon,
      };

      // Inline HTML and CSS
      res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Weather App</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: Arial, sans-serif;
          background-color: #84e4e1;
          color: #333;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        h1 {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-align: center;
          text-transform: capitalize;
        }

        h2 {
          font-size: 2rem;
          font-weight: normal;
          margin-bottom: 1rem;
          text-align: center;
          text-transform: capitalize;
        }

        .weather-icon {
          display: block;
          margin: 2rem auto;
          width: 150px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Weather App</h1>
        <h2>The weather is currently ${description}</h2>
        <img class="weather-icon" src="${imgUrl}" alt="Weather icon">
        <h2>The temperature in ${cityName} is ${temp} degrees Celsius.</h2>
      </div>
    </body>
  </html>
`);
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
