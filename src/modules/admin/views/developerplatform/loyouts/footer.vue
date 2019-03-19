<template>
  <div class="footer-wrap">
    <div class="footer center-wrapper">
        <div class="footer-left">
          <ul style="padding-right:210px">
            <li class="title">关于</li>
            <li class="link">关于我们</li>
            <li class="link">加入我们</li>
            <li class="link">团队</li>
          </ul>
          <ul style="padding-right:234px">
            <li class="title">服务</li>
            <li class="link">服务条款</li>
            <li class="link">隐私协议</li>
          </ul>
          <ul >
            <li class="title">产品</li>
            <li class="link">如何使用</li>
            <li class="link">视频介绍</li>
            <li class="link">更新历史</li>
            <!-- <li class="link">更新历史</li> -->
          </ul>
        </div>
        <div class="footer-right">
          <ul>
            <li class="title">关注我们</li>
            <div class="footer-link-img">
              <li class="link"><img src="../../../../../assets/img/home_foot1@2x.png" alt=""></li>
              <li class="link"><img src="../../../../../assets/img/home_foot2@2x.png" alt=""></li>
              <li class="link"><img src="../../../../../assets/img/home_foot3@2x.png" alt=""></li>
            </div>
          </ul>
        </div>
    </div>
    <div class="footer-bottom-wrap">
     <div class="footer-bottom center-wrapper">
        <p>Copyright © 1968-2018 Midea Group.</p>
        <p>使用反馈</p>
     </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer'
};
</script>
<style lang="less" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.footer-wrap{
  background-color:#212330;

}
.footer{
  display: flex;
  margin: 0 auto;
  padding: 55px 0 40px;
}
.footer-right{
  width: 313px;
  padding-left: 147px;
}
.footer-left{
  flex: 1;
  display: flex;
  border-right: 1px solid #373945;
}
  .title{
    opacity: 0.8;
    font-size: 16px;
    color: #FFFFFF;
    // letter-spacing: 0.07px;
    padding-bottom: 35px;
  }
  .link{
    opacity: 0.6;
    font-size: 12px;
    color: #FFFFFF;
    // letter-spacing: 0.05px;
    padding-bottom: 22px;
  }
  .footer-bottom-wrap{
    border-top: 1px solid #373945;
  }
  .footer-bottom{
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92px;
    p{
      opacity: 0.6;
      font-size: 12px;
      color: #FFFFFF;
      // letter-spacing: 0.05px;
    }
  }
  .footer-link-img{
    display: flex;
    justify-content: space-between;
    margin-left: -14px;
    .link{
      width: 80px;
      height: 80px;
    img{
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    }
  }
</style>

