<template>
  <div class="mtree-box" ref="mtreeBox" @contextmenu.prevent>
    <div class="tree-box vscroll" id="treeOva">
      <a-tree
        v-if="treeData.length"
        class="draggable-tree"
        draggable
        v-model="checkedKeys"
        @expand="onExpand"
        @select="handleSelected"
        :treeData="treeData"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        checkable
      >
        <!-- <a-icon type="down" slot="switcherIcon" /> -->
        <a-icon type="caret-down" slot="switcherIcon" />
        <template slot="title" slot-scope="item">
          <!-- <span class="index">{{ item.index }}</span> -->
          <span
            v-if="item.key.substr(0, 3) == '0-1'"
            style="color: #ff6d00"
            :title="item.title"
            class="txt-ellipsis"
            :key="item.key"
            v-html="item.title"
          ></span>
          <span
            v-else-if="item.key.substr(0, 3) == '0-2'"
            style="color: #aeea00"
            :title="item.title"
            class="txt-ellipsis"
            :key="item.key"
            v-html="item.title"
          ></span>
          <span
            v-else-if="item.key.substr(0, 3) == '0-3'"
            style="color: #d81b60"
            :title="item.title"
            class="txt-ellipsis"
            :key="item.key"
            v-html="item.title"
          ></span>
          <span
            v-else
            :title="item.title"
            class="txt-ellipsis"
            :key="item.key"
            v-html="item.title"
          ></span>
        </template>
      </a-tree>
    </div>
  </div>
</template>

<script>
import { layerData } from "./layerData";
import {
  restructTreeData,
  getAllParentKey,
  getParentKey,
  getMenuKeys,
} from "./index.js";
export default {
  data() {
    return {
      //树
      treeData: [],
      //展开的key
      expandedKeys: [],
      //被选中的====
      checkedKeys: [],
      //树所有key
      treeAllKey: [],
      //是否自动展开父节点
      autoExpandParent: true,
      //搜索
      keyWord: "",
      //放图层列表
      layerArr: [],
      opacityVisible: false,
      opacity: 1,
      versionVisible: false,
      panelVisible: false,
    };
  },
  created() {
    // this.buildLayerTree();
  },
  mounted() {
    this.buildLayerTree();
    this.$nextTick(() => {
      let o = document.getElementById("treeOva");
      o.style.maxHeight = document.body.clientHeight - 400 + "px";
    });
  },
  methods: {
    buildLayerTree() {
      let _this = this;
      _this.treeData = restructTreeData(layerData, "", []).data;
      _this.checkedKeys = restructTreeData(layerData, "", []).checkedData;
      console.log(_this.checkedKeys, "checkedKeys");
      _this.expandChecks();
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    handleSelected(selectedKeys) {
      let _this = this;
      _this.checkedKeys = [];
      _this.checkedKeys.push(selectedKeys[0])
      _this.$emit('handleSelected',selectedKeys[0])
    },
    expandChecks() {
      let vm = this;
      vm.expandedKeys = [];
      vm.checkedKeys.forEach((element) => {
        const arr_temp = getAllParentKey(element, vm.treeData, []);
        vm.expandedKeys = [...vm.expandedKeys, ...arr_temp];
      });
      vm.expandedKeys = Array.from(new Set(vm.expandedKeys));
    },
    isExpandSelect(flag) {
      const arr1 = [this.curSelectNode];
      const b = getMenuKeys(arr1, []);
      if (flag) {
        for (let i in b) {
          if (this.expandedKeys.indexOf(b[i]) === -1) {
            this.expandedKeys.push(b[i]);
          }
        }
      } else {
        for (let i in b) {
          let index = this.expandedKeys.indexOf(b[i]);
          if (index > -1) {
            this.expandedKeys.splice(index, 1);
          }
        }
      }
    },
    handleMemuEvent(key) {
      this[key]();
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss">
</style>

<style lang="scss">
.mtree-box {
  .tree-box {
    max-height: 100% !important;
  }

  .txt-ellipsis {
    color: #fff;
    font-size: 18px;
  }
}
</style>