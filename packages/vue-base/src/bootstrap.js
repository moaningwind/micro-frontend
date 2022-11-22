import Vue from 'vue'
import App from './App'

import ElementUI from '@common/core/element-ui'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
