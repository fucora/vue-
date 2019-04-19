

<script>
export default {
  data() {
    return {};
  },
  props: {
    tableData: {
      require: true,
      type: Object,
      default: () => ({})
    },
    // 默认不显示id
    ignoreDatas: {
      require: false,
      type: Object,
      default: () => ({ id: '1' })
    },
    tableLabel: {
      require: true,
      type: Object,
      default: () => ({})
    },
    clickData: {
      require: false,
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleClick(state, ids) {
      // this.$emit('detailTableClick', {ids: ids, id: this.tableData.id, state: state, sn8: this.tableData.sn8, applianceType: this.tableData.type, sdkLibId: this.tableData.sdkLibId});
      this.$emit('detailTableClick', {ids: ids, id: this.tableData.id, state: state, sn8: this.tableData.sn8, applianceType: this.tableData.type, sdkLibId: this.tableData.sdkLibId, modelNumber: this.tableData.modelNumber});
    }
  },
  render() {
    this.tableData;
    this.ignoreDatas;
    this.tableLabel;
    // debugger;
    let that = this;
    let obj = this.tableLabel;
    return (
      <div class="details-table">
        {
        Object.keys(obj).map(function(key) {
          for (let ignoreData in that.ignoreDatas) {
            if (ignoreData === key) {
              return (
                <tr class="tr-row">
                  <th class="column-th">
                    {that.tableLabel[key]}
                  </th>
                  <td class="column">
                    {
                      that.tableData[key].map(function(item) {
                        return (
                            <div>
                              { item.fileName }
                              <a
                                class={[
                                'tableclick'
                                ]}
                                on-click={that.handleClick.bind(null, key, item.id)}
                              >
                                {'下载'}
                              </a>
                            </div>
                          );
                      })
                    }
                  </td>
                </tr>
              );
            } else {
              return (
                <tr class="tr-row">
                  <th class="column-th">
                    {
                    Object.keys(that.tableLabel).map(function(label) {
                      if (label === key) {
                        return that.tableLabel[label];
                      }
                    })}
                  </th>
                  <td class="column">
                    <span class={[`${key}`]} title={[`${that.tableData[key]}`]}>
                     {that.tableData[key]}
                    </span>
                    {
                    Object.keys(that.clickData).map(function(clickItem) {
                    if (clickItem === key && clickItem !== 'sdkLibName') {
                      if (clickItem === 'luaName') {
                        if (that.tableData[key] !== '' && that.tableData[key] !== '未关联') {
                          return (
                            <a
                                class={[
                                'tableclick',
                                `${clickItem}`
                                ]
                                }
                                on-click={that.handleClick.bind(null, key, that.tableData['luaId'])}
                            >
                              {that.clickData[clickItem]}
                            </a>
                            );
                        }
                      } else {
                        return (
                        <a
                            class={[
                            'tableclick',
                            `${clickItem}`
                            ]
                            }
                            on-click={that.handleClick.bind(null, key)}
                        >
                          {that.clickData[clickItem]}
                        </a>
                        );
                      }
                    }
                    })}
                  </td>
                </tr>
              );
            }
          }
        })}
      </div>
    );
  }
};
</script>
<style lang="less" scoped>
.details-table {
  border: 1px solid #eeeeee;
  width: 100%;
  margin-top: 22px;
}
.tr-row {
  border-bottom: 1px solid #eeeeee;
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
  .sdkLibName{
    display: inline-block;
    width: 220px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: normal;
  }
  .other{
    display: inline-block;
    width: 220px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: normal;
  }
}
.column {
  border-left: 1px solid #eeeeee;
  display: inline-block;
  flex: 1;
  height: 100%;
  line-height: 49px;
  text-align: left;
  padding-left: 40px;
}
.column-th {
  width: 200px;
  height: 100%;
  display: inline-block;
  line-height: 49px;
  text-align: left;
  padding-left: 40px;
}
.tableclick {
  font-size: 14px;
  color: #5667ff;
  padding-left: 8px;
  cursor: pointer;
}
</style>
