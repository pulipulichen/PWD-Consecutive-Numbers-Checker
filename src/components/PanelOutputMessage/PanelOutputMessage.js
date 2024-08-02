let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
      messageCount: 0
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

      let output = []
      this.messageCount = 0
      for (let i = 0; i < allIDList.length; i++) {
        let subrange = allIDList[i]
        
        
        let suboutput = subrange.filter(id => idList.indexOf(id) === -1)
        if (suboutput.length > 0) {
          this.messageCount = this.messageCount + suboutput.length
          output.push(suboutput)
        }
      }

      return output.map(item => item.join('\n')).join('\n\n')
    },
    idList () {
      return this.$parent.idList
    },
    ruleAry () {
      return this.$parent.ruleAry
    },
    allIDList () {
      return this.$parent.allIDList
    }
  },
  mounted() {
    
  },
  methods: {
    copy () {
      this.db.utils.ClipboardUtils.copyPlainString(this.message)
    }  
  }
}

export default app