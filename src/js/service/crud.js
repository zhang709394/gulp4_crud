requirejs.config({
    paths: {
        jquery: '/lib/jquery',
        api: '/js/service/api',
        tpl: '/js/tmpl/tpl',
        easyui: '/lib/jquery-easyui-1.7.0/jquery.easyui.min',
        easyui_zh: '/lib/jquery-easyui-1.7.0/locale/easyui-lang-zh_CN'
    },
    shim: {
        'easyui': {
            deps: ['jquery']
        },
        'easyui_zh': {
            deps: ['easyui']
        }
    }
})


define(['jquery', 'api', 'tpl', 'easyui', 'easyui_zh'], function ($, api, tpl, crud) {
    'use strict';
    return {
        edit: function (rowData) {
            $('#edit_dialog').dialog({
                title: '修改数据',
                iconCls: 'icon-add',
                width: 300,
                height: 300,
                cache: false,
                modal: true,
                collapsible: true,
                buttons: [{
                    text: '保存',
                    iconCls: 'icon-ok',
                    handler: function () {
                        let data = $('#frmEdit').serialize();
                        api.getEdit(rowData.id, data, function (data) {
                            //关闭对话框
                            $('#frmEdit')[0].reset();
                            $('#edit_dialog').dialog('close');
                            //刷新表格
                            $('#coursett').datagrid('reload');

                            // 提醒消息 添加成功
                            $.messager.show({
                                title: '修改消息',
                                msg: '修改成功',
                                timeout: 1500
                            })
                        }, function () {
                            $.messager.alert('修改消息', '修改失败，请重试！', 'warning');
                        });
                    }
                }, {
                    text: '取消',
                    iconCls: 'icon-no',
                    handler: function () {
                        $('#edit_dialog').dialog('close');
                    }
                }]
            });

        },
        delRow: function (delId) {
            //提示用户是否删除
            $.messager.confirm({
                title: '确认消息',
                msg: '您确认要删除吗？',
                fn: function (r) {
                    if (!r) {
                        return;
                    }
                    api.grtDel(delId, function () {
                        $.messager.show({
                            title: '删除消息',
                            msg: '删除成功',
                            timeout: 1500
                        });
                        //把表格数据重新加载
                        $('#coursett').datagrid('reload');
                    }, function () {
                        $.messager.alert('删除提示', '删除失败，请重试', 'warning')
                    })

                }
            })
        },
        addrow: function () {
            $('#add_dialog').dialog({
                title: '添加',
                width: 300,
                height: 300,
                minimizable: true,
                collapsible: true,
                modal: true,
                buttons: [{
                        iconCls: 'icon-ok',
                        text: '添加',
                        handler: function () {
                            //拿到表单数据转换数组并添加唯一标识id
                            var arrData = $('#frmAdd').serializeArray();
                            arrData.push({
                                name: 'id',
                                value: Date.now()
                            });

                            // 发送请求处理
                            api.getAdd(arrData, function (data) {
                                    //关闭对话框
                                    $('#frmAdd')[0].reset();
                                    $('#add_dialog').dialog('close')
                                    //刷新表格
                                    $('#coursett').datagrid('reload');

                                    // 提醒消息 添加成功
                                    $.messager.show({
                                        title: '添加消息',
                                        msg: '添加成功',
                                        timeout: 1500
                                    })
                                },
                                function () {
                                    $.messager.alert('提醒消息', '添加失败，请重试！', 'warning');
                                })
                        }
                    },
                    {
                        text: '关闭',
                        iconCls: 'icon-no',
                        handler: function () {
                            $.messager.confirm('提醒', '您确定取消添加课程信息吗', function (r) {
                                if (!r) {
                                    return;
                                }
                                // 清空表单内容，另外关闭对话框
                                $('#frmAdd')[0].reset();
                                $('#add_dialog').dialog('close');
                            });
                        }
                    }
                ]
            })
        }


    }
})