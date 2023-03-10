const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// const flowPromo = addKeyword('🤩 Quiero una promo');

// Falta probar que todo esto funcione completamente, falta agregar la ubiacacion BUSCAR COMO HACERLE!

const flowBurgers = addKeyword('🍔 Ver menu burgers').addAnswer({delay: 1500},'Te paso nuestro menu de Burgers 👇',{delay: 1500}, {media: 'https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/FJKXKQKMMJBV7KQ7XQ3YNFO7LU.jpg'}, {delay: 1500},'Escribe *Regresar* para volver al menu principal! ✌', null, null, [flowPrincipal]);

const flowBrunch =  addKeyword('🍳 Ver menu brunch').addAnswer({delay: 1500},'Te paso nuestro menu de Brunch 👇',{delay: 1500}, {media: 'https://www.comedera.com/wp-content/uploads/2022/12/Desayono-americano-shutterstock_2120331371.jpg'}, {delay: 1500},'Escribe *Regresar* para volver al menu principal! ✌', null, null, [flowPrincipal]);

const flowReserva = addKeyword('😎 Reserva').addAnswer({delay: 1500},['Te paso nuestro pagina para que hagas tu reservacion 👇', 'https://www.google.com/'], {delay: 1500},'Escribe *Regresar* para volver al menu principal! ✌', null, null, [flowPrincipal]);

const flowUbi = addKeyword('📍 Ubicacion').addAnswer({delay: 1500},['Te paso nuestra ubicacion 👇', 'https://www.google.com.mx/maps/@51.4237689,-0.0097631,10z'], {delay: 1500},'Escribe *Regresar* para volver al menu principal! ✌', null, null, [flowPrincipal]);


const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'Regresar'])
    .addAnswer('Hola! Bienvenido yo soy xBot, ¿que puedo hacer hoy por ti?',
    {buttons: [
        {
            body: '🤩 Quiero una promo'
        },
        {
            body: '🍔 Ver menu burgers'
        },
        {
            body: '🍳 Ver menu brunch'
        },
        {
            body: '😎 Reserva'
        },
        {
            body: '📍 Ubicacion'
        }
    ]}, null, null, [flowBurgers, flowBrunch, flowReserva, flowUbi])


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
