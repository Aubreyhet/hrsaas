<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height:60px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="addRole"
              >
                新增角色
              </el-button>
            </el-row>
            <el-table
              border
              style="width: 100%"
              :data="list"
            >
              <el-table-column
                label="序号"
                width="120"
                type="index"
                align="center"
                header-align="left"
              />
              <el-table-column
                label="姓名"
                width="240"
                prop="name"
                align="center"
                header-align="left"
              />
              <el-table-column
                label="描述"
                prop="description"
                align="center"
                header-align="left"
              />
              <el-table-column
                label="操作"
              >
                <template slot-scope="{ row }">
                  <el-button size="small" type="success" @click="distributionPerm(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRoleById(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height:60px">
              <el-pagination
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <el-alert
              title="消息提示的文案"
              type="info"
              :closable="false"
              :show-icon="true"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formData.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 编辑角色弹层 -->
    <el-dialog title="编辑角色" :visible="showEditDialog" @close="btnCancel">
      <el-form ref="roleForm" :model="roleFormData" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model.trim="roleFormData.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleFormData.description" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="editOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 给角色分配权限弹框 -->
    <el-dialog title="分配权限" :visible="isShowdistributionPerm" @close="btnCanceldistribution">
      <!-- 上边是树形解构 -->
      <el-tree
        ref="perTree"
        :data="permList"
        :props="defaultProps"
        :default-expand-all="true"
        :check-strictly="true"
        :show-checkbox="true"
        :default-checked-keys="defaultRoleArr"
        node-key="id"
      />
      <!-- 下边是俩按钮 -->
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="samll" type="primary" @click="determinePer">确定</el-button>
          <el-button size="samll" @click="btnCanceldistribution">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, delRoleById, getRoleById, editRoleById, addRole, assignPrem } from '@/api/setting'
import { getPermissionList } from '@/api/permisson'
import { tranListToTree } from '@/utils/index'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [],
      permList: [],
      isShowdistributionPerm: false,
      defaultProps: {
        label: 'name'
      },
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      formData: {},
      showEditDialog: false,
      roleFormData: {
        name: '',
        description: ''
      },
      rules: { name: [{ required: true, message: '名称必填', trigger: 'blur' }] },
      roleId: null,
      defaultRoleArr: []
    }
  },
  computed: {
    ...mapGetters['companyId']
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.total = total
      this.list = rows
    },
    changePage(val) {
      this.page.page = val
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async delRoleById(id) {
      try {
        await this.$confirm('确定删除该角色？')
        await delRoleById(id)
        this.getRoleList()
        this.$message.success('删除数据成功')
      } catch (err) {
        console.log(err)
      }
    },
    btnCancel() {
      this.showEditDialog = false
      this.$refs.roleForm.resetFields()
      this.roleFormData = {
        name: '',
        describe: ''
      }
    },
    async editRole(id) {
      this.roleFormData = await getRoleById(id)
      this.showEditDialog = true
      console.log(this.roleFormData)
    },
    async editOk() {
      try {
        await this.$refs.roleForm.validate()
        // 校验成功之后调用接口 如果有id 调用编辑 否则调用新增
        if (this.roleFormData.id) {
          await editRoleById(this.roleFormData)
        } else {
          await addRole(this.roleFormData)
        }
        this.showEditDialog = false
        this.$refs.roleForm.resetFields()
        this.getRoleList()
        this.$message.success('操作数据成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 点击新增按钮
    addRole() {
      this.showEditDialog = true
    },
    // 给角色分配权限 点击显示弹框
    async distributionPerm(id) {
      this.roleId = id
      // 先获取权限列表数据 拿过来之后是数组形式的 转换成树形结构
      this.permList = tranListToTree(await getPermissionList(), '0')
      // 获取角色对应的权限回写进去
      const { permIds } = await getRoleById(id)
      this.defaultRoleArr = permIds
      // 打开弹窗
      this.isShowdistributionPerm = true
    },
    //  点击确定按钮发起请求
    async determinePer() {
      await assignPrem({ id: this.roleId, permIds: this.$refs.perTree.getCheckedKeys() })
      this.$message.success('分配权限成功')
      this.isShowdistributionPerm = false
    },
    // 点击取消分配权限按钮方法
    btnCanceldistribution() {
      this.defaultRoleArr = []
      this.isShowdistributionPerm = false
    }
  }
}
</script>

<style>

</style>
