<!-- 添加部门信息弹出层 -->
<template>
  <el-dialog
    :title="showTitle"
    :visible="isShowDialog"
    @close="closeDialog"
  >
    <el-form ref="repartForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="2-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="2-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="部门负责人" @focus="getSimpleUserInfo">
          <el-option v-for="item in people" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" style="width:80%" placeholder="3-300个字符" :rows="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" @click="addDepartmants">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { getDepartments, addDepartmants, getSimpleDepartment, updateDepartment } from '@/api/departments'
import { getSimpleUserInfo } from '@/api/employees'

export default {
  name: 'AddDepts',

  // import引入的组件需要注入到对象中才能使用
  components: {},

  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },

  data() {
    // 这里存放数据
    // 检查部门名称校验规则
    const checkNameReg = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        isRepeat = depts.filter(item => item.id !== this.formData.id && item.pid === this.treeNode.pid).some(item => item.name === value)
      } else {
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      isRepeat ? callback(new Error(`${value}已经存在`)) : callback()
    }
    // 检查部门编码校验规则
    const checkCodeReg = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        isRepeat = depts.some(item => { item.id !== this.formData.id && item.code === value && value })
      } else {
        isRepeat = depts.some(item => item.code === value && value)
      }
      isRepeat ? callback(new Error(`${value}编码已经存在`)) : callback()
    }
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
        code: [{ required: true, message: '部门编码必填', trigger: 'blur' }, { min: 2, max: 50, message: '部门编码长度必须为2-50个字符', trigger: 'blur' }, { trigger: 'blur', validator: checkCodeReg }],
        introduce: [{
          required: true, message: '部门描述必填', trigger: 'blur'
        },
        {
          min: 3, max: 300, message: '部门描述长度必须为3-300个字符', trigger: 'blur'
        }],
        manager: [{
          required: true, message: '部门负责人必填', trigger: 'blur'
        }],
        // 部门名称 同级部门下不能出现相同的部门
        name: [{
          required: true, message: '部门名称必填', trigger: 'blur'
        },
        {
          min: 2, max: 50, message: '部门名称长度必须为2-50个字符', trigger: 'blur'
        },
        { trigger: 'blur', validator: checkNameReg }]
      },
      people: []
    }
  },

  // 监听属性 类似于data概念
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '添加子部门'
    }
  },

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
  methods: {
    async getSimpleUserInfo() {
      this.people = await getSimpleUserInfo()
    },
    async getSimpleDepartment(id) {
      this.formData = await getSimpleDepartment(id)
    },
    // 添加子部门接口方法
    addDepartmants() {
      this.$refs.repartForm.validate(async isOk => {
        if (isOk) {
          if (this.formData.id) {
            await updateDepartment(this.formData)
          } else {
            await addDepartmants({ ...this.formData, pid: this.treeNode.id })
          }
          // 添加成功之后通知父组件更新数据
          this.$emit('addDepart')
          this.$emit('update:isShowDialog', false)
        }
      })
    },
    closeDialog() {
      this.formData = {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        manager: '', // 部门负责人
        name: '' // 部门名称
      }
      this.$refs.repartForm.resetFields()
      this.$emit('update:isShowDialog', false)
    }
  }
}
</script>

<style scoped>

</style>
