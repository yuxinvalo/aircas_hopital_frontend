<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-tabs type="card" @tab-click="handlePanelClick">
      <el-tab-pane label="正在报警" name="alarming" :key="'alarming'">
      <div class="search" style="margin-top:5em;">
        <el-form :inline="true" class="demo-form-inline">
          <el-input style="width:300px;" v-model="searchData" placeholder="Search"></el-input>
          <el-button type="info" @click="searchNurse" icon="el-icon-search">查询负责人</el-button>
        </el-form>
      </div>

      <section class="monitoringDevice">
        <div class="table">
          <el-table height="700" style="width: 100%" :row-class-name="tableRowStyle"
                    :data="searchStatus" v-loading="statusLoading">
            <el-table-column prop="room" label="房间号" align="center" sortable :sort-orders="['ascending', 'descending']"></el-table-column>
            <el-table-column prop="bed_num" label="床号" align="center" sortable :sort-orders="['ascending', 'descending']"></el-table-column>
            <el-table-column prop="id_device.id" label="设备名" align="center"></el-table-column>
            <el-table-column prop="id_device.frequency" label="滴速" align="center" sortable :sort-orders="['ascending', 'descending']"></el-table-column>
            <el-table-column prop="id_device.progress" label="进度" align="center" sortable :sort-orders="['ascending', 'descending']"></el-table-column>
            <el-table-column prop="id_device.power" label="电量" align="center" sortable :sort-orders="['ascending', 'descending']"></el-table-column>
            <el-table-column prop="id_user.name" label="负责人" align="center"></el-table-column>
          </el-table>

          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="page.currPage" :page-sizes="[20, 30, 40, 50]"
                           :page-size="page.size"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="page.total"> </el-pagination>
          </div>
        </div>
      </section>
    </el-tab-pane>
    <el-tab-pane label="全部设备" name="allDevice" :key="'allDevice'"></el-tab-pane>
  </el-tabs>
  </div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .danger-row {
    background: #F56C6C;
    color: black;
  }
</style>
<script>
import { getUserDeviceStatus, getAlarmDevice } from '../api/api.js'

export default {
  name: 'HelloDevice',
  data () {
    return {
      msg: 'Welcome to HelloDevice Nurse Friend',
      searchData: '',
      deviceStatus: [],
      searchStatus: [],
      statusLoading: false,
      timer: '',
      page: {
        currPage: 1,
        size: 20,
        total: 1
      },
      activeName: 'alarming'
    }
  },

  methods: {
    getUserDeviceStatus () {
      let self = this
      self.statusLoading = true
      getAlarmDevice({}).then(response => {
        if (!response) {
          alert('没有数据!')
          return
        }
        self.statusLoading = false
        self.deviceStatus = response
        self.searchStatus = self.deviceStatus.slice(0, 20)
        this.page.total = this.deviceStatus.length
      })
    },

    searchNurse () {
      if (!this.deviceStatus) {
        return
      }
      if (this.searchData === '') {
        this.searchStatus = this.deviceStatus
      }
      this.searchStatus = []
      this.deviceStatus.forEach(item => {
        if (item.id_user.name.indexOf(this.searchData) !== -1) {
          this.searchStatus.push(item)
          this.page.total = this.searchStatus.length
        }
      })
    },

    tableRowStyle ({ row, rowIndex }) {
      if (row.id_device.power < 10) {
        return 'warning-row'
      }
      if (row.id_device.alarm) {
        return 'danger-row'
      }
    },

    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background-color:#666;font-size:25px;color:white;'
    },

    handleSizeChange: function (size) {
      this.page.size = size
      this.searchStatus = this.deviceStatus.slice((this.page.currentPage - 1) * this.page.size, (this.page.currentPage * this.page.size))
    },

    handleCurrentChange: function (currentPage) {
      this.page.currentPage = currentPage
      this.searchStatus = this.deviceStatus.slice((currentPage - 1) * this.page.size, currentPage * this.page.size)
    },

    handlePanelClick (tab, event) {
      console.log(tab, event)
    }
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  mounted () {
    this.getUserDeviceStatus()
    this.timer = setInterval(this.getUserDeviceStatus, 300000)
  },

  watch: {
    searchData: function (newSearchData, oldSearchData) {
      if (this.searchData === '') {
        this.searchStatus = this.deviceStatus
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.table {
  margin-top: 30px;
  font-size: large;
}

.el-pagination {
    margin-top:15px;
    margin-bottom: 25px;
    text-align: center;
}

</style>
