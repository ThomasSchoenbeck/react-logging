export function styleBlock(backgroundColor: string, textColor?: string): string {
  return `display: inline-block ; background-color: ${backgroundColor}; color: ${
    textColor && textColor !== "" ? textColor : "#fff"
  } ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;`
}

// test comment
export function getRandomColor() {
  var letters = "0123456789ABCDEF"
  var color = "#"
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

/**
 * Log with Style -
 * Returns a string and an object with css styling information. Default text color is white.
 *
 * use like this:
 *
 * console.log(...lws([["text"]]));
 *
 * console.log(...lws([["text", "background color", "text color"]]));
 *
 * console.log(...lws([["text1", "color1"], ["text2", "color2"], ...]), <additional text/vars> );
 *
 * @param {string[][] }styles A two-dimensional string array containing the names and colors to print into the log.
 * @param {any[]} optStuff an array of optional parameters with type any[].
 * @return {any[]} returns an array of type any
 */
export function lws(styles: string[][], ...optStuff: any[]): any[] {
  let inputStrings: string[] = []
  let cssStrings: string[] = []

  for (let i = 0; i < styles.length; i++) {
    inputStrings.push("%c" + styles[i][0])
    if (i + 1 < styles.length) {
      // console.log("adding trailing %c")
      inputStrings.push("%c ")
    }

    if (styles[i].length === 3) {
      cssStrings.push(styleBlock(styles[i][1], styles[i][2]))
    } else if (styles[i].length === 2) {
      cssStrings.push(styleBlock(styles[i][1]))
    } else if (styles[i].length === 1) {
      cssStrings.push(styleBlock(getRandomColor()))
    }
    cssStrings.push("")
  }

  let returnObject: any
  if (optStuff && optStuff.length > 0) {
    returnObject = [inputStrings.join(""), ...cssStrings, ...optStuff]
  } else {
    returnObject = [inputStrings.join(""), ...cssStrings]
  }

  return returnObject
}
