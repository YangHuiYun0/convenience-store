<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
    </div>
  </div>
</template>

<script>
import HeadTop from "../../components/headTop";
export default {
  components: {
    HeadTop,
  },
}
</script>

<style lang="scss" scoped>
 .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #76b852;
    color: #FFF;
  }
  .el-table__header-wrapper thead div {
    background-color: 	#3CB371;
  }
  .el-table th {
    background-color: #3CB371;
  }
  .el-table thead{
    color: #363636;
  }
</style>