# [Queer Calendar Sheffield](https://queercalendarsheffield.co.uk)

## How to Contribute

- Submit issues if you want to see a feature or find a bug [here](https://github.com/CanopusFalling/Queer-Calendar-Sheffield/issues)!
- [Fork this repo](https://github.com/CanopusFalling/Queer-Calendar-Sheffield/fork) and submit a [pull request](https://github.com/CanopusFalling/Queer-Calendar-Sheffield/compare) if you want to contribute to the website.
- If you would like to get involved with the calendar [get in touch](https://queercalendarsheffield.co.uk/contact)!

## Development Setup

### Requirements

- Node Package Manager v9.8.1
- NodeJS v18.15.0

_Version numbers are based on what has been tested, newer versions will likely work._

[Install instructions for node and npm.](https://docs.npmjs.com/cli/v9/configuring-npm/install)

### Local Evnironment Setup

- Create a copy of `.env.local.sample` and name it `.env.local`.
- Replace `[Google-Calendar-API-Key]` with your google API key. The API key must have the calendar API enabled. [Instructions to obtain a Google API key.](https://support.google.com/googleapi/answer/6158862)

### Installing Node Modules

Run the following to install all node modules.

```
npm install
```

### Running the Project

Run the following command to launch the project.

```
npm run dev
```

You should then be able to view the local website on [http://localhost:3000](http://localhost:3000).

## Testing

Run `npm run test:cypress` to test the project using the cypress interactive UI.

`npm run test:cypress-headless` runs all tests in a terminal.
