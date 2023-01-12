import Vue from 'vue'
import ElementUI from '@common/core/element-ui'
import App from './App'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
