# Coders-Calendar-Api
API to read data from Google Sheets for Coder's Calendar Android/Web Application.

### Environment file

You need to setup a `.env` file in the root of the repository. The file should look like this: (`.env.template` available in repository)

```bash
NODE_ENV = #Your node environment mode (development or production)
SHEET_KEY= #Sheet key of the sheet you want to access
```


### Usage:
- Set Up:
```
git clone https://github.com/hemangnakarani/coders-calendar-api.git
cd coders-calendar-api
npm install
```

- Run server: (Development)
```
npm run dev
```
- Run server: (Production)
```
npm start
```
