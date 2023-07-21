# Queer Calendar Sheffield

You can view this project deployed over on cloudflare pages [here](https://queer-calendar-sheffield.pages.dev/).

## Development Setup

### Requirements

- Node Package Manager v9.8.1
- NodeJS v18.15.0

*Version numbers are based on what has been tested, newer versions will likely work.*

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