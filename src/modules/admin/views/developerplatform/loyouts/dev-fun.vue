<template>
  <div
    :class="['wrap',hasWrapBottomBorder?'wrap-bottom-border':'']"
    :style="wrapBackgroundImage"
  >
    <div class="dev-fun">
      <h1 :style="majorStyle">{{cardList.major}}</h1>
      <div
        class="line"
        :style="lineStyle"
      ></div>
      <div
        class="card-bottom"
        :style="cardBackgroundColor"
      >
        <div
          class="platformDec-parent"
          v-if="cardList.platformDec"
        >
          <p
            class="platformDec"
            v-html="cardList.platformDec"
          ></p>
        </div>
        <div
          class="fun-card-content container"
          v-else
        >
          <div
            :class="['fun-card',hasBorder?'fun-card-border':'no-card-border']"
            :style="funCardStyle"
            v-for="(item,index) in cardList.cardListArray"
            :key="index"
          >
            <div
              class="home-img-container"
              v-if="item.BackgroundImage"
            >
              <img
                :src="item.BackgroundImage"
                alt=""
              >
            </div>
            <div class="inner-card">
              <!-- <div  class="inner-card" :style="{backgroundImage: 'url(' + (item.BackgroundImage ? item.BackgroundImage : '') + ')', backgroundSize:'center'}"> -->
              <div class="fun-card-img"><img
                  :src="item.img"
                  alt=""
                ></div>
              <p
                :style="titleStyle"
                :class="[item.title?'':'inner-line']"
              >{{item.title}}</p>
              <div v-if="item.dec">
                <p
                  class="card-dec"
                  :style="decStyle"
                  v-html="item.dec"
                > </p>
              </div>
              <div v-else><a href="#">{{item.link}}</a></div>
            </div>
            <!-- <img  v-else src="" alt=""> -->
            <div v-if="item.isTriangle">
              <div class="isTriangle-img"><img
                  src="./../../../img/Triangle 2@2x.png"
                  alt=""
                ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  name: 'Fun',
  props: {
    cardList: {
      type: Object,
      default: () => ({})
    },
    hasBorder: {
      type: Boolean,
      default: true
    },
    funCardStyle: {
      type: Object
    },
    cardBackgroundColor: {
      type: Object
    },
    hasWrapBottomBorder: {
      type: Boolean,
      default: false
    },
    decStyle: {
      type: Object
    },
    titleStyle: {
      type: Object
    },
    lineStyle: {
      type: Object
    },
    wrapBackgroundImage: {
      type: Object
    },
    majorStyle: {
      type: Object
    },
    isTriangle: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less" scoped>
.home-img-container {
  width: 317px;
  height: 440px;
  overflow: hidden;
  position: absolute;
  img {
    cursor: pointer;
    transition: all 0.6s;
    display: inline-block;
    width: 100%;
    height: 100%;
    &:hover {
      transform: scale(1.2);
    }
  }
}
@media screen and (min-width: 1180px) {
  .container {
    max-width: 1280px;
    margin: 0 auto;
  }
}
.isTriangle-img {
  width: 16px;
  height: 18px;
  position: absolute;
  top: 26%;
  right: 0px;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
.platformDec-parent {
  display: flex;
  justify-content: center;
  .platformDec {
    font-size: 14px;
    color: #ffffff;
    // letter-spacing: 0.05px;
    text-align: center;
    line-height: 35px;
    // width: 1160px;
    width: 960px;
  }
}

.wrap-bottom-border {
  border-bottom: 1px solid #e7e7e7;
}
.card-dec {
  color: #ffffff;
  font-size: 16px;
  // font-size: 20px;
  text-align: center;
  line-height: 36px;
}
.inner-line {
  width: 36px;
  height: 2px;
  background-color: #ffffff;
}
.inner-card {
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  justify-content: space-evenly;
  position: relative;
  z-index: 2;
  a {
    color: #5667ff;
        &:hover{
    color: #6F7DFF;
  }
  }
}
.card-bottom {
  width: 100%;
  margin: 37px 0 0 0px;
}
.fun-card-content {
  // padding: 37px 24px 0 24px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  .fun-card-box-shadow {
    box-shadow: 0 12px 20px 0;
  }
  .fun-card-border {
    border: 1px solid #c5c5c5;
  }
  .fun-card {
    position: relative;
    width: 360px;
    height: 350px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    // border: 1px solid #c5c5c5;
    border-radius: 4px;
    &:hover {
      box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.1);
    }
    &:hover .home-img-container img {
      transform: scale(1.2);
    }
    .fun-card-img {
      width: 120px;
      height: 120px;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
  }
  .no-card-border {
    .fun-card-img {
      width: 108px;
      height: 108px;
    }
    &:hover {
      box-shadow: none;
    }
  }
}

.wrap {
  padding: 58px 0 70px 0;
}
.dev-fun {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 28px;
    color: #000;
    margin: 0 0 18px 0;
  }
  .line {
    width: 56px;
    height: 2px;
    background: #666666;
  }
}
</style>
