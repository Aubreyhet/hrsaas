<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <el-button slot="after" type="primary" size="small" @click="addPermiss(1, '0')">添加权限</el-button>
      </page-tools>
      <!-- 表格 -->
      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button v-if="row.type === 1" type="text" align="center" @click="addPermiss(2, row.id)">添加</el-button>
            <el-button type="text" align="center" @click="editPermiss(row.id)">编辑</el-button>
            <el-button type="text" align="center" @click="delPermiss(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增编辑按钮的弹层 -->
    <el-dialog title="新增编辑" :visible="isShowEditDialog" @close="btnCancel">
      <el-form ref="permissForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" @click="sendPermiss">确定</el-button>
          <el-button @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, delPermission, getPermissionDetail, updatePermission, addPermission } from '@/api/permisson'
import { tranListToTree } from '@/utils/index'
export default {
  data() {
    return {
      list: [], // 权限列表数据
      isShowEditDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限列表
    async getPermissionList() {
      this.list = tranListToTree(await getPermissionList(), '0')
    },
    // 点击新增编辑按钮方法
    addPermiss(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.isShowEditDialog = true
    },
    // 点击编辑按钮
    async editPermiss(id) {
      // 获取权限相关信息回写到表单
      this.formData = await getPermissionDetail(id)
      this.isShowEditDialog = true
    },
    // 点击删除按钮方法的定义
    delPermiss(id) {
      this.$confirm('确定删除数据吗？').then(() => {
        delPermission(id)
      }).then(() => {
        this.$message.success('删除数据成功')
        this.getPermissionList()
      })
    },
    // 点击确定提交按钮
    sendPermiss() {
      // 先校验数据
      this.$refs.permissForm.validate().then(() => {
        // 调用新增或者更新接口
        // 数据中有id 说明是更新数据
        if (this.formData.id) {
          return updatePermission(this.formData)
        }
        //  否则就是新增接口
        return addPermission(this.formData)
      }).then(() => {
        // 提示消息等
        this.$message.success('新增数据成功')
        this.getPermissionList()
        this.isShowEditDialog = false
      })
    },
    // 点击取消关闭弹窗按钮
    btnCancel() {
      // 关闭碳层
      this.isShowEditDialog = false
      // 重置表单
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      // 重置校验规则
      this.$refs.permissForm.resetFields()
    }
  }

}
</script>

<style>

</style>
