<template>
  <div class="work">
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width:100px" @change="changeDate">
        <el-option v-for="item in yearList" :key="item" :value="`${item}`" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width:60px; margin-left: 10px" @change="changeDate">
        <el-option v-for="item in 12" :key="item" :value="`${item}`" />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="{ date, data}" class="content">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      yearList: [],
      currentYear: null,
      currentMonth: null,
      currentDate: null
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    this.yearList = Array.from(Array(10), (i, v) => this.currentYear + v - 5)
    this.changeDate()
  },
  methods: {
    isWeek(value) {
      return value.getDay() === 6 || value.getDay() === 0
    },
    changeDate() {
      const year = this.currentYear
      const month = this.currentMonth
      this.currentDate = new Date(`${year}-${month}-1`)
    }
  }
}
</script>

<style scoped>
.work /deep/ .el-calendar-day {
  height:  auto;
 }
 .work  /deep/ .el-calendar-table__row td,.work  /deep/ .el-calendar-table tr td:first-child, .work  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
.work  /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 .work /deep/ .el-calendar__header {
   display: none
 }
</style>
