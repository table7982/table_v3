<template>
  <div class="header_container">
    <ul class="header_ul">
      <li class="header_li">
        <RouterLink to="/index">首页</RouterLink>
      </li>
      <li class="header_li">
        <RouterLink to="/index">随记</RouterLink>
      </li>
      <li class="header_li">
        <RouterLink to="/index">作品</RouterLink>
      </li>
      <li class="header_li">
        <RouterLink to="/index">留言</RouterLink>
      </li>
    </ul>
    <div class="login_container">
      <div class="login_stuation_text">{{ login_stuation }}</div>

    </div>
  </div>
</template>

<script setup lang='ts' name='Header'>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
const login_stuation = ref("登录")
</script>

<style scoped>
.header_container {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  top: 0;
  width: 100vw;
  transition: background-color 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0);
}

.header_container:hover {
  background-color: rgba(0, 0, 0, 0.6);
}

.header_ul {
  display: flex;

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 5rem;
  margin-right: 1rem;
  /* background-color: pink; */

}

.header_li {
  display: inline-block;
  font-size: 1.5rem;
  position: relative;
  line-height: 4rem;
  height: 4rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: white;
  margin: 0 1rem;
  padding: 0 1rem;

}

.login_container {
  display: flex;
  align-items: center;



  background-color: pink;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;

  font-size: 1.5rem;
  margin-right: 2rem;

  color: white;

}

.login_stuation_text {
  display: block;
  margin: auto;
}

.header_li::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.55rem;
  width: 100%;
  height: 0.5rem;
  background: #ff6b6b;
  /* 下划线颜色 */
  transform: scaleX(0);
  /* 初始隐藏 */
  transition: transform 0.3s ease;
  transform-origin: left;
  /* 滑动起点方向（left/right） */
}

.header_li:hover::after {
  transform: scaleX(1);
  /* 显示下划线 */
}

.header_li:hover {
  color: #ff6b6b;
}
</style>