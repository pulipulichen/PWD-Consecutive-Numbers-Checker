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
    
  },
  mounted() {
    
  },
  methods: {
    sortIdList () {
      this.$parent.sortIdList()
    },
    copy () {
      this.db.utils.ClipboardUtils.copyPlainString(this.db.localConfig.idList)
    },
    convertToRanges () {
      let idListText = this.db.localConfig.idList

      let idList = idListText.trim().split('\n').map(item => {
        return [this.$parent.findLongestNumber(item), item]
      }).filter(item => {
        return (item[0] !== null)
      })

      idList.sort((a, b) => {
        return a[0] - b[0]
      })

      // =================================================================

      let output = []
      let start
      let end
      for (let i = 0; i < idList.length; i++) {
        let number = idList[i][0]
        if (i === 0) {
          start = number
        }
        if (i > 0) {
          let lastNumber = idList[i - 1][0]
          if (number - lastNumber < 2) {
            end = number
          }
          else {
            if (start === end) {
              output.push(`${start}`)
            }
            else {
              output.push(`${start}~${end}`)
            }

            start = number
          }
        }
      }

      this.db.localConfig.ranges = output.join('\n')
    }
  }
}

export default app