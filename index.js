var five = require("johnny-five");
var board = new five.Board();
var axios = require('axios');


board.on("ready", function() {
    var pinSignal = new five.Sensor("A0"); // pin conectado al sensor de sonido del módulo pin O
    var led1 = new five.Led(13);
    var num_Mediciones = 124; // Establecer el número de mediciones 
    var Sound_signal; // Almacena el valor leído Sensor de sonido   
    var sum = 0; // Almacena el valor total de n mediciones   
    var nivelSonido = 0; // Almacenar el valor promedio  
    var sonidoBajo = 40;
    var sonidoMedio = 500;
    var contador = 0;
    pinSignal.on("data", () => {
        for (var i = 0; i < num_Mediciones; i++) {
            Sound_signal = pinSignal.value;
            sum = sum + Sound_signal;
        }
        nivelSonido = sum / num_Mediciones; // Calcular el valor promedio
        console.log('Nivel sonido: ', (nivelSonido - 33));
        if ((nivelSonido - 33) < sonidoBajo) {
            contador = contador + 1;
            console.log('Intensidad Baja');
            console.log('Contador: ', contador);
            led1.off();
        } else if ((nivelSonido - 33) > sonidoBajo && (nivelSonido - 33) < sonidoMedio) {
            console.log('Intensidad Media');
            contador = 0;
            led1.off();
        } else if ((nivelSonido - 33) > sonidoMedio) {
            console.log('Intensidad Alta');
            contador = 0;
            led1.on();
        }
        if (contador >= 2160) {
            console.log('FIESTA');
            axios.post('http://localhost:3000/datos', {
                    "usuario": "efradxxd",
                    "password": "1234567890"
                })
                .then((res) => {
                    console.log(`statusCode: ${res.statusCode}`)
                    console.log(res)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        sum = 0;
    });
});