<template>
  <main class="main">
    <h1>Vue Base</h1>
    <el-button v-waves>
      点我有水波纹动画
    </el-button>
    <el-button v-spring>
      点我有回弹动画
    </el-button>
    <MicroApp />
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import waves from '@common/directives/waves'
import spring from '@common/directives/spring'

export default defineComponent({
  directives: {
    waves,
    spring,
  },
  components: {
    MicroApp: () => import('@micro/App.vue'),
  },
})
</script>

<style scoped>
.main h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 60px;
}
</style>
