export function handleJsonResponse(response: any): { data: any; status: number; statusText: string } {
  return response.json().then((json: any) => {
    if (!response.ok) {
      // if changed, all API calls will break
      const error = {
        data: json,
        status: response.status,
        statusText: response.statusText,
        error: `${response.status}: ${response.statusText}.
        ${json.error}`,
      }

      return Promise.reject(error)
    }
    const returnObject = {
      data: json,
      status: response.status,
      statusText: response.statusText,
    }
    return returnObject
  })
}
