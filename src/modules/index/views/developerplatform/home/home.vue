<template>
  <div>
    <!-- <h1>
      <a href="./demo.html">Demo</a>
      <a href="./page.html">Page</a>
    </h1> -->
    <!-- <Header :headerStyle="{position: 'absolute',width:'100%',zIndex:'1'}"> -->
    <!-- <Header :active="active"></Header> -->
    <!-- </Header> -->
    <div class="banner-content">
      <div class="iot-text-content center-wrapper container">
           <div class="iot-text-Intelligence">智能互惠 共同构筑</div>
            <div class="iot-text-platform">美的IoT开发者平台</div>
            <!-- ./../../../../assets/img/home_1@2x.png -->
            <!-- <div class="home_1_img"><img src="./../../../../../assets/img/home_1@2x.png" alt=""></div> -->
      </div>
      </div>
      <Fun :titleStyle="{color:'#333',fontSize: '20px'}" :cardList="cardList" :hasBorder="true" :hasWrapBottomBorder="true"></Fun>
     <div class="advantage-content">
        <Fun :cardList="advantageList" :hasBorder="true" :funCardStyle="{width:'317px',height:'440px', border:'none',boxSizing:'content-box'}" :cardBackgroundColor="{backgroundColor:'#000'}"></Fun>
     </div>
     <div>
       <Fun :titleStyle="{fontSize: '16px'}" :decStyle="{color:'#999999',fontSize:'12px',width:'164px',lineHeight:'20px'}" :cardList="cooperationProcessList" :hasBorder="false" :hasWrapBottomBorder="false" :funCardStyle="{height:'215px'}"></Fun>
     </div>
     <div class="btn-container"><el-button class="advantage-btn" type="primary" @click="test">申请合作</el-button></div>
     <div>
       <Fun :majorStyle="{color: '#fff'}" :wrapBackgroundImage="{backgroundImage:'url('+pingtaishiming+')',backgroundSize:'cover'}" :lineStyle="{backgroundColor:'#fff'}" :cardList="platformList" :hasBorder="true" :hasWrapBottomBorder="false" :isTriangle="true"></Fun>
     </div>
    <Footer></Footer>
  </div>
</template>

<script>
// import Header from './../loyouts/header.vue';
import Header from '@/components/awesome/tab-header/page-header';
// import layout from '@/components/layout/layout1';
import Footer from './../loyouts/footer.vue';
import Fun from './../loyouts/dev-fun.vue';
import pingtaishiming from '@/assets/img/pingtaishiming@2x.png';
export default {
  data () {
    return {
      pingtaishiming: pingtaishiming,
      active: '我的产品',
      cardList: {
        major: '开放功能',
        cardListArray: [
            {'img': require('@/assets/img/home_2_1@2x.png'), 'title': '设备连接与开发能力', 'link': '查看详情'},
            // {'img': '/static/img/home_2_1@2x.png', 'title': '设备连接与开发能力', 'link': '查看详情'},
            {'img': require('@/assets/img/home_2_2@2x.png'), 'title': '设备物联数据管理能力', 'link': '查看详情'},
            {'img': require('@/assets/img/home_2_3@2x.png'), 'title': 'weex插件与app SDK开放', 'link': '查看详情'}
        ]
      },
      advantageList: {
        major: '优势',
        cardListArray: [
            {'img': require('@/assets/img/home_3_1@2x.png'), 'dec': '简单迅速<br/> 硬件接入', 'BackgroundImage': require('@/assets/img/youshi1.png')},
            {'img': require('@/assets/img/home_3_2@2x.png'), 'dec': '丰富的品类 <br/>接入经验', 'link': '查看详情', 'BackgroundImage': require('@/assets/img/youshi2@2x.png')},
            {'img': require('@/assets/img/home_3_3@2x.png'), 'dec': '与美的千万级设备<br/> 互联互通', 'link': '查看详情', 'BackgroundImage': require('@/assets/img/youshi3@2x.png')},
            {'img': require('@/assets/img/home_3_4@2x.png'), 'dec': '共享美的<br/> 现有亿万用户', 'link': '查看详情', 'BackgroundImage': require('@/assets/img/youshi4@2x.png')}
        ]
      },
      cooperationProcessList: {
        major: '合作流程',
        cardListArray: [
            {'img': require('@/assets/img/home_4_1@2x.png'), 'title': '成为开发者', 'dec': '注册开发者资质，获得平台使用开发权限', isTriangle: 'true'},
            {'img': require('@/assets/img/home_4_2@2x.png'), 'title': '创建产品', 'dec': '确定产品功能与技术方案，正式立项', isTriangle: 'true'},
            {'img': require('@/assets/img/home_4_4@2x.png'), 'title': '研发产品', 'dec': '开发产品软硬件功能，自行测试通过', isTriangle: 'true'},
            {'img': require('@/assets/img/home_4_5@2x.png'), 'title': '认证产品', 'dec': '寄送产品样机和测试报告，由平台检验确认', isTriangle: 'true'},
            {'img': require('@/assets/img/home_4_6@2x.png'), 'title': '发布产品', 'dec': '获得平台授权，进行产品销售和推广'}
        ]
      },
      platformList: {
        major: '平台使命',
        platformDec: '美的IoT开放平台实现从终端、云到服务，实现真正的开放，与各合作伙伴将建立起耦合式、嵌入式的合作关系，相互赋能，彻底打破信息孤岛，实现生态共建、共享资源、开放系统，与各行业合作伙伴共同构筑用户智慧生活生态'
      }
    };
  },
  components: {Header, Footer, Fun},
  methods: {

    test() {
      // this.$router.push({name: '系统'});
    }
  }
};
</script>

<style lang="less" scoped>
// @media screen and (min-width: 980px){
//   .container {
//       max-width: 1220px;
//       margin: 0 auto;
//       width: 100%;
//   }
// }
@media screen and (min-width: 1180px){
    .container {
      margin: 0 auto;
      width: 100%;
  }
}
.advantage-btn{
    border-radius: 0px;
    width: 300px;
    font-size: 20px;
    color: #FFFFFF;
    height: 52px;
}
.btn-container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -30px 0 60px;
}
.iot-text-content{
  // position: absolute;
  // top: 200px;
  // left: 150px;
  color: #fff;
  padding-top: 214px;
  .iot-text-Intelligence{
    font-size: 40px;
    margin-left: 100px;
  }
  .iot-text-platform{
    margin-top: 48px;
    margin-bottom: 40px;
    font-size: 24px;
    margin-left: 100px;
  }
}
.home_1_img{
  width: 120px;
  height: 120px;
  margin-left: -16px;
  img{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
.platform-content{
  // position: ;

}
.banner-content{
  position: relative;
  // ../../../../assets/img/banner.png
  background-image: url('../../../../../assets/img/banner.jpg');
  background-position: center;
  background-size: cover;
  height: 650px;
  width: 100%;
  // padding-top: 214px;
  // >img {
  // background-position: center;
  // background-size: cover;
  // height: 650px;
  // width: 100%;
  // }

}
.advantage-content {
  .wrap{
        padding: 58px 0 0px 0;
  }
}

</style>
