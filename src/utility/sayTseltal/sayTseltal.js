const NUMBERS_ONE_TWENTY = {
  1: "jun",
  2: "cheb",
  3: "oxeb",
  4: "chaneb",
  5: "ho'eb",
  6: "waqueb",
  7: "huqueb",
  8: "waxaqueb",
  9: "baluneb",
  10: "lajuneb",
  11: "buhlucheb",
  12: "lajchayeb",
  13: "oxlajuneb",
  14: "chanlajuneb",
  15: "ho'lajuneb",
  16: "waclajuneb",
  17: "huclajuneb",
  18: "waxaclajuneb",
  19: "balunlajuneb"
}

const MULTIPLIERS = {
  1: "j",
  2: "cha'",
  3: "ox",
  4: "chan",
  5: "ho'",
  6: "wac",
  7: "huc",
  8: "waxac",
  9: "balun",
  10: "lajun",
  11: "buhluch",
  12: "lajchay",
  13: "oxlajun",
  14: "chanlajun",
  15: "ho'lajun",
  16: "waclajun",
  17: "huclajun",
  18: "waxaclajun",
  19: "balunlajun"
}

const PRONOUNS = {
  1: "j",
  2: "s",
  3: "y",
  4: "s",
  5: "s",
  6: "s",
  7: "s",
  8: "s",
  9: "s",
  10: "s",
  11: "s",
  12: "s",
  13: "y",
  14: "s",
  15: "s",
  16: "s",
  17: "s",
  18: "s",
  19: "s"
}

const EXACT_TWENTY = "jtahb"

// Other regions use jcalab insteaf of jbahc' bahqu'etic
const ORDERS = ["", "winic", "bahc'", "pic", "bahc' bahqu'etic", "mam"]
//                   20**1    20**2   20**3   20**4              20**5
//                   20       400     8,000   160,000            3,200,000

export const sayTseltal = (n) => {
  let number = +n  // TODO: trim commas and spaces
  if (isNaN(number)) throw new Error("Solo se aceptan numeros / Yahtabal ha'nax")
  if (number < 0 || number > 63999999) throw new Error("Numero fuera de rango / Yahtabal c'ax muc'")

  if (number === 0) return "Ma'yuc"

  let tmpNumber = number
  const baseTwenty = []
  while(tmpNumber > 0){
    baseTwenty.push(tmpNumber % 20)
    tmpNumber -= baseTwenty[baseTwenty.length - 1]
    tmpNumber /= 20
  }
  //console.log(baseTwenty);

  let result = ""
  let pos = 0
  while (baseTwenty[pos] === 0) { pos++ }

  if (pos === 0) {
    result += NUMBERS_ONE_TWENTY[baseTwenty[pos]]
  } else {
    if (pos === 1 && baseTwenty[pos] === 1) {result += EXACT_TWENTY}
    else { result += MULTIPLIERS[baseTwenty[pos]] + ORDERS[pos]}
  }

  pos++

  while(pos < baseTwenty.length) {
    // 19 Special case
    if (baseTwenty[pos] === 19) {result += " s" + ORDERS[pos+1] + "al"}
    else if (baseTwenty[pos] !== 0) {
      result += " " + PRONOUNS[baseTwenty[pos]+1] + MULTIPLIERS[baseTwenty[pos]+1] + ORDERS[pos]
    }
    pos++
  }

  return result
}
