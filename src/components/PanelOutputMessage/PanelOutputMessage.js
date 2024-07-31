let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
  },
  computed: {
    message () {
      let allIDList = this.allIDList
      let idList = this.idList

      let output = allIDList.filter(id => idList.indexOf(id) === -1)
      // console.log(output)
      return output
    },
    idList () {
      let idListText = this.db.localConfig.idList

      return idListText.trim().split('\n').map(item => {
        return this.findLongestNumber(item)
      }).filter(item => {
        return (item !== null)
      })
    },
    ruleAry () {
      let rules = this.db.localConfig.rules

      let output = []

      rules.trim().split('\n').forEach((line) => {
        if (line.indexOf('~') > -1) {
          let parts = line.split('~').map(item => {
            return this.findLongestNumber(item)
          }).filter(item => (item !== null))

          // =================================================================

          for (let i = 1; i < parts.length; i++) {
            let start = parts[(i - 1)]
            let end = parts[i]

            output.push([start, end])
          }
        }
        else {
          line = this.findLongestNumber(line)
          console.log(line)
          if (!line) {
            return false
          }
          let start = Number(str(line).trim().slice(0, -2))
          let end = line
          output.push([start, end]) 
        }
      })

      return output
    },
    allIDList () {
      let input = this.ruleAry
      let output = this.generateSequence(input)
      // console.log(output)
      return output
    },
    randomIDList () {
      return this.randomDeletePercent(this.allIDList)
    }
  },
  mounted() {
    
  },
  methods: {
    generateSequence: function(input) {
      let result = [];
    
      // 遍歷每個區間
      for (let range of input) {
        const [start, end] = range;
    
        // 產生該區間的所有數字
        for (let i = start; i <= end; i++) {
          result.push(i);
        }
      }
    
      // 將數字陣列轉換為逗號分隔的字串
      return result;
    },
    findLongestNumber(str) {
      const numberRegex = /\d+/g;
      const numbers = str.match(numberRegex);
    
      if (!numbers || numbers.length === 0) {
        return null; // No numbers found
      }
    
      const longestNumber = numbers.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
      }, "");
    
      return Number(longestNumber)
    },
    randomDeletePercent(arr, percent = 0.1) {
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
  }
}

export default app