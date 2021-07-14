<template>
  <uploadExcel :on-success="success" />
</template>

<script>
import { importEmployees } from '@/api/employees'
export default {
  methods: {
    async success({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          userInfo[userRelations[key]] = item[key]
        })
        arr.push(userInfo)
      })
      await importEmployees(arr) // 调用导入接口
      this.$message.success('数据导入成功')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
