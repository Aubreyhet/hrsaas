<!-- 添加部门信息弹出层 -->
<template>
  <el-dialog
    title="添加部门"
    :visible="isShowDialog"
  >
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" style="width:80%" placeholder="1-300个字符" :rows="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  name: 'AddDepts',

  // import引入的组件需要注入到对象中才能使用
  components: {},

  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data() {
    // 这里存放数据
    return {
      // 新增部门的信息字段
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        manager: '', // 部门负责人
        name: '' // 部门名称
      },
      // form表单数据的校验规则
      rules: {
        code: [{ required: true, message: '部门编码必填', trigger: 'blur' }, { min: 5, max: 50, message: '部门编码长度必须为1-50个字符', trigger: 'blur' }],
        introduce: [{
          required: true, message: '部门描述必填', trigger: 'blur'
        },
        {
          min: 30, max: 300, message: '部门描述长度必须为1-300个字符', trigger: 'blur'
        }],
        manager: [{
          required: true, message: '部门负责人必填', trigger: 'blur'
        }],
        // 部门名称 同级部门下不能出现相同的部门
        name: [{
          required: true, message: '部门名称必填', trigger: 'blur'
        },
        {
          min: 5, max: 50, message: '部门名称长度必须为1-50个字符', trigger: 'blur'
        }]
      }
    }
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 生命周期 - 创建完成（可以访问当前this实例
  created() {},

  // 生命周期 - 挂载完成（可以访问DOM元素
  mounted() {},

  beforeCreate() {}, // 生命周期 - 创建之前

  beforeMount() {}, // 生命周期 - 挂载之前

  beforeUpdate() {}, // 生命周期 - 更新之前

  updated() {}, // 生命周期 - 更新之后

  beforeDestroy() {}, // 生命周期 - 销毁之前

  destroyed() {}, // 生命周期 - 销毁完成

  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发

  // 方法集合
  methods: {}
}
</script>

<style scoped>

</style>
