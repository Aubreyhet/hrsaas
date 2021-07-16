<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left:120px; margin-top:30px">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码" prop="password2">
                <el-input v-model="userInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserInfo">确定</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <component :is="userInfoCom" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <component :is="jobInfoCom" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { saveUserDetailById } from '@/api/employees'
import { getUserAllInfo } from '@/api/user'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userInfoCom: 'UserInfo',
      jobInfoCom: 'JobInfo',
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password2: [{ required: true, trigger: 'blur', message: '密码不能为空' }, { min: 6, max: 16, trigger: 'blur', message: '密码长度为6-16位' }]
      }
    }
  },
  created() {
    this.getUserAllInfo()
  },
  methods: {
    async getUserAllInfo() {
      this.userInfo = await getUserAllInfo(this.userId)
    },
    async saveUserInfo() {
      try {
        this.$refs.userForm.validate()
        // 数据校验成功之后
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('数据更改成功')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
