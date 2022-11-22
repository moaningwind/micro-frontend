<template>
  <div>
    <h1>Vue Micro</h1>
    <NTable
      height="400"
      border
      :loading="loading"
      :data="data"
      :columns="columns"
      show-checkbox
      show-opn-col
      :current-page.sync="pagination.currentPage"
      :page-size.sync="pagination.pageSize"
      :total="pagination.total"
    >
      <template #title="{ row }">
        <span>{{ `${row.title} world!` }}</span>
      </template>
    </NTable>
  </div>
</template>

<script setup>
import NTable from '@common/components/NTable'
import { reactive, ref } from 'vue'

const data = ref([
  { display_time: '2022-02-09', author: 'wind', title: 'hello' },
  { display_time: '2022-02-09', author: 'wind', title: 'hello' },
  { display_time: '2022-02-09', author: 'wind', title: 'hello' },
  { display_time: '2022-02-09', author: 'wind', title: 'hello' },
  { display_time: '2022-02-09', author: 'wind', title: 'hello' },
  { display_time: '2022-02-09', author: 'wind', title: 'hello' },
  { display_time: '2022-02-09', author: 'wind', title: 'hello' },
  { display_time: '2022-02-09', author: 'wind', title: 'hello' },
  { display_time: '2022-02-09', author: 'wind', title: 'hello' },
  { display_time: '2022-02-09', author: 'wind', title: 'hello' },
])

const columns = ref([
  {
    prop: 'display_time',
    label: '日期',
    align: 'center',
  },
  {
    prop: 'author',
    label: '姓名',
    align: 'center',
  },
  {
    prop: 'title',
    label: '标题',
    align: 'center',
  },
])
const loading = ref(false)

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 200,
})
</script>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
