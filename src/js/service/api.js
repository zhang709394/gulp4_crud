requirejs.config({
  paths: {
    jquery: '/lib/jquery'
  }
});

// 用require定义一个模块
define(['jquery'], function ($) {
  'use strict';
  return {
    getCourse: function (params, callback, errorfn) {
      $.ajax({
        url: '/api/course',
        type: 'GET',
        data: params,
        success: callback,
        error: errorfn
      });
    },
    getEdit: function (id, edit_data, callback, errorfn) {
      $.ajax({
        url: '/api/course/' + id,
        data: edit_data,
        type: 'PUT',
        dataType: 'json',
        success: callback,
        error: errorfn
      })
    },
    grtDel: function (id, callback, errorfn) {
      $.ajax({
        url: '/api/course/' + id,
        type: 'DELETE',
        dataType: 'json',
        success: callback,
        error: errorfn
      })
    },
    getAdd: function (arrData, callback, errorfn) {
      $.ajax({
        url: '/api/course',
        type: 'POST',
        data: arrData,
        dataType: 'json',
        success: callback,
        error: errorfn
      })
    }
  };
});