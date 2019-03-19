<template>
  <div class="pagination-wrapper">
    <el-row>
      <el-col :span="14">
        <el-pagination
          class="page-left"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :total="total"
          layout="sizes"
          @size-change="handleSizeChange">
        </el-pagination>
      </el-col>

      <el-col :span="10">
        <el-pagination
          class="page-right"
          layout="prev, pager, next, total, jumper"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="total"
          :page-size="pageSize">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    pageSizes: {
      type: Array,
      default: () => [10, 30, 50, 80]
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {};
  },
  methods: {
    // 改名每页查询数量pageSize
    handleSizeChange (val) {
      this.$emit('pageSize-change', val);
    },

    // 改变当前页currentPage
    handleCurrentChange (val) {
      this.$emit('currentPage-change', val);
    }
  }
};
</script>

<style lang="less" scoped>
  .pagination-wrapper {
    margin-top: 10px;

    .page-left {
      padding-left: 0;
    }

    .page-right {
      float: right;
      padding-right: 0;
    }
  }
</style>
