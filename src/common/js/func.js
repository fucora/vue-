import _ from 'lodash';
const commonFun = {
  getRootPath(url) {
    let urlArr = url.split('/');
    if (urlArr.length) {
      this.rootPath = '/' + urlArr[1];
    }
    return this.rootPath;
  },
  transformationNetwork(val, arr, card) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === val) {
        card.webNetworkDiscription = arr[i].discription;
        return arr[i].discription;
      }
    }
  },
  networkTransformationNumber(val, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].discription === val) {
        // card.webNetworkDiscription = arr[i].discription || arr[i].agreement;
        return arr[i].id;
      }
    }
  },
  transformationProtos(val, arr, card) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === val) {
        card.webProtosDiscription = arr[i].agreement;
        return arr[i].agreement;
      }
    }
  },
  protosTransformationNumber(val, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].agreement === val) {
        // card.webProtosDiscription = arr[i].discription || arr[i].agreement;
        return arr[i].id;
      }
    }
  },

  // 表单校验封装
  /*
  form: 需要校验的表单ref
  m: 上下文
  */
  doSubmit(form, m) {
    var rs = true;
    m.$refs[form].validate((valid) => {
      if (valid) {
        rs = true;
      } else {
        rs = false;
      }
    });
    if (!rs) {
      m.$message({
        showClose: true,
        message: '请检查必填项是否为空以及输入是否正确！',
        type: 'warning'
      });
    };
    return rs;
  },
  // 重置所有表单
  /*
  form: 要重置的表单数据 object
  limit: 排除的表单数据 array */

  restData(form, limit = []) {
    // 没有传值返回
    if (!form || (!limit && !form)) return;
    // 非数组返回
    if (!(limit instanceof Array)) return;
    // 传入的表单非对象返回
    if (typeof form !== 'object') return;
    // 传入数组判断
    if (limit.length) {
      for (let key in form) {
        limit.map((item) => {
          if (item === key) {
            return;
          } else {
            if (form[key] instanceof Array) {
              for (let index = 0; index < form[key].length; index++) {
                const element = form[key][index];
                for (const key in element) {
                  element[key] = '';
                }
              }
              // form[key] = [];
            } else if (typeof form[key] === 'object') {
              form[key] = {};
            } else {
              form[key] = '';
            };
          }
        });
      }
    } else {
      for (let key1 in form) {
        if (form[key1] instanceof Array) {
          for (let index = 0; index < form[key1].length; index++) {
            const element = form[key1][index];
            for (const key in element) {
              element[key] = '';
            }
          }
          // form[key1] = [];
        } else if (typeof form[key1] === 'object') {
          if (form[key1] instanceof Date) { form[key1] = ''; } else {
            form[key1] = {};
          }
        } else {
          form[key1] = '';
        };
      };
    }
  },
  // 找到拉下的值
  /**
   * val 显示的值，
   * m 显示值的字段
   * list 下拉的数组
   * c 需要返回的字段
   *
   */
  fetchWord(val, m, list, c) {
    let str = '';
    list.forEach(element => {
      if (val === element[m]) {
        str = element[c];
      }
    });
    return str;
  },
  // 判断文件扩展名是否符合限制
  extMatch(_files, accepts, that) {
    let acceptArray = accepts;
    if (typeof accepts === 'string') {
      acceptArray = accepts.replace(/\s/g, '').split(',');
    }
    let flag = true;
    const fileExtensions = '.' + _files.name.split('.').pop().toLowerCase();
    if (
      acceptArray instanceof Array &&
      !acceptArray.includes(fileExtensions)
    ) {
      // that.$message.error(`上传文件只能是${accepts}格式!`);
      this.thatMessage(`上传文件只能是${accepts}格式!`);
      flag = false;
    }
    return flag;
  },
  extMatchSize(_files, maxSize, that) {
    const isLt5M = _files.size / 1024 / 1024 < maxSize;
    if (!isLt5M) {
      this.thatMessage(`上传文件大小不能超过 ${maxSize} M!`);
      // that.$message.error(`上传文件大小不能超过 ${maxSize} M!`);
    }
    return isLt5M;
  },
  thatMessage(content) {
    let link = document.createElement('div');
    link.className = 'el-message el-message--error';
    link.setAttribute('role', 'alert');
    link.innerHTML = `<i class="el-message__icon el-icon-error"></i><p class="el-message__content">${content}</p>`;
    link.style.zIndex = '99999999';
    document.body.appendChild(link);
    setTimeout(() => {
      link.parentNode.removeChild(link);
    }, 1500);
  },
  // 判断文件扩展名是否符合限制
  luaExtMatch(_files, accepts, that) {
    debugger;
    let acceptArray = accepts;
    if (typeof accepts === 'string') {
      acceptArray = accepts.replace(/\s/g, '').split(',');
    }
    let flag = true;
    const fileExtensions = '.' + _files.name.split('.').pop().toLowerCase();
    if (
      acceptArray instanceof Array &&
      !acceptArray.includes(fileExtensions)
    ) {
      // that.$message.error(`上传文件只能是${accepts}格式!`);
      flag = false;
    }

    let lastFlag = true;
    // if (flag) {
          // 处理名字
    let nameArr = _files.name.split('.')[0].split('_');
    console.log(nameArr);
    let luaFlag = true;
    luaFlag;
    if (nameArr.length) {
      // 完整名
      if (nameArr.length === 5) {
        for (let index = 0; index < nameArr.length; index++) {
          const element = nameArr[index];
          if (index === 0) {
            if (element !== 'T') {
              luaFlag = false;
            }
          } else if (index === 1) {
            if (!/^\d{4,6}$/.test(element)) {
              luaFlag = false;
            }
          } else if (index === 2) {
            luaFlag = /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(element) && !/[^\w\.\/]/ig.test(element);
          } else if (index === 3) {
            luaFlag = /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(element) && !/[^\w\.\/]/ig.test(element);
          } else if (index === nameArr.length - 1) {
            luaFlag = /^[0-9]*$/.test(element) && element.length <= 20;
          }
          if (!luaFlag) {
            break;
          };
        }
        // 少一项
      } else if (nameArr.length === 4) {
        for (let index = 0; index < nameArr.length; index++) {
          const element = nameArr[index];
          if (index === 0) {
            if (element !== 'T') {
              luaFlag = false;
            }
          } else if (index === 1) {
            if (!/^\d{4,6}$/.test(element)) {
              luaFlag = false;
            }
          } else if (index === 2) {
            luaFlag = /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(element) && !/[^\w\.\/]/ig.test(element);
          } else if (index === nameArr.length - 1) {
            luaFlag = /^[0-9]*$/.test(element) && element.length <= 20;
          }
          if (!luaFlag) {
            break;
          };
        }
        // 少于4项
      } else {
        luaFlag = false;
      }
    }
    debugger;
    if (!luaFlag || !flag) {
      lastFlag = false;
    }

    // }
    return {lastFlag: lastFlag, luaFlag: luaFlag, flag: flag};
  },
  checkLuaName(_files) {
    debugger;
    // 处理名字
    let nameArr = _files.name.split('.')[0].split('_');
    console.log(nameArr);
    let luaFlag = true;
    luaFlag;
    if (nameArr.length) {
      for (let index = 0; index < nameArr.length; index++) {
        const element = nameArr[index];
        if (index === 0) {
          if (element !== 'T') {
            luaFlag = false;
          }
        } else if (index === 1) {
          if (element !== '0000') {
            luaFlag = false;
          }
        } else if (index === 2) {
          luaFlag = /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(element);
        }
        if (!luaFlag) {
          continue;
        }
        debugger;
      }
      debugger;
      return luaFlag;
    }
  },
  treeData(data, pid) {
    let result = [];
    let temp;
    debugger;
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentId === pid) {
        let obj = { 'id': data[i].id, 'title': data[i].name, 'iconType': data[i].iconType, 'key': data[i].keyy, 'parentId': data[i].parentId };
        temp = this.treeData(data, data[i].id);
        if (temp.length > 0) {
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  },
  // 将数组处理成树结构数组
  /*
  val: 需要处理的数组
  */
  initArr(val) {
    if (!val.length || !val) {
      this.treeData = [];
      return;
    }
    let deletArr = [];
    let tempVal = _.cloneDeep(val);
    for (let index = 0; index < val.length; index++) {
      const element = val[index];
      let parentId = element.pId;
      if (parentId !== 0) {
        for (let j = 0; j < tempVal.length; j++) {
          const ele = tempVal[j];
          if (ele.id === parentId) {
            if (!ele.children) {
              ele.children = [];
            }
            ele.children.push(element);
            // val.splice()
            deletArr.push(element);
          }
        }
      }
    }
    debugger;
    // val.forEach(ele => {
    //   // ele.label = ele.name;
    //   // ele.meta = { title: ele.discription, icon: 'dots' };
    //   // ele.path = ele.permissionUrl;
    //   let parentId = ele.pId;
    //   if (parentId === 0) {
    //   } else {
    //     val.forEach((d, index) => {
    //       if (d.id === parentId) {
    //         debugger;
    //         let cloneD = _.cloneDeep(d);
    //         let childArray = d.children;
    //         if (!childArray) {
    //           childArray = [];
    //         }
    //         childArray.push(cloneD);
    //         d.children = childArray;
    //         val.splice(index, 1);
    //       }
    //     });
    //   }
    // });
    // Math.min.apply(Math, val.map(function(o) {return o.pid}));
    // val = val.filter(ele => ele.pid === 3);

    for (let j = 0; j < deletArr.length; j++) {
      const deletArrItem = deletArr[j];
      for (let index = 0; index < tempVal.length; index++) {
        const element = tempVal[index];
        if (deletArrItem.pId === element.pId) {
          tempVal.splice(index, 1);
        }
      }
    }
    console.log(tempVal);
    debugger;
    return tempVal;
  },
  etParent(id, aTree) {
    var aParent = [];
    for (var i in aTree) {
      if (aTree[i].pid === id) {
        aParent.push(aTree[i]);
      }
    }
    return aParent;
  },
  createTreeData(nodes, treeRootPid) {
    var groups = {};
    // 按父节点将节点分组
    for (var i in nodes) {
      if (!groups[nodes[i].pId]) {
        groups[nodes[i].pId] = [];
      }
      groups[nodes[i].pId].push(nodes[i]);
      if (treeRootPid && treeRootPid === nodes[i].id) { // 发现传入的根节点id作为节点id时，将根节点设置为该节点的父节点
        treeRootPid = nodes[i].pId;
      }
    }

    var rootNodes = groups[treeRootPid];
    groups[treeRootPid] = null; // [SAFEGUARD]防止自为父节点或互为父节点（有环图结构）导致的死循环
    function traverseTreeNodeGroup(treeNodeGroup) {
      for (var i in treeNodeGroup) {
        var node = treeNodeGroup[i];
        if (groups[node.id]) {
          node.children = groups[node.id];
          groups[node.id] = null; // [SAFEGUARD]防止自为父节点或互为父节点（有环图结构）导致的死循环
          traverseTreeNodeGroup(node.children);
        }
      }
    }
    traverseTreeNodeGroup(rootNodes);
    return rootNodes;
  }
};
export default commonFun;
