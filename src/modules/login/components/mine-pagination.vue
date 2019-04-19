<template>
  <div class="mine-pagination-warp fenye">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="pageSizes"
      :page-size="pageSize1"
      :layout="layout"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: {
    total: {
      type: [Number, String],
      default: 0
    },
    pageSize: {
      type: [Number],
      default: 0
    },
    currentPage: {
      type: [Number],
      default: 0
    },
    pageSizes: {
      type: [Array],
      default: []
    },
    layout: {
      type: [String],
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  computed: {
    pageSize1: {
      get () {
        return this.pageSize;
      },
      set (val) {
        this.$emit('numberChange', {pageSize: val, flag: 'pageSize'});
      }
    },
    currentPage1: {
      get () {
        return this.currentPage;
      },
      set (val) {
        this.$emit('numberChange', {currentPage: val, flag: 'currentPage'});
      }
    }
  },
  methods: {
    // 选择每页多少条
    handleSizeChange(val) {
      this.pageSize1 = val;
    },
    // 选择第几页
    handleCurrentChange(val) {
      this.currentPage1 = val;
    }
  }
};
</script>

<style lang="less" scoped>
 .fenye{
    text-align: right;
    margin-top: 16px; 
 }
</style>