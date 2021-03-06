// declare module 'loglevel-plugin-remote';

// import * as log from 'loglevel';
// export as namespace log;
// export = log;

interface Window {
  configData: {
    api_base_url: string
    debounce_delay: number
    disableAdAuth: boolean
    msalConfig: {
      auth: {
        clientId: string
        authority: string
        redirectUri: string
        postLogoutRedirectUri: string
      }
      cache: {
        cacheLocation: string
        storeAuthStateInCookie: boolean
      }
      endpoints: {
        [key: string]: string
      }
    }
    mode: Environment
  }
}

interface filter {
  field: string
  value: any
}

interface apps {
  APP_ID: string
  APP_DESC: string | null
  APP_NAME: string
  APP_LOGO?: File
}

interface logs {
  LOG_ID: number
  SESSION_ID: string
  LOG_LEVEL: string
  URL: string
  MSG: string
  STACKTRACE: string
  TIMESTAMP: Date
  USERAGENT?: string
  CLIENT_IP?: string
  REMOTE_IP?: string
  textBlock?: string[]
  cssBlock?: any[]
  contentBlock?: any[]
}

interface feedbackChannel {
  CHANNEL_ID: number
  APP_ID: string
  CHANNEL_NAME: string
  CHANNEL_DESC: string | null
  CHANNEL_ENDPOINT: string
}
interface feedback {
  FEEDBACK_ID: number
  CHANNEL_ID: number
  APP_ID: string
  FEEDBACK_TITLE: string
  FEEDBACK_MESSAGE: string
  FEEDBACK_POSITIVE_NEGATIVE: boolean | null
  FEEDBACK_RAITING: string | null
}
