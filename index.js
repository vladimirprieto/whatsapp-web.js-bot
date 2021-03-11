const csv         = require('csvtojson');
const qrcode      = require('qrcode-terminal');
const { Client }  = require('whatsapp-web.js');
const fs          = require('fs');



/*----------  CONFIG  ----------*/

const csvFilePath = 'numeros.csv';
const text        = new Date().toLocaleString() + "\n" +"msg de prueba";
const name_field  = "NAME"; //header on csv file
const phone_field = "PHONE"; //header on csv file

/*----------  CONFIG  ----------*/



const SESSION_FILE_PATH = './session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

//headless: false => opens chrome on web.whatsapp
const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

client.initialize();

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('\nQR RECEIVED');
    //generate QR code on screen for loggin
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', (session) => {
    // console.log('AUTHENTICATED', session);
    console.log('\n=====> AUTHENTICATED');
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('\nAUTHENTICATION FAILURE!!!!', msg);
});

client.on('ready', () => {
    console.log('\n\n');
    console.log('===============READY===============');
    console.log('\n\n');

    csv()
    .fromFile(csvFilePath)
    .on('data',(data)=>{
      raw = JSON.parse(data.toString('utf8'))
      console.log("sending message to " , raw[name_field])
      send_message(raw[phone_field], text);
    })
    .on('done',(error)=>{
      console.log('\ncsv done\n.-')
    })

});

client.on('change_state', (state) => {
    // const { battery, plugged } = batteryInfo;
    console.log(state);
});

const send_message = function(number, text){
    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    //const chatId = number.substring(1) + "@c.us";
    const chatId = number + "@c.us";

    client.sendMessage(chatId, text);
//    console.log('sendig message to ', number);
}
