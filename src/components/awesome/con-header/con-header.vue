<template>
  <div :class="['title-wrapper',hasBottomBorder?'title-wrapper-border':'']" >
    <h3 class="title3">
      <img v-if="titleIcon" class="title-icon" :src="titleIcon"  alt="图片不存在"/>
      <span>{{title}}</span>
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    titleIcon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    hasBottomBorder: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less" scoped>
.title-wrapper-border{
  border-bottom: 1px solid #dedfe5;
}
.title-wrapper {

  padding-bottom: 12px;

  .title3 .title-icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .title3 span {
    display: inline-block;
    font-weight: 700;
    font-size: 16px;
    color: #333;
    vertical-align: middle;
  }
}
</style>
