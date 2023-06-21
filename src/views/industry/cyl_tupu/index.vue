<template>
  <div class="flex pages">
    <div class="flex shangyou">
      <div class="flex title">
      </div>
      <div class="flex content">
        <a-list :grid="{ gutter: 20, column: 4 }" :data-source="shangyou">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card :title="item.title">
              <p
                v-for="it in item.children"
                :key="it.key"
                @click="getkey($event, it.key)"
              >
                {{ it.name }}
              </p>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <div class="flex zhongyou">
      <div class="flex title">
      </div>
      <div class="flex content">
        <a-list :grid="{ column: 1 }" :data-source="zhongyou">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card :title="item.title">
              <p v-for="it in item.children" :key="it.key">{{ it.name }}</p>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <div class="flex xiayou">
      <div class="flex title">
      </div>
      <div class="flex content">
        <a-list :grid="{ gutter: 20, column: 2 }" :data-source="xiayou">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card :title="item.title">
              <p v-for="it in item.children" :key="it.key">{{ it.name }}</p>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shangyou: [
        {
          title: "锂提取与加工",
          children: [
            { key: "0-1-1-1", name: "赣锋锂业" },
            { key: "0-1-1-2", name: "天齐锂业" },
            { key: "0-1-1-3", name: "永兴材料" },
            { key: "0-1-1-4", name: "雅化集团" },
            { key: "0-1-1-5", name: "盛新锂能" },
            { key: "0-1-1-6", name: "融捷股份" },
            { key: "0-1-1-7", name: "川能动力" },
            { key: "0-1-1-8", name: "江特电机" },
          ],
        },
        {
          title: "正极材料",
          children: [
            { key: "0-1-2-1", name: "中国宝安" },
            { key: "0-1-2-2", name: "格林美" },
            { key: "0-1-2-3", name: "当升科技" },
            { key: "0-1-2-4", name: "科恒股份" },
            { key: "0-1-2-5", name: "厦门钨业" },
            { key: "0-1-2-6", name: "湘潭电化" },
            { key: "0-1-2-7", name: "富临精工" },
            { key: "0-1-2-8", name: "容百科技" },
            { key: "0-1-2-9", name: "丰源股份" },
            { key: "0-1-2-10", name: "中伟股份" },
            { key: "0-1-2-11", name: "中银绒业" },
          ],
        },
        {
          title: "负极材料",
          children: [
            { key: "0-1-3-1", name: "贝特瑞" },
            { key: "0-1-3-2", name: "中科电气" },
            { key: "0-1-3-3", name: "杉杉股份" },
            { key: "0-1-3-4", name: "璞泰来" },
            { key: "0-1-3-5", name: "翔丰华" },
          ],
        },
        {
          title: "导电剂",
          children: [
            { key: "0-1-4-1", name: "天奈科技" },
            { key: "0-1-4-2", name: "道氏技术" },
            { key: "0-1-4-3", name: "德方纳米" },
            { key: "0-1-4-4", name: "斯迪克" },
          ],
        },
        {
          title: "粘结剂",
          children: [
            { key: "0-1-5-1", name: "回天新材" },
            { key: "0-1-5-2", name: "康达新材" },
            { key: "0-1-5-3", name: "高盟新材" },
            { key: "0-1-5-4", name: "天洋新材" },
          ],
        },
        {
          title: "分散剂",
          children: [
            { key: "0-1-6-1", name: "新开源" },
            { key: "0-1-6-2", name: "瑞丰新材" },
            { key: "0-1-6-3", name: "道思股份" },
            { key: "0-1-6-4", name: "天奈科技" },
          ],
        },
        {
          title: "隔膜",
          children: [
            { key: "0-1-7-1", name: "中财科技" },
            { key: "0-1-7-2", name: "沧州明珠" },
            { key: "0-1-7-3", name: "恩捷股份" },
            { key: "0-1-7-4", name: "星源材质" },
          ],
        },
        {
          title: "铜箔",
          children: [
            { key: "0-1-8-1", name: "诺德股份" },
            { key: "0-1-8-2", name: "嘉元科技" },
            { key: "0-1-8-3", name: "中一科技" },
            { key: "0-1-8-4", name: "铜冠铜箔" },
          ],
        },
        {
          title: "电解液",
          children: [
            { key: "0-1-9-1", name: "天赐材料" },
            { key: "0-1-9-2", name: "新宙邦" },
            { key: "0-1-9-3", name: "江苏国泰" },
            { key: "0-1-9-4", name: "杉杉股份" },
            { key: "0-1-9-5", name: "石大胜华" },
          ],
        },
      ],
      zhongyou: [
        {
          title: "锂电芯、电池及PACK",
          children: [
            { key: "0-2-1-1", name: "宁德时代" },
            { key: "0-2-1-2", name: "亿纬锂能" },
            { key: "0-2-1-3", name: "国轩高科" },
            { key: "0-2-1-4", name: "鹏辉能源" },
            { key: "0-2-1-5", name: "孚能科技" },
            { key: "0-2-1-6", name: "比亚迪" },
            { key: "0-2-1-7", name: "LG新能源" },
            { key: "0-2-1-8", name: "中航锂电" },
            { key: "0-2-1-9", name: "中创新航" },
            { key: "0-2-1-10", name: "欣旺达" },
            { key: "0-2-1-11", name: "蜂果能源" },
          ],
        },
      ],
      xiayou: [
        {
          title: "整车厂",
          children: [
            { key: "0-3-1-1", name: "比亚迪" },
            { key: "0-3-1-2", name: "特斯拉" },
            { key: "0-3-1-3", name: "广汽集团" },
          ],
        },
        {
          title: "电池回收",
          children: [
            { key: "'0-3-2-1'", name: "赣锋锂业" },
            { key: "'0-3-2-2'", name: "格林美" },
            { key: "'0-3-2-3'", name: "光华科技" },
            { key: "'0-3-2-4'", name: "宁德时代" },
            { key: "'0-3-2-5'", name: "天奇股份" },
            { key: "'0-3-2-6'", name: "骆驼股份" },
            { key: "'0-3-2-7'", name: "中伟股份" },
            { key: "'0-3-2-8'", name: "华友钻业" },
            { key: "'0-3-2-9'", name: "杉杉股份" },
            { key: "'0-3-2-10'", name: "超越科枝" },
            { key: "'0-3-2-11'", name: "迪生力" },
          ],
        },
      ],
    };
  },
  methods: {
    getkey(event, key) {
      console.log(typeof key, "event");
      this.$router.push({
        name: "/industry/space_map",
        params: {
          mark: key,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pages {
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: url("./img/background.png") 100% 100% no-repeat;
  background-position: center;
  background-size: cover;

  .shangyou {
    flex: 2;
    padding: 10px;
    box-sizing: border-box;
    flex-direction: column;
    .title {
      width: 100%;
      height: 40px;
      justify-content: center;
      align-items: center;
      // background-color: rgba(255, 138, 101, 0.7);
      border-radius: 10px;
      color: #fff;
      font-size: 20px;
      background: url("./img/sy_title.png") 100% 100% no-repeat;
      background-position: center;
      background-size: cover;
    }
    .content {
      justify-content: center;
      width: 100%;
      height: calc(100% - 60px);
      margin-top: 20px;
      padding: 5px;
      background: url("./img/shangyou.png") 100% 100% no-repeat;
      background-position: center;
      background-size: cover;

      p:hover {
        background-color: #dce775;
        margin-bottom:0px !important;
        cursor: pointer;
      }
    }
  }

  .zhongyou {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    flex-direction: column;
    .title {
      width: 100%;
      height: 40px;
      justify-content: center;
      align-items: center;
      // background-color: rgba(174, 234, 0, 0.7);
      border-radius: 10px;
      color: #fff;
      font-size: 20px;
      background: url("./img/zy_title.png") 100% 100% no-repeat;
      background-position: center;
      background-size: cover;
    }
    .content {
      justify-content: center;
      width: 100%;
      height: calc(100% - 60px);
      margin-top: 20px;
      padding: 5px;
      background: url("./img/zhongyou.png") 100% 100% no-repeat;
      background-position: center;
      background-size: cover;

      p:hover {
        background-color: #dce775;
        cursor: pointer;
      }
    }
  }

  .xiayou {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    flex-direction: column;
    .title {
      width: 100%;
      height: 40px;
      justify-content: center;
      align-items: center;
      // background-color: rgba(38, 198, 218, 0.7);
      border-radius: 10px;
      color: #fff;
      font-size: 20px;
      background: url("./img/xy_title.png") 100% 100% no-repeat;
      background-position: center;
      background-size: cover;
    }
    .content {
      justify-content: center;
      width: 100%;
      height: calc(100% - 60px);
      margin-top: 20px;
      padding: 5px;
      background: url("./img/zhongyou.png") 100% 100% no-repeat;
      background-position: center;
      background-size: cover;

      p:hover {
        background-color: #dce775;
        cursor: pointer;
      }
    }
  }
}
</style>

<style>
.shangyou .ant-card-head {
  background-color: RGB(174, 102, 81) !important;
}

.zhongyou .ant-card-head {
  background-color: rgba(174, 234, 0, 0.7) !important;
}

.xiayou .ant-card-head {
  background-color: rgba(38, 198, 218, 0.7) !important;
}

.ant-card-body p{
    margin-bottom: 0 !important;
}
</style>

