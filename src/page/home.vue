<template>
  <div>
    <HeadTop/>
    <el-card>
      <header class="section_title">数据统计</header>
      <el-row>
        <el-col :span="2">&nbsp;&nbsp;</el-col>
        <el-col :span="7">
          <el-card class="box-card">
            <div slot="header" class="clearfix clear">
              <i class="el-icon-s-goods" style="color:#4169E1"></i>
              <span>销售金额</span>
            </div>
            <div class="text item">
              <p>今天</p>
              <p>昨天</p>
              <p>本周</p>
              <p>本月</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card class="box-card">
            <div slot="header" class="clearfix clear">
              <i class="el-icon-s-custom" style="color:	#8B658B"></i>
              <span>会员数量</span>
            </div>
            <div class="text item">
              <p>今天</p>
              <p>昨天</p>
              <p>本周</p>
              <p>本月</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix clear">
               <i class="el-icon-s-order" style="color:	#FF0000"></i>
              <span>订单数量</span>
            </div>
            <div class="text item">
              <p>今天</p>
              <p>昨天</p>
              <p>本周</p>
              <p>本月</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div class="chart">
        <div id="chart" class="" style="width: 90%;height:320px;"></div>
      </div> 
    </el-card>
  </div>
</template>

<script>
    import HeadTop from "../components/headTop";
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
export default {
  mounted(){
    this.myChart = echarts.init(document.getElementById('chart'));
    this.initData();
  },
  components: {
    HeadTop,
  },
  methods:{
    initData(){
      // 定义图表颜色
      const colors = ['#5793f3', '#675bba', '#d14a61'];
      const option = {
                    color: colors,
                    title: { text: '走势图',},
                    tooltip: {//配置提示框
                      trigger: 'axis'
                    },
                    legend: { //图例
                      data:['销售金额', '会员数量', '订单数量']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                      feature: {
                          saveAsImage: {}
                      }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: ['今天','昨天','本周','本月']
                    },
                    yAxis: [
                      {
                        type: 'value',
                        name: '数量',
                        min: 0,
                        max: 200,
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                      },
                    ],
                     series: [
                        {
                            name:'新注册用户',
                            type:'line',
                            data:[30,23,56,9],

                        },
                        {
                            name:'新增订单',
                            type:'line',
                            data:[50,63,16,12],
                        },
                        {
                            name:'新增管理员',
                            type:'line',
                            data:[10,40,70,15],
                        }
                    ]
                  };
      this.myChart.setOption(option);
    },
  }
}
</script>

<style lang='scss' scoped>
  .section_title{
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
  }
   .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .clear{
    font-size: 20px;
    font-weight: 600;
  }
  .box-card {
    width: 240px;
  }
  .chart{
    display: flex;
    justify-content: center;
  }
</style>
