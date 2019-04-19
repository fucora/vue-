// 表单校验封装
/*
form: 需要校验的表单ref
m: 上下文
*/
const {
  APPLICATION_NAME
} = window.environment.iotserver;
export const doSubmit = (form, m) => {
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
  };
// 重置所有表单
/*
form: 要重置的表单数据 object
limit: 排除的表单数据 array
*/
export const restData = (form, limit = []) => {
  // 没有传值返回
  if (!form || (!limit && !form)) return;
  // 非数组返回
  if (!(limit instanceof Array)) return;
  // 传入的表单非对象返回
  if (typeof form !== 'object') return;
  // 传入数组判断
  if (limit.length) {
    for (var key in form) {
      limit.map((item) => {
        if (item === key) {
          return;
        } else {
          if (form[key] instanceof Array) {
            form[key] = [];
          } else if (typeof form[key] === 'object') {
            form[key] = {};
          } else {
            form[key] = '';
          };
        }
      });
    }
  } else {
    for (var key1 in form) {
      if (form[key1] instanceof Array) {
        form[key1] = [];
      } else if (typeof form[key1] === 'object') {
        form[key1] = {};
      } else {
        form[key1] = '';
      };
    };
  }
};
// 将数组处理成树结构数组
/*
val: 需要处理的数组
*/
export const initArr = (val) => {
  if (!val.length || !val) {
    this.treeData = [];
    return;
  }
  val.forEach(ele => {
        ele.label = ele.name;
        ele.meta = {title: ele.discription, icon: 'dots'};
        ele.path = ele.permissionUrl;
        let parentId = ele.pid;
        if (parentId === 0) {
        } else {
          val.forEach(d => {
            if (d.id === parentId) {
              let childArray = d.children;
              if (!childArray) {
                childArray = [];
              }
              childArray.push(ele);
              d.children = childArray;
            }
          });
        }
      });
  // Math.min.apply(Math, val.map(function(o) {return o.pid}));
  val = val.filter(ele => ele.pid === 3);
  return val;
};
// 树状结构数据抽离需要的数组
export const initBtnAuthed = (source, targetName, json) => {
  if (source && source.length) {
    for (let i = 0; i < source.length; i++) {
      if (source[i].type === targetName) {
        json.push(source[i]);
      } else if (source[i].children && source[i].children.length) {
        initBtnAuthed(source[i].children, targetName, json);
      }
    }
  };
};
// 取出按钮权限
export const meauAuthed = (source, targetName, json) => {
  if (source && source.length) {
    for (var i = 0; i < source.length; i++) {
      if (source[i].type === targetName) {
        json.push(source[i]);
        delete source[i];
      } else if (source[i].path === '') {
        delete source[i];
      } else if (source[i].children && source[i].children.length) {
        meauAuthed(source[i].children, targetName, json);
      }
    }
  };
  return {source, json};
};
// 递归删除数组中有null的
export const meauAuthedDel = (source) => {
  if (source && source.length) {
    for (var i = 0; i < source.length; i++) {
      if (source[i] === null || source[i] === undefined) {
        source.splice(i);
      } else if (source[i].children && source[i].children.length) {
        meauAuthedDel(source[i].children);
      }
    }
  };
  return source;
};
// 给树状结构递归新增属性
export const addKey = (arr) => {
  arr.forEach(function(el) {
      // el.path = el.permissionUrl;
      el.path = '/';
      el.meta = {title: el.name};
      el.children = el.subMenus;
      el.hidden = !el.authed;
      if (!el.subMenus || el.subMenus.length === 0) {
        return;
      }
      addKey(el.subMenus);
  });
  return arr;
};
// Data格式转换为字符串时间
/*
time: 需要格式化的时间
format: 格式化格式
*/
export const format = (time, format) => {
  var t = new Date(time);
  var tf = (i) => { return (i < 10 ? '0' : '') + i; };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
        case 'MM':
          return tf(t.getMonth() + 1);
        case 'mm':
          return tf(t.getMinutes());
        case 'dd':
          return tf(t.getDate());
        case 'HH':
          return tf(t.getHours());
        case 'ss':
          return tf(t.getSeconds());
      }
  });
};
// 文件下载
export function downloadFile(url, data, method) {
  let t = document.getElementById('ihr_table_export_form');
  let curMethod = method || 'GET';
  if (!t) {
    t = document.createElement('form');
    t.setAttribute('id', 'ihr_table_export_form');
    t.setAttribute('style', 'display: none');
    t.setAttribute('action', APPLICATION_NAME + url);
    t.setAttribute('method', curMethod);
    document.body.appendChild(t);
  } else {
    t.setAttribute('action', APPLICATION_NAME + url);
    t.setAttribute('method', curMethod);
  };
  t.innerHTML = '';
  var input = document.createElement('input');
  input.setAttribute('name', 'lang');
  // input.setAttribute('value', 'en-US');
  t.appendChild(input);
  debugger;
  if (data) {
    for (let key of Object.keys(data)) {
      if (data[key] !== undefined && data[key] !== null) {
        input = document.createElement('input');
        input.setAttribute('name', key);
        input.setAttribute('value', data[key]);
        t.appendChild(input);
      }
    }
  }
  t.submit();
  console.log('11111');
};
