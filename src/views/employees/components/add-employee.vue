<template>
  <el-dialog title="新增员工" :visible="showAddDialog" @close="btnCancel">
    <el-form ref="formData" label-width="140px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择聘用形式">
          <el-option v-for="item in EmployeesEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree v-if="showTree" v-loading="isLoading" :data="treeData" :props="{ label: 'name'}" default-expand-all="true" @node-click="selectNode" />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="small" @click="btnCommit">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTree } from '@/utils'
import EmployeesEnum from '@/api/constant/employees'
import { addEmployees } from '@/api/employees'
export default {
  props: {
    showAddDialog: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      EmployeesEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [],
      showTree: false,
      isLoading: false
    }
  },
  methods: {
    async getDepartments() {
      this.showTree = true
      this.isLoading = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTree(depts, '')
      this.isLoading = false
    },
    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    // 点击确定提交数据
    async btnCommit() {
      try {
        await this.$refs.formData.validate()
        // 校验成功之后调用添加员工的api
        await addEmployees(this.formData)
        // 添加成功之后通知父组件更新数据 有就调
        this.$parent.getEmployees && this.$parent.getEmployees()
        // 然后调用父组件的属性 关闭弹层
        this.$parent.showAddDialog = false
      } catch (err) {
        console.log(err)
      }
    },
    // 点击取消和点击x号关闭弹层方法
    btnCancel() {
      this.$emit('update:showAddDialog', false)
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.formData.resetField()
    }
  }
}
</script>

<style>

</style>
