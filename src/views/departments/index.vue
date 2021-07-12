<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 -->
        <TreeTools :tree-node="compony" :is-root="true" @addDeparts="addDeparts" />
        <!-- 树形解构 静态 -->
        <el-tree :data="list" :default-expand-all="true" props="defaltProp">
          <TreeTools slot-scope="{ data }" :tree-node="data" @delDepart="getDepartmentsFn" @addDeparts="addDeparts" @editDeparts="editDeparts" />
        </el-tree>
      </el-card>
      <!-- 添加部门的弹出框 -->
      <AddDepts ref="addDepart" :is-show-dialog.sync="isShowDialog" :tree-node="node" @addDepart="getDepartmentsFn" />
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
      this.compony = { name: result.companyName, magager: result.companyManage, id: '' }
      this.list = tranListToTree(result.depts, '')
    },
    addDeparts(pNode) {
      this.isShowDialog = true
      this.node = pNode
    },
    // 编辑部门信息
    async editDeparts(node) {
      this.node = node
      this.isShowDialog = true
      this.$refs.addDepart.getSimpleDepartment(node.id)
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
