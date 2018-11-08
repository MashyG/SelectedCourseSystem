$(document).ready(function () {
    $('#xxxName').html(name);
});


//获取id，并写入
var loc = window.location.href;
var n2 = loc.indexOf("=");//取得=号的位置
var n3 = loc.indexOf("&");//取得&号的位置
var name = loc.substr(n2+1, n3-n2-1);//从=号后面且&号之前的内容

//查询超级管理员个人信息
function superManager_info(){
    $('div.all_info').load("manager_info.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/superManager/self" ,
        //url: "http://192.168.137.1:8080/CourseSystem/superManager/self" ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbody = '';
                tbody += "<tr><th>学号</th> <td>" + n.supId + "</td></tr>" +
                    "<tr><th>姓名</th> <td>" + n.supName + "</td></tr>" +
                    "<tr><th>性别</th> <td>" + n.sex + "</td></tr>" +
                    "<tr><th>联系电话</th> <td>" + n.phone + "</td></tr>" +
                    "<tr><th>创建者</th> <td>" + n.createBy + "</td></tr>" +
                    "<tr><th>创建时间</th> <td>" + n.createDate + "</td></tr>";
                $('#table').append(tbody);
            })
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}


//学院管理
//查询所有班级信息
function managerCollege() {
    $('div.all_info').load("manage_college.html");
}
function allClassInfo() {
    $('div.all_info').load("collegeRollList.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team'  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                if(!n.createDate) {
                    tbBody += "<tr><td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>"
                        + "<td>" + n.claName + "</td>" + "<td>--</td><td>"
                        + "<a onclick='delClass(this," + n.claId + ")'>删除</a> </td></tr>";
                }
                else{
                    tbBody += "<tr><td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>"
                        + "<td>" + n.claName + "</td>" + "<td>" + n.createDate + "</td><td>"
                        + "<a onclick='delClass(this," + n.claId + ")'>删除</a> </td></tr>";
                }
                $(".tbBody").append(tbBody);
            });
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//查询个别班级信息
function checkedClassInfo() {
    $('div.all_info').load("collegeRollList.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team?graName=' + $('#graName').val()+ '&acaName=' + $('#acaName').val()+ '&proName=' + $('#proName').val() ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                if(!n.createDate) {
                    tbBody += "<tr><td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>"
                        + "<td>" + n.claName + "</td>" + "<td>--</td><td>"
                        + "<a onclick='delClass(this," + n.claId + ")'>删除</a> </td></tr>";
                }
                else{
                    tbBody += "<tr><td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>"
                        + "<td>" + n.claName + "</td>" + "<td>" + n.createDate + "</td><td>"
                        + "<a onclick='delClass(this," + n.claId + ")'>删除</a> </td></tr>";
                }
                $(".tbBody").append(tbBody);
            });
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//添加班级信息
function logClass() {
    $('div.all_info').load("collegeRollForm.html");
}
function classInfoRoll() {
    $.ajax({
        //请求方式
        type: 'POST',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team',
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //数据
        data: JSON.stringify({  //解决错误码400
            'graName' :       $('#graName').val(),
            'acaName' :           $('#acaName').val(),
            'proName' :       $('#proName').val(),
            'claName' :       $('#claName').val(),
            'createDate' :       $('#createDate').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType : 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('录入成功!');
                $('div.all_info').load("collegeRollForm.html");
            }
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//删除班级
function delClass(i,claId) {
    alert("是否删除该班级?");
    i.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team?claId=' + claId  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('删除成功！');
            }
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}


//管理员管理
//查询所有管理员信息
function managerTeacher() {
    $('div.all_info').load("manage_teacher.html");
}
function allTeacherInfo() {
    $('div.all_info').load("teacherRollList.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/superManager/manager"  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                tbBody += "<tr><td>" + n.manId + "</td>" + "<td>" + n.manName + "</td>" + "<td>" + n.sex + "</td>"
                    +"<td>" + n.graName + "</td>" + "<td>"+ n.job + "</td>" + "<td>"+ n.phone + "</td>" + "<td>"+ n.createDate + "</td><td>"
                    + "<a onclick='delManager(this,"+ n.manId + ")'>删除</a> <a target='_parent' onclick='editManager(" + n.manId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//查询个别管理员信息
function checkedTeacherInfo() {
    $('div.all_info').load("teacherRollList.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + $('#manId').val() + '&manName=' + $('#manName').val() ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                tbBody += "<tr><td>" + n.manId + "</td>" + "<td>" + n.manName + "</td>" + "<td>" + n.sex + "</td>"
                    +"<td>" + n.graName + "</td>" + "<td>"+ n.job + "</td>" + "<td>"+ n.phone + "</td>" + "<td>"+ n.createDate + "</td><td>"
                    + "<a onclick='delManager(this,"+ n.manId + ")'>删除</a> <a target='_parent' onclick='editManager(" + n.manId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//添加管理员信息
function logTeacherInfo() {
    $('div.all_info').load("teacherRollForm.html");
}
function teacherInfoRoll() {
    $.ajax({
        //请求方式
        type: 'POST',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager',
        //url: 'http://192.168.191.2:8080/CourseSystem/superManager/manager',
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //数据
        data: JSON.stringify({  //解决错误码400
            'manName' :       $('#manName').val(),
            'sex' :           $('#sex').val(),
            'job' :       $('#job').val(),
            'phone' :       $('#phone').val(),
            'graName' :       $('#graName').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType : 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('录入成功!');
                $('div.all_info').load("teacherRollForm.html");
            }
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//删除管理员
function delManager(i,manId){
    alert("是否删除该管理员?");
    i.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + manId  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('删除成功！');
            }
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//修改管理员
var managerId;
function editManager(manId){
    managerId = manId;
    $('div.all_info').load("changeManagerInfo.html");
}
function changeManagerInfo(){
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager' ,
        data: JSON.stringify({
            manId : managerId,
            manName :  $('#manName').val(),
            sex :  $('#sex').val(),
            phone :  $('#phone').val(),
            graName : $('#graName').val(),
            job : $('#job').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('修改成功!');
            }
            $('div.all_info').load("changeManagerInfo.html");
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}


//超级管理员管理
//查询所有超级管理员信息
function supManager() {
    $('div.all_info').load("manage_manager.html");
}
function allSupManagerInfo() {
    $('div.all_info').load("managerRollList.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/self'  ,
        //url: 'http://192.168.137.1:8080/CourseSystem/superManager/selves'  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                if(!n.createBy) {
                    tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                        + "<td>" + n.phone + "</td>" + "<td>--</td>" + "<td>" + n.createDate + "</td></tr>";
                }
                else {
                    tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                        + "<td>" + n.phone + "</td>" + "<td>" + n.createBy + "</td>" + "<td>" + n.createDate + "</td></tr>";
                }
                $(".tbBody").append(tbBody);
            });
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//查询个别超级管理员信息
function checkedSupManager() {
    $('div.all_info').load("managerRollList.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        //url: 'http://192.168.137.1:8080/CourseSystem/superManager/selves?supId=' + $('#supId').val() + '&supName=' + $('#supName').val() ,
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/self?supId=' + $('#supId').val() + '&supName=' + $('#supName').val() ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function(i, n) {
                let tbBody = "";
                tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                    +"<td>" + n.phone + "</td>" + "<td>"+ n.createBy + "</td>" + "<td>"+ n.createDate + "</td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//添加超级管理员信息(创建人为空？？)
function logSupManagerInfo() {
    $('div.all_info').load("managerRollForm.html");
}
function supManagerInfoRoll() {
    $.ajax({
        //请求方式
        type: 'POST',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/self',
        //url: 'http://192.168.137.1:8080/CourseSystem/superManager/self',
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //数据
        data: {
            "supName" :   $('#supName').val(),
            "sex" :       $('#sex').val(),
            "phone" :     $('#phone').val()
        },
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType : 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('录入成功!');
                $('div.all_info').load("managerRollForm.html");
            }
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//修改超级管理员个人信息
function changeSuperManagerInfo() {
    $('div.all_info').load("changeInfo.html");
}
function changeSuperManagerInfo1() {
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        //url: "http://192.168.137.1:8080/CourseSystem/superManager/self" ,
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/self' ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //数据
        data: JSON.stringify({  //解决错误码400
            'supName' :       $('#supName').val(),
            'sex' :           $('#sex').val(),
            'phone' :       $('#phone').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType : 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('保存成功!');
                $('div.all_info').load("changeInfo.html");
            }
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//删除超级管理员个人信息
function deleteSuperManagerInfo() {
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/superManager/self" ,
        //url: "http://192.168.137.1:8080/CourseSystem/superManager/self" ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            alert('删除成功！');
            console.log(data.result);
            self.location.href = '../login.html';
        },
        error : function(data){
            //请求失败函数内容
            console.log(data.result);
        }
    });
}


