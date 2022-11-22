import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import components from '@/components'
import directives from '@/directives'

export default async ({ Vue }) => {
  Vue.use(ElementUI).use(components).use(directives)
}
