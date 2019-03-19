<template>
  <div class="mine-table-start-warp">
    <!-- 这是表格  width参数可以自己定义宽度-->
    <div
      :class="{'details-table': true, 'isWidth': ( tabelParameter.length % 2 !== 0 && (index + 1) === tabelParameter.length ) ? true : false}"
      v-for="(item, index) in tabelParameter"
      :key="index"
    >
      <!-- 这里是表头(表头宽度可通过width自己定义) -->
      <tr
        class='tr-row'
        :class="item.body"
      >
        <th class="column-th">{{item.head}}</th>
        <td class="column">
          <p :title="info[item.body]">{{info[item.body]}}</p>
        </td>
      </tr>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
export default {
  props: {
    tabelParameter: {
      type: Array,
      default: []
    },
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // head: [
      //   {head: '表头1', body: 'one'},
      //   {head: '表头2', body: 'two'},
      //   {head: '表头3', body: 'three'}
      // ],
      // info: {
      //   one: '内容1',
      //   two: '内容2',
      //   three: '内容3'
      // }
    };
  }
};
</script>

<style lang="less" scoped>
.mine-table-start-warp {
  border-right: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  .details-table {
    border-bottom: 1px solid #eeeeee;
    width: 49.9%;
    border-left: 1px solid #eeeeee;
    float: left;
  }
  .clear {
    clear: both;
  }
  .isWidth {
    width: 99.9%;
  }
  .tr-row {
    // border-bottom: 1px solid #eeeeee;
    // height: 49px;
    width: 100%;
    display: flex;
    align-items: center;
    &:hover > td,
    &:hover > th {
      background-color: #f5f7fa;
    }
    &:last-child {
      border-bottom: none;
    }
  }
  .column {
    // border-right: 1px solid #eeeeee;
    display: inline-block;
    flex: 1;
    height: 100%;
    line-height: 49px;
    text-align: left;
    padding-left: 20px;
    p {
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .column-th {
    border-right: 1px solid #eeeeee;
    width: 150px;
    height: 100%;
    display: inline-block;
    line-height: 49px;
    text-align: left;
    padding-left: 40px;
  }
}
</style>

