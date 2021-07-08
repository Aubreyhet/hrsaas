<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 -->
        <TreeTools :tree-node="compony" @addDeparts="addDeparts" />
        <!-- 树形解构 静态 -->
        <el-tree :data="list" :default-expand-all="true" props="defaltProp">
          <TreeTools slot-scope="{ data }" :tree-node="data" @delDepart="getDepartmentsFn" @addDeparts="addDeparts" />
        </el-tree>
      </el-card>
      <AddDepts :is-show-dialog="isShowDialog" />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTree } from '@/utils'
import AddDepts from './components/addDepts.vue'
export default {
  components: {
    TreeTools,
    AddDepts
  },
  data() {
    return {
      compony: {},
      list: [],
      isShowDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartmentsFn()
  },
  methods: {
    async getDepartmentsFn() {
      const result = await getDepartments()
      this.compony = { name: result.companyName, magager: result.companyManage }
      this.list = tranListToTree(result.depts, '')
    },
    addDeparts(pNode) {
      this.isShowDialog = true
      this.node = pNode
    }
  }
}
</script>

<style scoped>
.tree-card{
  padding: 30px 140px;
  font-size: 14px;
}
</style>
