/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = window.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('centre',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,course_name=$data.course_name,author=$data.author,college=$data.college,category_Id=$data.category_Id,$out='';$out+='<div class="easyui-layout">\r\n    <div data-options="region:\'north\'">\r\n        <input id="ss"></input>\r\n        <div id="mm" style="width:120px">\r\n            <div data-options="name:\'course_name\',iconCls:\'icon-ok\'">课程名</div>\r\n            <div data-options="name:\'author\',iconCls:\'icon-man\'">作者</div>\r\n            <div data-options="name:\'college\',iconCls:\'icon-add\'">大学</div>\r\n        </div>\r\n    </div>\r\n\r\n    <div data-options="region:\'center\'">\r\n        <table id="coursett"></table>\r\n    </div>\r\n</div>\r\n\r\n<!-- 修改的弹出层 -->\r\n<div id="edit_dialog" style="display: none;">\r\n    <!-- <form id="frmEdit">\r\n        <table>\r\n            <tr>\r\n                <td>课程名</td>\r\n                <td><input type="text" name="course_name" id="course_name" value="';
$out+=$escape(course_name);
$out+='"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>作者</td>\r\n                <td><input type="text" name="author" id="author" value="';
$out+=$escape(author);
$out+='"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>大学</td>\r\n                <td><input type="text" name="college" id="college" value="';
$out+=$escape(college);
$out+='"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>分类</td>\r\n                <td>\r\n                    <select name="category_Id" id="category_Id" value="';
$out+=$escape(category_Id);
$out+='">\r\n                        <option value="1">1</option>\r\n                        <option value="2">2</option>\r\n                        <option value="3">3</option>\r\n                        <option value="4">4</option>\r\n                        <option value="5">5</option>\r\n                    </select>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </form> -->\r\n</div>\r\n\r\n<!-- 添加课程对话框 -->\r\n<div id="add_dialog" style="display: none;">\r\n    <form id="frmAdd">\r\n        <table>\r\n            <tr>\r\n                <td>课程名</td>\r\n                <td><input type="text" name="course_name" class="course_name"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>作者</td>\r\n                <td><input type="text" name="author" class="author"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>大学</td>\r\n                <td><input type="text" name="college" class="college"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>分类</td>\r\n                <td>\r\n                    <select name="category_Id" class="category_Id">\r\n                        <option value="1">1</option>\r\n                        <option value="2">2</option>\r\n                        <option value="3">3</option>\r\n                        <option value="4">4</option>\r\n                        <option value="5">5</option>\r\n                    </select>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </form>\r\n</div>\r\n\r\n<!-- 双击弹出详情 -->\r\n<div class="info-dialog">\r\n</div>\r\n</div>';
return new String($out);
});/*v:1*/
template('header',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,$out='';$out+='<h1>';
$out+=$escape(title);
$out+='</h1>';
return new String($out);
});/*v:1*/
template('crud/editDialog',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,course_name=$data.course_name,author=$data.author,college=$data.college,category_Id=$data.category_Id,$out='';$out+='<form id="frmEdit">\r\n    <table>\r\n        <tr>\r\n            <td>课程名</td>\r\n            <td><input type="text" name="course_name" id="course_name" value="';
$out+=$escape(course_name);
$out+='"></td>\r\n        </tr>\r\n        <tr>\r\n            <td>作者</td>\r\n            <td><input type="text" name="author" id="author" value="';
$out+=$escape(author);
$out+='"></td>\r\n        </tr>\r\n        <tr>\r\n            <td>大学</td>\r\n            <td><input type="text" name="college" id="college" value="';
$out+=$escape(college);
$out+='"></td>\r\n        </tr>\r\n        <tr>\r\n            <td>分类</td>\r\n            <td>\r\n                <select name="category_Id" id="category_Id" value="';
$out+=$escape(category_Id);
$out+='">\r\n                    <option value="1">1</option>\r\n                    <option value="2">2</option>\r\n                    <option value="3">3</option>\r\n                    <option value="4">4</option>\r\n                    <option value="5">5</option>\r\n                </select>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n</form>';
return new String($out);
});/*v:1*/
template('crud/showinforDialog',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,course_name=$data.course_name,author=$data.author,college=$data.college,category_Id=$data.category_Id,$out='';$out+='<h3>课程详情</h3>\r\n<table>\r\n    <tr>\r\n        <td>课程id</td>\r\n        <td id="cid">';
$out+=$escape(id);
$out+='</td>\r\n    </tr>\r\n    <tr>\r\n        <td>课程名字</td>\r\n        <td id="cName">';
$out+=$escape(course_name);
$out+='</td>\r\n    </tr>\r\n    <tr>\r\n        <td>课程大学</td>\r\n        <td id="cCol">';
$out+=$escape(author);
$out+='</td>\r\n    </tr>\r\n    <tr>\r\n        <td>课程作者</td>\r\n        <td id="cAut">';
$out+=$escape(college);
$out+='</td>\r\n    </tr>\r\n    <tr>\r\n        <td>课程分类</td>\r\n        <td id="cCat">';
$out+=$escape(category_Id);
$out+='</td>\r\n    </tr>\r\n</table>';
return new String($out);
});/*v:1*/
template('stu/footer',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,content=$data.content,$out='';$out+='<p style="text-align: center;">';
$out+=$escape(content);
$out+='</p>';
return new String($out);
});

}()