import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import log from 'loglevel';
import remote from 'loglevel-plugin-remote';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const customJSON = (log: any) => {
  console.log('got log request', log)
  return {
  msg: log.message,
  level: log.level.label,
  stacktrace: log.stacktrace,
  timestamp: log.timestamp,
  complex: "test" + log.complex
 }};
 

 const loggerOptions = {
  url: 'http://localhost:8080/logger',
  method: 'POST',
  headers: {"Content-Type": "application/json"},
  token: '',
  onUnauthorized: (failedToken: any) => {console.log('failed token', failedToken)},
  timeout: 0,
  interval: 1000,
  level: 'trace',
  backoff: {
    multiplier: 2,
    jitter: 0.1,
    limit: 30000,
  },
  capacity: 500,
  stacktrace: {
    levels: ['trace', 'warn', 'error'],
    depth: 3,
    excess: 0,
  },
  timestamp: () => new Date().toISOString(),
  // format: remote.plain,
  format: customJSON
};

 remote.apply(log, loggerOptions);
 
 log.enableAll();
 
 log.info('Message one');
 log.warn('Message two');

 log.info('complex message: %o ', loggerOptions)
