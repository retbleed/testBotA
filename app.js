const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


let userEmail;
let userNumber;

const flowPromo = addKeyword(['Quiero una promo 🤩', '⬅️ Volver al Inicio']).
    addAnswer(['Hola!','Para enviar el formulario necesito unos datos...' ,'Escriba su *Nombre*'],
    { capture: true, buttons: [{ body: '❌ Cancelar solicitud' }] },
    async (ctx, { endFlow , fallBack}) => {
        if (ctx.body == '❌ Cancelar solicitud')
         return endFlow({body: '❌ Su solicitud ha sido cancelada ❌',    
             buttons:[{body:'⬅️ Volver al Inicio' }]
        })
        if (!ctx.body.includes('@')) return fallBack()
        userEmail = ctx.body})

const flowBurgers = addKeyword('Ver menu burgers 🍔').addAnswer('Te paso nuestro menu de Burgers 👇', {media: 'https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/FJKXKQKMMJBV7KQ7XQ3YNFO7LU.jpg'}, null)

const flowBrunch =  addKeyword('Ver menu brunch 🍳').addAnswer('Te paso nuestro menu de Brunch 👇', {media: 'https://www.comedera.com/wp-content/uploads/2022/12/Desayono-americano-shutterstock_2120331371.jpg'}, null)

const flowReserva = addKeyword('Reserva 😎').addAnswer(['Te paso nuestro pagina para que hagas tu reservacion 👇', 'https://www.google.com/'], null, null)

const flowUbi = addKeyword('Ubicacion 📍').addAnswer(['Te paso nuestra ubicacion 👇', 'https://www.google.com.mx/maps/@51.4237689,-0.0097631,10z'], null, null)

const flowSecundario = addKeyword('Iniciar').addAnswer('¿Que puedo hacer hoy por ti?', {buttons: [{body: 'Quiero una promo 🤩'},{body: 'Ver menu burgers 🍔'},{body: 'Ver menu brunch 🍳'},{body: 'Reserva 😎'},{body: 'Ubicacion 📍'}]}, null, [flowPromo, flowBurgers, flowBrunch, flowReserva, flowUbi])

const flowPrincipal = addKeyword(['Hola', 'ole']).addAnswer('Hola! Bienvenido yo soy xBot, escribe *Iniciar* para comenzar!', null, null,[flowSecundario])

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