# whatsapp-web.js-bot

bot based on whatsapp-web.js for sending messages to multiple contacts

runs on console and read csv file for get phones numbers

## installation

install nodejs and npm, then install requirements csvtojson, qrcode-terminal and whatsapp-web.js as usual on npm: `$ npm install package-name`

## usage

- first fill the csv file with header line with 2 colums: name, phone_number (without "+" sign)
- fill/change config vars at the top of index.js

`$ npm index.js`

firts time usage, will prompt QR code you will to add to your whatsapp app on your mobile (just like you use on web.whatsapp.com).  after that, session.json file will be created.  next runs will detect that file and won't ask for QR code

after sending all messages "csv done" will appear.
