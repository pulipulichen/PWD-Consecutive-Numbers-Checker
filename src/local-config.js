let localConfig = {
  lastChanged: null,

  rules: `81230101~81230120
81230201~81230239
81230301~81230339
81230401~81230439
81230501~81230530
81230601~81230632
81230701~81230732
81230801~81230831
81230901~81230931
81231001~81231039
81231101~81231139
81231201~81231240
81231301~81231339
81231401~81231430
81231501~81231540
81231601~81231641
81231701~81231737
81231801~81231839`,
  idList: ``,
}

// ----------------------------------------------------------------

let localConfigEnv = {
  locale: 'zh-TW'
}

for (let name in localConfigEnv) {
  localConfig[name] = localConfigEnv[name]
}

export default localConfig