<template>
  <div class="main">
    <!--侧边栏-->
    <div class="bar">
      <router-link to="/">HelloWorld</router-link>
      <router-link to="/startElementUI">startElementUI</router-link>
    </div>

    <!--嵌套children-->
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mainPage'
  }
</script>

<style lang="less">
  .main {
    display: flex;
    height:100%;

    .bar {
      width: 20%;
      padding: 20px;
      border-right: 1px solid #cacaca;
      a{
        display: block;
      }
    }

    .content{
      padding: 20px;
      width: 100%;
    }
  }
</style>
