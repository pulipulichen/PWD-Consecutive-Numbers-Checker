let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
      messageCount: 0,
      messageText: ``
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
  },
  computed: {
    message: async function () {
      this.messageText = ``

      await this.db.utils.AsyncUtils.sleep(0)
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

        if (i > 0 && i % 50 === 0) {
          await this.db.utils.AsyncUtils.sleep(0)
        }
      }

      let messageText = output.map(item => item.join('\n')).join('\n\n')
      if (messageText === '') {
        messageText = this.$t('No lost id.')
      }
      this.messageText = messageText
      return messageText
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