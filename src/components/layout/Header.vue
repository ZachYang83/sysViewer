<template>
  <div class="header">
    <div class="user_box">
      <el-avatar
        :size="40"
        :src="src"
        style="margin: 0 5px; display: flex; alignitems: center"
      >
      </el-avatar>
      <!-- <p style="padding:10px;fontSize:18px">{{ $store.state.user.username }}</p> -->
    </div>
  </div>
</template>

<script>
import src from "@/assets/admin.jpg";


export default {
  data() {
    return {
      src: src,
    };
  },
  methods: {
    loginOut() {
      this.$store.commit("REMOVE_INFO");
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height:100%;
  line-height: 60px;
  font-size: 20px;
  background: url('~assets/header.png') no-repeat #001225;
  background-size: 100% 100%;
  padding: 0 20px;
  color: #fff;
}

.user_box {
  width: 12%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top:5px;
  font-size: 20px;
}
</style>