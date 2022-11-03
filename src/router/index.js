import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: '/home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: "首页", icon: "el-icon-position" },
    component: Home,
    meta: {
      requireAuth: false
    },
    children:[
      {
        path:'/population',
        name:'人口感知',
        meta: { title: "人口感知", icon: "wlsys-renkou" },
        component:()=>import('@/views/population/index.vue'),
        children:[
          {
            path:'/population/queryMap',
            meta: { title: "人口画像查询", icon: "el-icon-position" },
            component:()=>import('@/views/population/QueryMap.vue'),
          },
          {
            path:'/population/graduateMap',
            meta: { title: "大学生人口画像", icon: "el-icon-position" },
            component:()=>import('@/views/population/GraduateMap.vue'),
          },
          {
            path:'/population/timeSharding',
            meta: { title: "分时人口统计", icon: "el-icon-position" },
            component:()=>import('@/views/population/TimeSharding.vue'),
          },
          {
            path:'/population/CountyInfo',
            meta: { title: "村界人口概览", icon: "el-icon-position" },
            component:()=>import('@/views/population/CountyInfo.vue'),
          },
          {
            path:'/population/bigBay',
            meta: { title: "大湾区人口OD", icon: "el-icon-position" },
            component:()=>import('@/views/population/BigBay.vue'),
          },
          {
            path:'/population/guangdongOD',
            meta: { title: "市县级人口OD", icon: "el-icon-position" },
            component:()=>import('@/views/population/GuangdongOD.vue'),
          },
          {
            path:'/population/transportationOD',
            meta: { title: "交通小区人口OD", icon: "el-icon-position" },
            component:()=>import('@/views/population/TransportationOD.vue'),
          },
          {
            path:'/population/census',
            meta: { title: "人口普查", icon: "el-icon-position" },
            component:()=>import('@/views/population/Census.vue'),
          },
          {
            path:'/population/changzhu_pop',
            meta: { title: "常住人口", icon: "el-icon-position" },
            component:()=>import('@/views/population/changzhu/Changzhu.vue'),
          },
          {
            path:'/population/changzhu_vary',
            meta: { title: "常住人口变化", icon: "el-icon-position" },
            component:()=>import('@/views/population/changzhuVary/ChangzhuVary.vue'),
          },
          {
            path:'/population/labor_pop',
            meta: { title: "驻留劳动人口", icon: "el-icon-position" },
            component:()=>import('@/views/population/laborPop/LaborPop.vue'),
          },
          {
            path:'/population/labor_vary',
            meta: { title: "驻留劳动人口变化", icon: "el-icon-position" },
            component:()=>import('@/views/population/laborPopVary/LaborPopVary.vue'),
          },
          {
            path:'/population/liushi_hp',
            meta: { title: "黄埔人口流失", icon: "el-icon-position" },
            component:()=>import('@/views/population/LiushiPopHP.vue'),
          },
        ]
      },
      {
        path:'/transportation',
        name:'交通特征',
        meta: { title: "交通特征", icon: "wlsys-jiaotong" },
        component:()=>import('@/views/transportation/index.vue'),
        children:[
          {
            path:'/transportation/countyTruck',
            meta: { title: "市县级货车OD", icon: "el-icon-position" },
            component:()=>import('@/views/transportation/CountyTruck.vue'),
          },
          {
            path:'/transportation/trafficAreaOD',
            meta: { title: "交通小区货车OD", icon: "el-icon-position" },
            component:()=>import('@/views/transportation/TrafficAreaOD.vue'),
          },
          {
            path:'/transportation/timeCircle',
            meta: { title: "等时圈分析", icon: "el-icon-position" },
            component:()=>import('@/views/transportation/TimeCircle.vue'),
          },
          {
            path:'/transportation/mobileTruck',
            meta: { title: "摩拜单车轨迹", icon: "el-icon-position" },
            component:()=>import('@/views/transportation/MobileTrack.vue'),
          },
          {
            path:'/transportation/gzhuoyunOD',
            meta: { title: "广州货运OD", icon: "el-icon-position" },
            component:()=>import('@/views/transportation/GZhuoyunOD.vue'),
          },
          {
            path:'/transportation/cargoFlowOD',
            meta: { title: "全省货流OD", icon: "el-icon-position" },
            component:()=>import('@/views/transportation/CargoFlowOD.vue'),
          },
          {
            path:'/transportation/passengerOD',
            meta: { title: "全省客流OD", icon: "el-icon-position" },
            component:()=>import('@/views/transportation/PassengerOD.vue'),
          },
          {
            path:'/transportation/truckLogistics',
            meta: { title: "货车物流OD分布", icon: "el-icon-position" },
            component:()=>import('@/views/transportation/TruckLogistics.vue'),
          },
          {
            path:'/transportation/roadTraffic',
            meta: { title: "路段流量", icon: "el-icon-position" },
            component:()=>import('@/views/transportation/RoadTraffic.vue'),
          },
        ]
      },
      {
        path: '/industry',
        name: '产业信息',
        meta: { title: "产业信息", icon: "wlsys-qiyechaxun" },
        component: () => import('@/views/industry/index.vue'),
        children:[
          {
            path: '/industry/gyy_huaxiang',
            meta: { title: "工业园画像", icon: "el-icon-position" },
            component: () => import('@/views/industry/Gongyeyuan.vue'),
          },
          {
            path: '/industry/qiye',
            meta: { title: "企业概况", icon: "el-icon-position" },
            component: () => import('@/views/industry/Qiye.vue'),
          },
          {
            path: '/industry/dynamic',
            meta: { title: "企业动态", icon: "el-icon-position" },
            component: () => import('@/views/industry/dynamic/Dynamic.vue'),
          },
          // {
          //   path: '/industry/enterprise',
          //   meta: { title: "高新企业", icon: "el-icon-position" },
          //   component: () => import('@/views/industry/Enterprise.vue'),
          // },
          {
            path:'/industry/carInduChain',
            meta: { title: "汽车产业链", icon: "el-icon-position" },
            component:()=>import('@/views/industry/CarInduChain.vue'),
          },
          {
            path:'/industry/industry',
            meta: { title: "产业地块", icon: "el-icon-position" },
            component:()=>import('@/views/industry/Industry.vue'),
          },
        ]
      },
      {
        path:'/publicInfo',
        name:'基础设施',
        meta: { title: "基础设施", icon: "wlsys-nav_jijiandangan" },
        component:()=>import('@/views/publicInfo/index.vue'),
        children:[
          {
            path:'/publicInfo/roadInfo',
            meta: { title: "道路设施", icon: "el-icon-position" },
            component:()=>import('@/views/publicInfo/RoadInfo.vue'),
          },
          {
            path:'/publicInfo/eduInfo',
            meta: { title: "教育设施", icon: "el-icon-position" },
            component:()=>import('@/views/publicInfo/EduInfo.vue'),
          },
          {
            path:'/publicInfo/medInfo',
            meta: { title: "医疗设施", icon: "el-icon-position" },
            component:()=>import('@/views/publicInfo/MedInfo.vue'),
          },
          {
            path:'/publicInfo/civInfo',
            meta: { title: "民政设施", icon: "el-icon-position" },
            component:()=>import('@/views/publicInfo/CivInfo.vue'),
          },
          {
            path:'/publicInfo/palInfo',
            meta: { title: "政法设施", icon: "el-icon-position" },
            component:()=>import('@/views/publicInfo/PalInfo.vue'),
          },
          {
            path:'/publicInfo/culInfo',
            meta: { title: "文化设施", icon: "el-icon-position" },
            component:()=>import('@/views/publicInfo/CulInfo.vue'),
          },
          {
            path:'/publicInfo/sportInfo',
            meta: { title: "体育设施", icon: "el-icon-position" },
            component:()=>import('@/views/publicInfo/SportInfo.vue'),
          },
          {
            path:'/publicInfo/marketInfo',
            meta: { title: "批发市场", icon: "el-icon-position" },
            component:()=>import('@/views/publicInfo/MarketInfo.vue'),
          },
        ]
      },
      {
        path:'/landUse',
        name:'用地信息',
        meta: { title: "用地信息", icon: "wlsys-tudi" },
        component:()=>import('@/views/landUse/index.vue'),
        children:[
          {
            path:'/landUse/timeLand',
            meta: { title: "土地利用", icon: "el-icon-position" },
            component:()=>import('@/views/landUse/timeLand/TimesLand.vue'),
          },
          {
            path:'/landUse/jiansheLand',
            meta: { title: "建设用地", icon: "el-icon-position" },
            component:()=>import('@/views/landUse/jiansheLand/JiansheLand.vue'),
          },
          {
            path:'/landUse/nightLight',
            meta: { title: "夜间灯光", icon: "el-icon-position" },
            component:()=>import('@/views/landUse/NightLight.vue'),
          },
          {
            path:'/landUse/gd_night',
            meta: { title: "灯光增量", icon: "el-icon-position" },
            component:()=>import('@/views/landUse/GdNight.vue'),
          },
          {
            path:'/landUse/times_nightLight',
            meta: { title: "时序灯光", icon: "el-icon-position" },
            component:()=>import('@/views/landUse/timesNight/TimesNight.vue'),
          },
        ]
      },
      {
        path:'/houseInfo',
        name:'房屋信息',
        meta: { title: "房屋信息", icon: "wlsys-icon-fangwu" },
        component:()=>import('@/views/houseInfo/index.vue'),
        children:[
          {
            path:'/houseInfo/building3d',
            meta: { title: "城市建筑面", icon: "el-icon-position" },
            component:()=>import('@/views/houseInfo/Building3d.vue'),
          },
          {
            path:'/houseInfo/fangjia',
            meta: { title: "房价", icon: "el-icon-position" },
            component:()=>import('@/views/houseInfo/Fangjia.vue'),
          },
          {
            path:'/houseInfo/ershoufang',
            meta: { title: "二手房", icon: "el-icon-position" },
            component:()=>import('@/views/houseInfo/Ershoufang.vue'),
          },
        ]
      },
      {
        path:'/wuzhangai',
        name:'无障碍',
        meta: { title: "无障碍", icon: "el-icon-guide" },
        component:()=>import('@/views/wuzhangai/index.vue'),
        children:[
          {
            path:'/houseInfo/canjiren',
            meta: { title: "残疾人", icon: "el-icon-position" },
            component:()=>import('@/views/wuzhangai/Canjiren.vue'),
          },
          {
            path:'/houseInfo/laolinghua',
            meta: { title: "老龄化", icon: "el-icon-position" },
            component:()=>import('@/views/wuzhangai/Laolinghua.vue'),
          },
          {
            path:'/houseInfo/children',
            meta: { title: "儿童友好建设区", icon: "el-icon-position" },
            component:()=>import('@/views/wuzhangai/Children.vue'),
          },
        ]
      },
      
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/dataPanel',
    name:'DataPanel',
    component:() => import("@/views/dataPanel/DataPanel.vue"),
  }

]

const router = new VueRouter({
  // mode:'history',
  routes
})

export default router
