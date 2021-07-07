<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 -->
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="20">
            <span>xxx股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col :span="12">负责人</el-col>
              <el-col :span="12">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 树形解构 静态 -->
        <el-tree :data="list" :default-expand-all="true" props="defaltProp">
          <TreeTools />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      list: [{
        name: '总裁办',
        manager: '朱元璋',
        children: [{
          name: '董事会',
          manager: '朱棣'
        }]
      }, {
        name: '人事部',
        manager: '马皇后',
        children: [{
          name: '薪酬组',
          manager: '锦衣卫'
        }, {
          name: '招聘组',
          manager: '斧头帮'
        }]
      }, {
        name: '开发',
        manager: '',
        children: [{
          name: '前端'
        }, {
          name: '后端'
        }]
      }]
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
