const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


let userEmail;
let userNumber;

const flowPromo = addKeyword(['Quiero una promo 🤩']).
    addAnswer(['Genial, para recibir tu promocion por favor escriba su *Correo!* 👇'],
    {capture: true},
    async (ctx, { flowDynamic, fallBack}) => {
        if (!ctx.body.includes('@')) return fallBack()
        userEmail = ctx.body
        console.log(userEmail)
        return flowDynamic(`Perfecto! 😎`)
    }).addAnswer('Escriba por favor su *numero de telefono*! 👇',
    {capture: true},
    async (ctx, {flowDynamic}) => {
        userNumber = ctx.body
        console.log(userNumber)
        return flowDynamic(`Unos pasos mas! 😎`)
    }).addAnswer('Escriba por favor su *numero de telefono*! 👇',
    null,
    async (ctx, {provider}) => {
        const id = ctx.key.remoteJid
    const buttons = [
        {buttonId: 'id1', buttonText: {displayText: 'HOLA ESTE ES UN BOTON'}, type: 1},
        {buttonId: 'id2', buttonText: {displayText: 'HOLA ESTE ES OTRO BOTON'}, type: 1}
      ]
      const buttonMessage = {
        text: "*Selecciona el botón del servicio que requiere:*",
        footer: 'ESTO ES UNA MARCA DE AGUA',
        buttons: buttons,
        headerType: 1
      }
      const a = await provider.sendRaw()(id, buttonMessage)
      console.log('->',provider.sendRaw)
      return a
    })  


const flowBurgers = addKeyword('Ver menu burgers 🍔').addAnswer('Te paso nuestro menu de Burgers 👇', {media: 'https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/FJKXKQKMMJBV7KQ7XQ3YNFO7LU.jpg'}, null)

const flowBrunch =  addKeyword('Ver menu brunch 🍳').addAnswer('Te paso nuestro menu de Brunch 👇', {media: 'https://www.comedera.com/wp-content/uploads/2022/12/Desayono-americano-shutterstock_2120331371.jpg'}, null)

const flowReserva = addKeyword('Reserva 😎').addAnswer(['Te paso nuestro pagina para que hagas tu reservacion 👇', 'https://www.google.com/'], null)

const flowUbi = addKeyword('Ubicacion 📍').addAnswer(['Te paso nuestra ubicacion 👇', 'https://www.google.com.mx/maps/@51.4237689,-0.0097631,10z'], null)

const flowPrincipal = addKeyword(['Hola', 'ole', 'alo', 'que onda']).addAnswer(['Hola! Bienvenido yo soy todoPoderosoBot!', '¿Que puedo hacer hoy por ti?'], {buttons: [{body: 'Quiero una promo 🤩'},{body: 'Ver menu burgers 🍔'},{body: 'Ver menu brunch 🍳'},{body: 'Reserva 😎'},{body: 'Ubicacion 📍'}]}, null, [flowPromo, flowBurgers, flowBrunch, flowReserva, flowUbi])

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