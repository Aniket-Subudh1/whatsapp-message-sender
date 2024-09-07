const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const xlsx = require('xlsx');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function sendMessagesFromExcel(filePath, nameColumn, phoneColumn, messageTemplate, countryCode, delayMs = 5000) {
    // Load the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const sheet = workbook.Sheets[sheet_name_list[0]];

    // Convert sheet to JSON, extracting the relevant columns
    const contacts = xlsx.utils.sheet_to_json(sheet).map(contact => {
        let cleanedPhoneNumber = contact[phoneColumn].toString().replace(/\D/g, '');

        // Check if the phone number starts with '0' and remove it (common in some regions)
        if (cleanedPhoneNumber.startsWith('0')) {
            cleanedPhoneNumber = cleanedPhoneNumber.substring(1);
        }

        // Ensure the phone number is properly formatted with the country code
        const fullPhoneNumber = `${countryCode}${cleanedPhoneNumber}`;

        return {
            name: contact[nameColumn],
            phoneNumber: fullPhoneNumber
        };
    });

    // Initialize WhatsApp client
    const client = new Client();

    client.on('qr', (qr) => {
        // Display the QR code in the terminal
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', async () => {
        console.log('Client is ready!');

        for (const contact of contacts) {
            const personalizedMessage = messageTemplate.replace('{name}', contact.name);

            try {
                await client.sendMessage(`${contact.phoneNumber}@c.us`, personalizedMessage);
                console.log('Message sent to:', contact.phoneNumber);
            } catch (err) {
                console.error('Failed to send message to:', contact.phoneNumber, err);
            }

            // Introduce a delay between messages
            await delay(delayMs);
        }
    });

    client.initialize();
}

module.exports = sendMessagesFromExcel;
