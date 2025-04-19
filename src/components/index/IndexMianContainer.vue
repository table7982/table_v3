<template>
  <div class="IndexMianContainer">
    <div class="left_side">

      <div class="card my_message">
        <img src="/my_head_img.jpg" alt="头像" class="my_head_img">
        <p style="font-size: 2rem;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: bold;
        margin: .6rem;">
          table
        </p>
        <div>
          <div class="my_message_bottom">
            <div class="base_message_item">
              <p>分类</p>
              <p>3</p>
            </div>
            <div class="base_message_item">
              <p>文章</p>
              <p>0</p>
            </div>
            <div class="base_message_item">
              <p>用户数量</p>
              <p>1</p>
            </div>
          </div>
        </div>
        <button class="nomal_button">日常</button>
      </div>

      <div class="search_container card">
        <p>搜索</p>
        <div class="search_box">
          <input class="search" type="text" placeholder="开发中">
          <svg t="1743871088999" class="search_icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="4605" width="1.5rem" height="1.5rem">
            <path
              d="M893.64 797.29L725.18 628.84c20.55-25.29 37.36-53.22 50.14-83.42 18.11-42.81 27.29-88.27 27.29-135.1 0-46.84-9.18-92.29-27.29-135.1-17.48-41.33-42.5-78.44-74.36-110.31-31.86-31.86-68.97-56.88-110.31-74.36-42.81-18.11-88.27-27.29-135.1-27.29s-92.29 9.18-135.1 27.29c-41.33 17.48-78.44 42.5-110.31 74.36s-56.88 68.97-74.36 110.31c-18.11 42.81-27.29 88.27-27.29 135.1 0 46.84 9.18 92.29 27.29 135.1 17.48 41.33 42.5 78.44 74.36 110.31s68.97 56.88 110.31 74.36c42.81 18.11 88.27 27.29 135.1 27.29s92.29-9.18 135.1-27.29a345.135 345.135 0 0 0 83.64-50.31l168.44 168.44c7.03 7.03 16.24 10.54 25.46 10.54s18.43-3.51 25.46-10.54c14.05-14.07 14.05-36.87-0.01-50.93zM455.55 685.37c-151.67 0-275.06-123.39-275.06-275.06s123.39-275.06 275.06-275.06c151.67 0 275.06 123.39 275.06 275.06s-123.4 275.06-275.06 275.06z"
              fill="#31D0C8" p-id="4606"></path>
          </svg>
        </div>

      </div>
    </div>

    <div class="right_side">
      <div class="right_side_discribe">
        欢迎来到本站!
      </div>

      <ArticleCardContainer />
    </div>

  </div>
</template>

<script setup lang='ts' name='IndexMianContainer'>
import ArticleCardContainer from '../card/ArticleCardContainer.vue';
import ArticleCard from '../card/ArticleCardContainer.vue';



</script>

<style scoped>
.IndexMianContainer {
  max-width: 100rem;
  display: flex;
  flex-direction: row;
  /* background-color: #fff; */
  margin: 0 auto;
}

.left_side {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 30%;
  /* background-color: pink; */

  .card {
    width: 90%;
    margin: 2rem;
  }
}



.card {
  box-shadow: 0 .1rem .4rem 0 rgb(100, 100, 100);
  border-radius: .5rem;
  transition: box-shadow .2s ease-in-out;


}

.card:hover {
  box-shadow: 0rem .2rem .5rem .2rem rgba(111, 111, 111, 0.7);
}



.my_message {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 2rem;
  height: 23rem;
  background: linear-gradient(45deg, rgba(255, 0, 150, 0.4), rgba(0, 204, 255, 0.4));

  .my_head_img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    transition: rotate .5s ease-in-out, box-shadow .5s ease;
    cursor: pointer;
    margin-bottom: 1rem;
    box-shadow: 0rem .2rem .5rem .2rem rgba(111, 111, 111, 0.7);


  }

  .my_head_img:hover {
    rotate: 360deg;
    box-shadow: 0rem .2rem .5rem .2rem rgba(111, 111, 111, 0);
  }

  .my_message_bottom {
    display: flex;
    flex-direction: row;
  }

  .base_message_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    line-height: 1.8rem;
    margin: .2rem .3rem;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;

  }



  .nomal_button {
    margin-top: .5rem;
    width: 80%;
    font-size: 1rem;
    height: 2.3rem;
    border-radius: 1.15rem;
    border: none;
    cursor: pointer;
    background-color: skyblue;
    /* 默认背景色 */
    background-image: linear-gradient(to right, #FF6B6B, #FF8E53);
    /* 悬停填充色 */
    background-size: 0 100%;
    /* 初始不显示 */
    background-repeat: no-repeat;
    color: white;
    transition: background-size 0.5s ease;
  }

  .nomal_button:hover {
    background-size: 100% 100%;
    /* 悬停时铺满 */
  }
}




.search_container {
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  background-color: skyblue;

  p {
    font-size: 1.5rem;
    font-family: 'Courier New', Courier, monospace;
    margin-bottom: .5rem;
    font-weight: bold;
  }

  .search_box {
    position: relative;
  }

  .search_icon {
    position: absolute;
    right: .5rem;
    top: .23rem;
    cursor: pointer;
  }

  .search {
    /* 基础样式 */
    width: 100%;
    padding: .3rem .4rem;
    border: 0.125rem solid #B3E0FF;
    /* 浅天蓝边框 */
    border-radius: 8px;
    /* 现代圆角 */
    font-size: 1rem;
    color: #333;
    background-color: #F0F9FF;
    /* 极浅天蓝背景 */
    transition: all 0.3s ease;
    /* 平滑过渡 */

    /* 移除默认轮廓 */
    outline: none;
  }

  /* 聚焦效果 */
  .search:focus {
    border-color: #1E90FF;
  }

  /* 悬停效果 */
  .search:hover {
    border-color: #87CEFA;
    /* 中等天蓝 */
  }



}

.right_side {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 70%;
  /* background-color: skyblue; */


  .right_side_discribe {
    width: 100%;
    height: 5rem;
    font-size: 1.2rem;
    line-height: 5rem;
    padding: 0 2rem;
    border-radius: .5rem;
    border: .05rem dashed grey;
    width: 90%;
  }

  .card {
    width: 90%;
  }
}
</style>