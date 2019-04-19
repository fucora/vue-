<template>
    <div>
      <el-dialog class='dialog' :append-to-body="appendToBody" :center="center" :modal="modal" @close="dilogClose" :title="title" :visible.sync="dialogFormVisibleFlag" :width="width" :show-close='showClose' :close-on-click-modal="modalFlag">
        <slot name="option"></slot>
      </el-dialog>
    </div>
</template>
<script>
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '0'
    },
    modalFlag: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dialogFormVisibleFlag: {
      get () {
        return this.dialogFormVisible;
      },
      set (val) {
        this.$emit('close', val);
      }
    }
  },
  data () {
    return {
    };
  },
  methods: {
    dilogClose () {
      this.$emit('close');
    }
  }
};
</script>
<style lang="less" scoped>
</style>
