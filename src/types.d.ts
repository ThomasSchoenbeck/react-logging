// declare module 'loglevel-plugin-remote';

// import * as log from 'loglevel';
// export as namespace log;
// export = log;

interface filter {
  field: string
  value: any
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
