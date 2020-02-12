var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    var mic = new five.Sensor("A0");
    var led1 = new five.Led(13);

    mic.on("data", function() {
        //led1.brightness(this.value >> 2);
        console.log(mic.value);
        led1.on();
    });
});