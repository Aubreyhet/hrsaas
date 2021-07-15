<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger" @click="exportData">excel导出</el-button>
          <el-button size="small" type="primary" @click="showAddDialog=true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" border :data="list">
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatterFn" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="obj">
              {{
                obj.row.timeOfEntry | formatDate
              }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployees(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination :total="page.total" :current-page="page.page" :page-size="page.size" layout="prev, pager, next" @current-change="changePage" />
        </el-row>
      </el-card>
    </div>
    <!-- 显示添加员工的弹框 -->
    <AddEmployee :show-add-dialog.sync="showAddDialog" />
  </div>
</template>

<script>
import { getEmployees, delEmployeesById } from '@/api/employees'
import EmployeesEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      list: [],
      page: {
        total: 0,
        page: 1,
        size: 10
      },
      loading: false,
      showAddDialog: false
    }
  },
  created() {
    this.getEmployees()
  },
  methods: {
    async getEmployees() {
      this.loading = true
      const { total, rows } = await getEmployees(this.page)
      console.log(rows)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage(val) {
      this.page.page = val
      this.getEmployees()
    },
    // 聘用形式的数据格式化
    formatterFn(row, column, cellValue, index) {
      const res = EmployeesEnum.hireType.find(item => item.id === cellValue)
      return res ? res.value : '未知'
    },
    // 删除员工方法
    async delEmployees(id) {
      try {
        await this.$confirm('确定删除该数据?')
        await delEmployeesById(id)
        this.$message.success('删除数据成功')
        this.getEmployees()
      } catch (err) {
        console.log(err)
      }
    },
    // 导出excel文件
    exportData() {
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployees({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows)
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工资料表'
        })
      })
    },
    // 将数组包对象的数据转换成数组套数组的方法
    formatJson(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'formOfEmployment') {
            const res = EmployeesEnum.hireType.find(obj => obj.id === item[headers[key]])
            return res ? res.value : '未知'
          }
          return item[headers[key]]
        })
      })
    }
  }
}
</script>

<style>

</style>
