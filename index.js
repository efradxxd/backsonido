var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
var axios = require('axios');


app.get('/datos', (req, res) => {

    res.json({
        'message': 'corriendo'
    });
});
//datos mandados por raspberry
app.post('/datos', (req, res) => {

    let horaFiesta = req.body.horaFiesta;
    let idArduino = req.body.idArduino;
    let phoneUser = "5535664206";

    axios.post('https://eu42.chat-api.com/instance98914/sendMessage?token=73bls3crf4iulrsk', {
            "phone": "521" + phoneUser,
            "body": "Hay fiesta " + horaFiesta
        })
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`);
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
    res.json({ 'status': 'datos recibidos con exito' });
});

app.get('/', (req, res) => {
    console.log('conectado');
});

app.listen(3000, () => {
    console.log('Escuchando por el puerto 3000');
});
