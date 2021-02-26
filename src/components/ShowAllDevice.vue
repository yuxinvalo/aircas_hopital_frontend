<template>
  <div class="allDevice">
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
  </div>
</template>
