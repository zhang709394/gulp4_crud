requirejs.config({
  paths: {
    jquery: '/lib/jquery',
    api: '/js/service/api',
    tpl: '/js/tmpl/tpl',
    easyui: '/lib/jquery-easyui-1.7.0/jquery.easyui.min',
    easyui_zh: '/lib/jquery-easyui-1.7.0/locale/easyui-lang-zh_CN',
    crud: '/js/service/crud'
  },
  shim: {
    'easyui': {
      deps: ['jquery']
    },
    'easyui_zh': {
      deps: ['easyui']
    }
  }
});

requirejs(['jquery', 'api', 'tpl', 'crud', 'easyui', 'easyui_zh'], function ($, api, tpl, crud) {

  $(function () {
    //初始化index页面
    initIndex();

    //初始化表格数据
    initTable();

    // 初始化搜索框
    initSearchBox();

  });

  //初始化index页面
  function initIndex() {
    $('.header').html(tpl('header', {
      title: '后台管理系统'
    }));
    $('.centre').html(tpl('centre', {}));
    $('.footer').html(tpl('stu/footer', {
      content: '版权所有@aicode.com'
    }));

  }


  function initSearchBox() {
    $('#ss').searchbox({
      width: 300,
      searcher: function (value, name) {
        var param = $.parseJSON('{"' + name + '_like":"' + value + '"}');
        initTable(param);
      },
      menu: '#mm',
      prompt: '请输入搜索的内容'
    });
  }

  //初始化数据列表
  function initTable(param) {
    $('#coursett').datagrid({
      // url: '/api/course',//rows:一页有多少条，page：请求当前页
      title: '课程列表',
      // width: 800,
      // height: 400,
      // fit: true,
      fitColumns: true,
      method: 'GET', // http请求的方法
      idField: 'id', // 主键
      loadMsg: '正在加载用户的信息...',
      pagination: true, // 是否用分页控件
      singleSelect: true, // 是否是单行选中
      striped: true, //隔行变色
      pageSize: 10, // 默认一页多少条
      pageNumber: 1, // 默认显示第几页
      pageList: [10, 20, 30],
      queryParams: param, //让表格在加载数据的时候，额外传输的数据。
      onBeforeLoad: function (param) { // 表格控件请求之前，可以设置相关参数。
        // param = {page: 1, rows: 10}
        param._page = param.page;
        param._limit = param.rows;
        param._sort = 'id';
        param._order = 'desc';
      },
      loader: function (param, successfn, errorfn) {
        api.getCourse(param, function (resData, status, xhr) {
          var total = parseInt(xhr.getResponseHeader('X-Total-Count'));
          var datagridData = {
            rows: resData,
            total: total
          };
          successfn(datagridData);
        }, errorfn);

      },
      onLoadSuccess: function (data) { // 后台请求成功之后，当数据加载成功时触发
        // console.log(data);

        //编辑操作
        $('.editRow').on('click', function () {
          var rowIndex = $(this).attr('rowindex');
          //拿到当前行数据
          var rowData = $('#coursett').datagrid('getRows')[rowIndex];

          console.log(rowData);

          //显示模板数据
          $('#edit_dialog').html(tpl('crud/editDialog', rowData));
          crud.edit(rowData);
        });

        //删除操作
        $('.delRow').on('click', function () {
          rowIndex = $(this).attr('rowindex');
          //拿到当前行数据
          var rowData = $('#coursett').datagrid('getRows')[rowIndex];
          crud.delRow(rowData.id);
        });



      },
      onDblClickRow: function (rowIndex, rowData) {
        // console.log(rowData);

        //显示到弹出层的模板
        $('.info-dialog').html(tpl('crud/showinforDialog', rowData));
        $('.info-dialog').dialog({
          title: '课程详情',
          width: 300,
          height: 300,
          modal: true,
          iconCls: "icon-edit",
          buttons: [{
            text: '确定',
            iconCls: 'icon-no',
            handler: function () {
              $('.info-dialog').dialog('close')
            }
          }]
        })

      },
      columns: [
        [{
            field: 'ck',
            checkbox: true,
            align: 'left',
            width: 50
          },
          {
            field: 'id',
            title: '编号',
            width: 80
          },
          {
            field: 'course_name',
            title: '课程名',
            width: 120,
            editor: {
              type: 'text',
              options: {
                required: true
              }
            }
          },
          {
            field: 'author',
            title: '作者',
            width: 120,
            editor: {
              type: 'text'
            }
          },
          {
            field: 'college',
            title: '大学',
            width: 220,
            editor: {
              type: 'text'
            }
          },
          {
            field: 'category_Id',
            title: '分类',
            width: 120,
            editor: {
              type: 'numberbox'
            },
            formatter: function (value, row, index) {
              return '分类' + value;


            }
          },
          {
            field: 'action',
            title: '操作',
            width: 120,
            formatter: function (value, row, index) {
              //如果是编辑状态 返回保存和取消

              // 如果试图状态：返回 编辑和删除
              var html = '';
              html += '<a href="javascript:" class="editRow" rowindex="' + index + '">修改</a>';
              html += '&nbsp;&nbsp;&nbsp;';
              html += '<a href="javascript:" class="delRow" rowindex="' + index + '">删除</a>';
              return html;
            }
          }
        ]
      ],
      toolbar: [{
          id: 'btnDownShelf',
          text: '添加',
          iconCls: 'icon-add',
          handler: function () {
            crud.addrow();
          }
        },
        {
          id: 'btnDelete',
          text: '删除',
          iconCls: 'icon-cancel',
          handler: function () {
            //删除操作
            //拿到选中的行
            var row = $('#coursett').datagrid('getSelected');
            if (!row) {
              $.messager.alert('提示消息', '请选中后再操作', 'warning');
              return;
            } else {
              crud.delRow(row.id);
            }
          }
        },
        {
          id: 'btnEdit',
          text: '修改',
          iconCls: 'icon-edit',
          handler: function () {
            //拿到选中的行
            var rowData = $('#coursett').datagrid('getSelected');
            if (!rowData) {
              $.messager.alert('提示消息', '请选中后再操作', 'warning');
              return;
            }
            //显示模板数据
            $('#edit_dialog').html(tpl('crud/editDialog', rowData));
            crud.edit(rowData);

          }
        },
        {
          id: 'clearAllSelect',
          text: '清除选择',
          iconCls: 'icon-redo',
          handler: function () {
            $('#coursett').datagrid('clearSelections');
          }
        }
      ],
      onHeaderContextMenu: function (e, field) {}

    });

    //初始化分液器
    var pager = $('#coursett').datagrid('getPager');
    pager.pagination({
      layout: ['list', 'sep', 'first', 'prev', 'sep', 'links', 'sep', 'next', 'last', 'refresh', 'last']
    });

  }

});