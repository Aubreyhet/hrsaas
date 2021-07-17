<template>
  <el-dialog title="角色分配" :visible="isShowDialog" @close="btnClose">
    <el-checkbox-group v-model="roleList">
      <!-- 选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary" @click="setRolesFn">确定</el-button>
        <el-button size="small" @click="btnClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserAllInfo } from '@/api/user'
import { setRoles } from '@/api/employees'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [], // 权限列表
      roleList: [] // 已经选择权限列表
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取权限列表方法
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    // 获取用户已有权限方法
    async getUserRole(id) {
      const { roleIds } = await getUserAllInfo(id)
      this.roleList = roleIds
    },
    // 关闭弹层
    btnClose() {
      this.$emit('update:isShowDialog', false)
      this.roleList = []
    },
    // 分配角色
    async setRolesFn() {
      await setRoles({ id: this.userId, roleIds: this.roleList })
      this.$emit('update:isShowDialog', false)
      this.roleList = []
    }
  }
}
</script>

<style>

</style>
