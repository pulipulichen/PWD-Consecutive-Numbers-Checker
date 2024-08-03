function IndexComputed (app) {
  app.methods.ruleAry = function () {
    let ranges = this.db.localConfig.ranges

    let output = []

    ranges.trim().split('\n').forEach((line) => {
      if (line.indexOf('~') > -1) {
        let parts = line.split('~').map(item => {
          return this.findLongestNumber(item)
        }).filter(item => (item !== null))

        let start = parts[0]
        let end = parts[(parts.length - 1)]
        output.push([start, end])
      }
      else {
        line = this.findLongestNumber(line)
        // console.log(line)
        if (!line) {
          return false
        }
        let start = Number(str(line).trim().slice(0, -2))
        let end = line
        output.push([start, end])
      }
    })

    return output
  }

  app.methods.allIDList = function () {
    let input = this.ruleAry()
    let output = this.generateSequence(input)
    // console.log(output)
    return output
  }

  app.methods.idList = function () {
    let idListText = this.db.localConfig.idList

    return idListText.trim().split('\n').map(item => {
      return this.findLongestNumber(item)
    }).filter(item => {
      return (item !== null)
    })
  }
}

export default IndexComputed