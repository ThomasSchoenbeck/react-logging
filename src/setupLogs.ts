import log from "loglevel"
import remote from "./remoteLogging"
import { v4 as uuidv4 } from "uuid"
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// var originalFactory = log.methodFactory
// log.methodFactory = function (methodName, logLevel, loggerName) {
//   var rawMethod = originalFactory(methodName, logLevel, loggerName)

//   return function () {
//     var messages: any[] = []
//     for (var i = 0; i < arguments.length; i++) {
//       messages.push(arguments[i])
//     }
//     rawMethod(messages)
//   }
// }
// log.setLevel(log.getLevel()); // Be sure to call setLevel method in order to apply plugin
const uuid = uuidv4()

const customJSON = (log: any) => {
  // console.log(log)
  // const { userAgent } = navigator
  const newLog: logs = {
    LOG_ID: -1,
    SESSION_ID: uuid,
    LOG_LEVEL: log.level.label,
    URL: window.location.href,
    // msg: JSON.stringify(log.message),
    MSG: log.message,
    STACKTRACE: log.stacktrace,
    TIMESTAMP: log.timestamp,
    // userAgent: userAgent, // will be added through backend, read from the reuqest
    // complex: "test" + log.complex,
  }
  return newLog
}

const loggerOptions = {
  url: "http://localhost:8080/logger",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  token: "",
  onUnauthorized: (failedToken: any) => {
    console.log("failed token", failedToken)
  },
  timeout: 0,
  interval: 1000,
  level: "trace",
  backoff: {
    multiplier: 2,
    jitter: 0.1,
    limit: 30000,
  },
  capacity: 500,
  stacktrace: {
    levels: ["trace", "warn", "error"],
    depth: 3,
    excess: 0,
  },
  timestamp: () => new Date().toISOString(),
  // format: remote.plain,
  format: customJSON,
}

//  log.enableAll();
remote.apply(log, loggerOptions)

log.setLevel("trace")

// log.info("Message one", ["1", 2, { 3: 4 }], { test: "some string", inObj: "content" })
// log.warn("Message two")

// log.info("testmessage", "sssion")

// log.debug("complex message: %o ", loggerOptions)
