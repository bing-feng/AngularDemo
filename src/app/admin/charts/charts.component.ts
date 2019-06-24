import { Component, OnInit } from '@angular/core';
import { Config } from './../../common/config';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  option_line: any;
  option_category: any;
  option_pie: any;
  echart_theme = new Config().echartTheme();

  constructor() { }

  ngOnInit() {
    this.option_line =  {
      title : {
          text: '未来一周气温变化',
          subtext: '纯属虚构'
      },
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:['最高气温','最低气温']
      },
      toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLabel : {
                  formatter: '{value} °C'
              }
          }
      ],
      series : [
          {
              name:'最高气温',
              type:'line',
              data:[11, 11, 15, 13, 12, 13, 10],
              markPoint : {
                  data : [
                      {type : 'max', name: '最大值'},
                      {type : 'min', name: '最小值'}
                  ]
              },
              markLine : {
                  data : [
                      {type : 'average', name: '平均值'}
                  ]
              }
          },
          {
              name:'最低气温',
              type:'line',
              data:[1, -2, 2, 5, 3, 2, 0],
              markPoint : {
                  data : [
                      {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                  ]
              },
              markLine : {
                  data : [
                      {type : 'average', name : '平均值'}
                  ]
              }
          }
      ]
    };


    this.option_category = {
      legend: {},
      tooltip: {},
      dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
              {product: '奶茶', '2015': 43.3, '2016': 85.8, '2017': 93.7},
              {product: '果粒橙', '2015': 83.1, '2016': 73.4, '2017': 55.1},
              {product: '可口可乐', '2015': 86.4, '2016': 65.2, '2017': 82.5},
              {product: '冰红茶', '2015': 72.4, '2016': 53.9, '2017': 39.1}
          ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
      ]
    };


    this.option_pie = {
      title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
      ]
    };

  }

}
