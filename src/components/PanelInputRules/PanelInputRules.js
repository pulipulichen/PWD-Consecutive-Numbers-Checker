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
    ruleAry () {
      let rules = this.db.localConfig

      let output = []

      rules.trim().split('\n').forEach((line) => {
        if (line.indexOf('~') > -1) {
          let parts = line.split('~').map(item => {
            if (isNaN(item)) {
              return false
            }
            return Number(item)
          }).filter(item => (item !== false))

          // =================================================================

          for (let i = 1; i < parts.length; i++) {
            let lastPart = parts[(i - 1)]
            
          }
        }
      })
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
    }
  }
}

export default app