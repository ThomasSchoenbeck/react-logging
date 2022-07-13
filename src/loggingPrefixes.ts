import { lws } from "./logging"

export interface loggingPrefixProps {
  failure: string[]
  empty: string[]
  success: string[]
  useEffect: string[]
  debounce: string[]
  switch: string[]
  eval: string[]
  form: string[]
  apiOrder: string[]
  api: string[]
  checkin: string[]
  loading: string[]
  updated: string[]
  setter: string[]
}

export interface loggingGroupProps {
  p: string[]
  pA: string[]
  pAE: string[]
  pAF: string[]
  pAO: string[]
  pAS: string[]
  pC: string[]
  pD: string[]
  pE: string[]
  pF: string[]
  pForm: string[]
  pL: string[]
  pS: string[]
  pSe: string[]
  pU: string[]
  pUF: string[]
  pUS: string[]
  pUp: string[]
}

export const prefixes: loggingPrefixProps = {
  failure: ["FAILED", "red"],
  empty: ["EMPTY", "lightblue", "blue"],
  success: ["SUCCESS", "lightgreen", "green"],
  useEffect: ["UseEffect", "purple"],
  debounce: ["Debounce", "brown"],
  switch: ["SWITCH", "#b6ca12", "black"],
  eval: ["Eval", "#4efcb9", "#333"],
  form: ["FORM", "#ff99ff", "#333"],
  apiOrder: ["API ORDER", "darkblue", "yellow"],
  api: ["API", "yellow", "red"],
  checkin: ["CHECK IN", "#333"],
  loading: ["LOADING", "#FF9966", "#000"],
  updated: ["Updated", "red", "yellow"],
  setter: ["SETTER", "#119944"],
}
export const prefixGroups: loggingGroupProps = {
  p: ["prefix"],
  pA: ["prefix", "api"],
  pAE: ["prefix", "api", "empty"],
  pAF: ["prefix", "api", "failure"],
  pAO: ["prefix", "apiOrder"],
  pAS: ["prefix", "api", "success"],
  pC: ["prefix", "checkin"],
  pD: ["prefix", "debounce"],
  // pUSTAJC:['prefix', 'prefixUpdateSourceTablesAndJoinColumns'],
  pE: ["prefix", "eval"],
  pF: ["prefix", "failure"],
  pForm: ["prefix", "form"],
  pL: ["prefix", "loading"],
  pS: ["prefix", "switch"],
  pSe: ["prefix", "setter"],
  pU: ["prefix", "useEffect"],
  pUF: ["prefix", "useEffect", "failure"],
  pUS: ["prefix", "useEffect", "success"],
  pUp: ["prefix", "updated"],
}

export function createPrefixGroup(inputPrefix: string[]) {
  let resultObject = {} as loggingGroupProps

  for (let gr in prefixGroups) {
    // console.log("[group]:", gr, prefixGroups[gr]);

    const partArray: string[][] = []
    for (let i = 0; i < prefixGroups[gr].length; i++) {
      const p = prefixGroups[gr][i]

      if (p !== "prefix") {
        // console.log("    [Prefix]:", p, prefixs[p]);
        partArray.push(prefixes[p])
      } else {
        // console.log("    [Prefix]:", "prefix", inputPrefix);
        partArray.push(inputPrefix)
      }
    }
    // console.log("partArray:", ...partArray);
    const result = lws([...partArray])
    resultObject[gr] = result
  }

  // // TESTING
  // for (let el in resultObject) {
  //   console.log(...resultObject[el], "test");
  // }

  return resultObject
}
