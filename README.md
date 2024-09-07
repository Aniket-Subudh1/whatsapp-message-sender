```markdown
# WhatsApp Message Sender

A Node.js tool to send WhatsApp messages by reading contact data from an Excel file. This package uses `whatsapp-web.js` to automate the process of sending messages through WhatsApp Web.

## Features

- Send WhatsApp messages to multiple contacts listed in an Excel file.
- Personalize messages using a template that includes the contact's name.
- Specify which columns in the Excel file correspond to the names and phone numbers.
- Add a country code to phone numbers automatically before sending messages.
- Introduce a delay between messages to avoid triggering WhatsApp's rate limits.

## Installation

To install the package, use npm:

```bash
npm install whatsapp-message-sender
```

## Usage

To use the package, first require it in your Node.js script, then call the function `sendMessagesFromExcel` with the appropriate parameters.

### Example

```javascript
const sendMessagesFromExcel = require('whatsapp-message-sender');

const filePath = 'path_to_your_excel_file.xlsx';  // Path to your Excel file
const nameColumn = 'Name';                        // Column name for the contact names
const phoneColumn = 'Contact No.';                // Column name for the phone numbers
const messageTemplate = 'Hello {name}, this is a personalized message!';
const countryCode = '91';                         // Country code (e.g., "91" for India)
const delayMs = 5000;                             // Delay between messages in milliseconds (optional)

sendMessagesFromExcel(filePath, nameColumn, phoneColumn, messageTemplate, countryCode, delayMs);
```

### Parameters

- `filePath`: The path to your Excel file containing the contact information.
- `nameColumn`: The column in the Excel file that contains the names of the contacts.
- `phoneColumn`: The column in the Excel file that contains the phone numbers of the contacts.
- `messageTemplate`: A template for the message. Use `{name}` as a placeholder for the contact's name.
- `countryCode`: The country code to prepend to each phone number (e.g., "91" for India).
- `delayMs` (optional): The delay between sending each message, in milliseconds. This helps to avoid triggering WhatsApp's rate limits. The default is 5000 milliseconds (5 seconds).

## Excel File Format

The Excel file should have at least two columns: one for the names and another for the phone numbers. The columns should be named consistently, and you should specify the column names when using the package.

### Example Excel Format:

| Name             | Contact No.  |
|------------------|--------------|
| Aniket           | 1234567890   |
| Aniket Subudhi   | 0987654321   |
| ...              | ...          |

## QR Code for WhatsApp Web

When you run the script for the first time, it will generate a QR code in the terminal. Scan this QR code with your WhatsApp mobile app to log in. The session will persist until you log out or the session expires.

## Rate Limiting

To avoid triggering WhatsApp's rate limits, you can introduce a delay between sending each message. The delay is customizable via the `delayMs` parameter and is set to 5 seconds by default. This helps in mimicking human-like behavior and prevents your account from being flagged for spam.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository on GitHub.
2. Create a new branch from the `master` branch.
3. Make your changes.
4. Commit your changes with a descriptive commit message.
5. Push your changes to your forked repository.
6. Submit a pull request to the `master` branch.

## Issues

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/Aniket-Subudh1/whatsapp-message-sender.git).

## Author

[Aniket Subudhi](https://github.com/Aniket-Subudh1)
```
