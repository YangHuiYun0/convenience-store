<template>
  <div>
    <HeadTop/>
    <el-card>
      <div class="stand">
        <el-button type="success" @click="goToCheckstand()" >收银台
        </el-button>
      </div>
      <header class="section_title">数据统计
      </header>
      <el-row>
        <el-col :span="2">&nbsp;&nbsp;</el-col>
        <el-col :span="7">
          <el-card class="box-card">
            <div slot="header" class="clearfix clear">
              <i class="el-icon-s-goods" style="color:#4169E1"></i>
              <span>销售金额</span>
            </div>
            <div class="text item">
              <p>今天 : {{salesInfo.today ? salesInfo.today.total:0}} 元</p>
              <p>昨天 : {{salesInfo.yesterday ? salesInfo.yesterday.total:0}} 元</p>
              <p>本周 : {{salesInfo.week ? salesInfo.week.total:0}} 元</p>
              <p>本月 : {{salesInfo.month ? salesInfo.month.total:0}} 元</p>
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
              <p>今天 : {{memberInfo.today ? memberInfo.today.total:0}} 位</p>
              <p>昨天 : {{memberInfo.yesterday ? memberInfo.yesterday.total:0}} 位</p>
              <p>本周 : {{memberInfo.week ? memberInfo.week.total:0}} 位</p>
              <p>本月 : {{memberInfo.month ? memberInfo.month.total:0}} 位</p>
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
              <p>今天 : {{salesInfo.today ? salesInfo.today.num:0}} 笔</p>
              <p>昨天 : {{salesInfo.yesterday ? salesInfo.yesterday.num:0}} 笔</p>
              <p>本周 : {{salesInfo.week ? salesInfo.week.num:0}} 笔</p>
              <p>本月 : {{salesInfo.month ? salesInfo.month.num:0}} 笔</p>
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
    import { getHomeInfo,getEchartsData } from "@/api/home";
export default {
  data(){
    return{
      memberInfo:{},
      salesInfo:{},
      dates:[],
      userNums:[],
      amounts:[],
      nums:[],
    }
  },
  mounted(){
        this.myChart = echarts.init(document.getElementById('chart'));
    
        const that = this;
    getEchartsData().then(res =>{
      if(res && res.code === 200){
        console.log('图形',res);
        res.data.forEach(item => {
          that.dates.unshift(item.date);
          that.userNums.unshift(item.userNum);
          that.amounts.unshift(item.amount);
          that.nums.unshift(item.num);
        });
        that.initData();
      }
    })

    this.getDataInfo();

  },
  components: {
    HeadTop,
  },
  methods:{
    getDataInfo(){
      const that = this;
      // 1查询销量
      getHomeInfo({
        queryType:'1'
      }).then(res =>{
        console.log('销量',res);
        if(res && res.code === 200){
          that.salesInfo = res.data;
        }
      });
      // 2查询会员
      getHomeInfo({
        queryType:'2'
      }).then(res =>{
        console.log('会员',res);
        if(res && res.code === 200){
          that.memberInfo = res.data;
        }
      });
    },
    initData(){
      // 定义图表颜色
      const colors = ['#5793f3', '#675bba', '#d14a61'];
      const option = {
                    color: colors,
                    title: { text: '近七天走势图',},
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
                        data:this.dates
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
                            name:'会员数量',
                            type:'line',
                            data:this.userNums,

                        },
                        {
                            name:'订单数量',
                            type:'line',
                            data:this.nums,
                        },
                        {
                            name:'销售金额',
                            type:'line',
                            data:this.amounts,
                        }
                    ]
                  };
      this.myChart.setOption(option);
    },
    goToCheckstand(){
      this.$router.push({
          path: '/sales-manage-checkstand',
        });
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
  .stand{
    text-align: right;
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
