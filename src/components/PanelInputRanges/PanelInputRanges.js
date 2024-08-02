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
    'ruleAry' () {
      let input = this.ruleAry
      this.db.config.ruleAry = this.generateSequence(input)
    },
    allIDList () {
      let input = this.ruleAry
      this.db.config.allIDList = this.generateSequence(input)
    },
  },
  computed: {
    ruleAry () {
      return this.$parent.ruleAry
    },
    allIDList () {
      return this.$parent.allIDList
    },
    // randomIDList () {
    //   return this.randomDeletePercent(this.allIDList)
    // }
  },
  mounted() {
    
  },
  methods: {
    generateSequence: function(input) {
      return this.$parent.generateSequence(input)
    },
    findLongestNumber(str) {
      return this.$parent.findLongestNumber(str)
    },
    randomDeletePercent(arr, percent = 0.1) {
      this.$parent.randomDeletePercent(arr, percent)
    },
    sortRanges () {
      this.$parent.sortRanges()
    }, 
    copy () {
      this.db.utils.ClipboardUtils.copyPlainString(this.db.localConfig.ranges)
    }  
  }
}

export default app