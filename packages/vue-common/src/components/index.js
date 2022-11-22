import NForm from './NForm'
import NTable from './NTable'

const components = {
  NForm,
  NTable,
}

export default {
  install(Vue) {
    Object.values(components).forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
