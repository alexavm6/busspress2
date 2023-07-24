const app = require('../src/server');
const request = require('supertest');

//pone en escucha al servidor en el puerto seleccionado
app.listen(4000, () => {
    console.log('Server on port 4000');
})

describe('INICIAR SESIÓN: POST /user/login', () => {
    test('Debe responder con el código 302', async () => {
        const response = await request(app).post('/user/login').send({
            user: "U20303074",
            password: "75999999"
        });
        expect(response.statusCode).toBe(302);
    })
});

describe('DASHBOARD: GET /dashboard', () => {
    test('Debe responder con el código 302', async () => {
        const response = await request(app).get('/dashboard').send({
            user: {
                institution_id: "64a2984c34b1492e3c96aff3",
                _id: "64b5bcd249fbbd28ac2ac8c7"
            }
        });
        expect(response.statusCode).toBe(302);
    })
});

describe('DASHBOARD ESTADISTICAS: GET /dashboard/statistics', () => {
    test('Debe responder con el código 302', async () => {
        const response = await request(app).get('/dashboard/statistics').send();
        expect(response.statusCode).toBe(302);
    })
});

describe('GENERADOR DE RUTAS: GET /dashboard/routes', () => {
    test('Debe responder con el código 302', async () => {
        const response = await request(app).get('/dashboard/routes').send({
            user: {
                _id: "64b5bcd249fbbd28ac2ac8c7"
            }
        });
        expect(response.statusCode).toBe(302);
    })
});

describe('VALORACION: POST /assessment/driver/:id', () => {
    test('Debe responder con el código 302', async () => {
        const response = await request(app).post('/assessment/driver/64a2984f34b1492e3c96b007').send({
            amount: 0
        });
        expect(response.statusCode).toBe(302);
    })
});

describe('METODO DE PAGO: GET /', () => {
    test('Debe responder con el código 200', async () => {
        const response = await request(app).get('/').send();
        expect(response.statusCode).toBe(200);
    })
});