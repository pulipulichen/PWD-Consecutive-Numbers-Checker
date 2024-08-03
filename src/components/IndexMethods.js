
let IndexMethods = function (app) {
  app.methods.sortRanges = function () {
    let rules = this.db.localConfig.rules

    let output = []

    rules.trim().split('\n').forEach((line) => {
      if (line.indexOf('~') > -1) {
        let parts = line.split('~').map(item => {
          return this.findLongestNumber(item)
        }).filter(item => (item !== null))

        let start = parts[0]
        let end = parts[(parts.length - 1)]
        output.push([start, end, line])
      }
      else {
        line = this.findLongestNumber(line)
        // console.log(line)
        if (!line) {
          return false
        }
        let start = Number(str(line).trim().slice(0, -2))
        let end = line
        output.push([start, end, line])
      }
    })

    output = output.map(item => {
      let start = item[0]
      let end = item[1]
      let sorted = [start, end].sort()
      item[0] = sorted[0]
      item[1] = sorted[1]
      return item
    })

    output.sort(function (a, b) {
      return a[0] - b[0]
    })

    this.db.localConfig.rules = output.map(item => `${item[0]}~${item[1]}`).join('\n')
  }    

  app.methods.randomDeletePercent = function (arr, percent = 0.1) {
    // 計算要刪除的元素數量
    let deleteCount = Math.ceil(arr.length * percent);
  
    // 建立一個新的陣列，用來存放未被刪除的元素
    const newArr = [...arr];
  
    // 隨機刪除
    while (deleteCount > 0) {
      const randomIndex = Math.floor(Math.random() * newArr.length);
      newArr.splice(randomIndex, 1);
      deleteCount--;
    }
  
    return newArr;
  }

  app.methods.findLongestNumber = function (str) {
    const numberRegex = /\d+/g;
    const numbers = str.match(numberRegex);
  
    if (!numbers || numbers.length === 0) {
      return null; // No numbers found
    }
  
    const longestNumber = numbers.reduce((longest, current) => {
      return current.length > longest.length ? current : longest;
    }, "");
  
    return Number(longestNumber)
  }

  app.methods.generateSequence = function(input) {
    let result = [];
    let count = 0
    let show_warning = false

    // 遍歷每個區間
    for (let range of input) {
      const [start, end] = range;
      count = count + (end - start + 1)
      if (count > 10000) { 
        if (show_warning === false) {
          window.alert(this.$t('Ranges are too wide.'))
          show_warning = true
        }
        continue
      }

      let subresult = []
      // 產生該區間的所有數字
      for (let i = start; i <= end; i++) {
        subresult.push(i);
      }

      if (subresult.length > 0) {
        result.push(subresult)
      }
    }
  
    // 將數字陣列轉換為逗號分隔的字串
    return result;
  }

  app.methods.sortIdList = function () {
    let idListText = this.db.localConfig.idList

    let idList = idListText.trim().split('\n').map(item => {
      return [this.findLongestNumber(item), item]
    }).filter(item => {
      return (item[0] !== null)
    })

    idList.sort((a, b) => {
      return a[0] - b[0]
    })

    let output = []
    for (let i = 0; i < idList.length; i++) {
      let number = idList[i][0]
      if (i > 0) {
        let lastNumber = idList[i - 1][0]
        if (number - lastNumber > 1) {
          output.push('')
        }
      }
      output.push(idList[i][1])
    }

    this.db.localConfig.idList = output.join('\n')
  } 
}

export default IndexMethods