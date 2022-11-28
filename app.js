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


app.post("/", function(req, res) {
  const   cityName  = req.body.cityName;
  const keyid  = "5dc2c575994451fbf80dc02def4105fe";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + keyid+ "&units=metric";



  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<html>");
      res.write("<body>");
      res.write("<h3>The weather is currently " + description + "</h3>");
      res.write("<h1>The temprature in " +   cityName  + " is " + temp + " degress celcius.</h1>");
      res.write("<img src =" + imgUrl + ">");
      res.write("</body>");
      res.write("</html>");
      res.end();
      res.send();
    })

  })

})

app.listen(3000, function(req, res) {
  console.log("you have entered ");
});
