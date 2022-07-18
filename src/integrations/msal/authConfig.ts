import { Configuration, PopupRequest, PublicClientApplication } from "@azure/msal-browser"

const configData: any = window.configData

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: configData.msalConfig.auth.clientId,
    authority: configData.msalConfig.auth.authority,
    redirectUri: configData.msalConfig.auth.redirectUri,
    postLogoutRedirectUri: configData.msalConfig.auth.postLogoutRedirectUri,
  },
  cache: {
    cacheLocation: configData.msalConfig.cache.cacheLocation, // This configures where your cache will be stored
    storeAuthStateInCookie: configData.msalConfig.cache.storeAuthStateInCookie, // Set this to "true" if you are having issues on IE11 or Edge
  },
}

export const msalInstance = new PublicClientApplication(msalConfig)

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
}

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: configData.msalConfig.endpoints.me,
}

let accessToken = ""

async function msalApiTokenRequest() {
  return (
    msalInstance
      // .acquireTokenSilent(loginRequest)
      .acquireTokenSilent({
        account: msalInstance.getAllAccounts()[0],
        scopes: loginRequest.scopes,
      })
      .then((response) => {
        if (response.accessToken) {
          // console.log("got access token", response)
          accessToken = response.accessToken
          return response.accessToken
        } else {
          console.log("issue with access token response", response)
          return null
        }
      })
      .catch((err) => {
        console.log("token error", err)
        return null
      })
  )
}

export async function msalApiRequestWithToken(url, abortController, contentType?, token?) {
  let tokenToUse: string | null = null
  const contentTypeToUse = contentType ? contentType : "application/json"

  if (token) {
    console.log("token provided")
    tokenToUse = token
  } else if (accessToken === "") {
    tokenToUse = await msalApiTokenRequest()
    console.log("setting token new")
  } else {
    console.log("token reused")
    tokenToUse = accessToken
  }

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenToUse}`,
      "Content-Type": contentTypeToUse,
    },
    signal: abortController.signal,
  }).catch((err) => {
    console.log("msalApiRequestWithToken err", err)
    accessToken = ""
    // const newToken = await msalApiTokenRequest()
    // return msalApiRequestWithToken(url, contentTypeToUse, newToken)
  })
}
