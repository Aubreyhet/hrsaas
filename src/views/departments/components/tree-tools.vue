<!--  -->
<template>
  <el-row type="flex" justify="space-between" align="middle" style="width:100%; height:40px">
    <el-col :span="20">
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handelFun">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { delDepartments } from '@/api/departments'
export default {
  name: '',

  // import引入的组件需要注入到对象中才能使用
  components: {},

  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },

  data() {
    // 这里存放数据
    return {}
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {},

  beforeCreate() {}, // 生命周期 - 创建之前

  // 生命周期 - 创建完成（可以访问当前this实例
  created() {},

  // 生命周期 - 挂载完成（可以访问DOM元素
  mounted() {},

  beforeMount() {}, // 生命周期 - 挂载之前

  beforeUpdate() {}, // 生命周期 - 更新之前

  updated() {}, // 生命周期 - 更新之后

  beforeDestroy() {}, // 生命周期 - 销毁之前

  destroyed() {}, // 生命周期 - 销毁完成

  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发

  // 方法集合
  methods: {
    async handelFun(type) {
      if (type === 'add') {
        this.$emit('addDeparts', this.treeNode)
      } else if (type === 'edit') {
        this.$emit('editDeparts', this.treeNode)
      } else {
        this.$confirm('确定删除该数据吗?').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          this.$emit('delDepart')
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style>

</style>
