$(document).ready(function () {
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
})
function getCollege() {
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
                tbBody += "<tr><td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>"
                    +"<td>" + n.claName + "</td>"+ "<td>"+ n.createDate + "</td><td>"
                    + "<a onclick='delClass(this,"+ n.claId + ")'>删除</a> </td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

function getManager() {
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
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

function getSuperManager() {
    let tbBody = "";
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/selves'  ,
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
                tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                    +"<td>" + n.phone + "</td>" + "<td>"+ n.createBy + "</td>" + "<td>"+ n.createDate + "</td><td>"
                    + "<a onclick='deleteSuperManagerInfo(this," + n.manId + ")'>删除</a> <a target='_parent' onclick='editManager(" + n.manId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

function manage() {
    let options = $("#operation option:selected"); //获取选中的项
    if(options.val() ==  '学院管理'){
        $('div.all_info').load("college.html #content");
        getCollege();
    }
    else if(options.val() ==  '管理员管理'){
        $('div.all_info').load("manager.html #content");
        getManager();
    }
    else if(options.val() ==  '超级管理员管理'){
        $('div.all_info').load("superManager.html #content");
        getSuperManager();
    }    
}

function checkOneCollege() {
    //alert("checkOneCollege");
    $('div.all_info').load("college.html #content");
    console.log("test---" + $('#claId').val() + "---" + $('#graName').val() )
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team?graName=' + $('#graName').val() + '&acaName=' + $('#acaName').val() + '&proName=' + $('#proName').val(),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function (i, n) {
                let tbBody = "";
                if (!n.createDate) {
                    tbBody += "<tr><td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>"
                        + "<td>" + n.claName + "</td>" + "<td>--</td><td>"
                        + "<a onclick='delClass(this," + n.claId + ")'>删除</a> </td></tr>";
                }
                else {
                    tbBody += "<tr><td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>"
                        + "<td>" + n.claName + "</td>" + "<td>" + n.createDate + "</td><td>"
                        + "<a onclick='delClass(this," + n.claId + ")'>删除</a> </td></tr>";
                }
                $(".tbBody").append(tbBody);
            });
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
function addCollege() {
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
        success:function(response) {
            //请求成功函数内容
            if(response.result == 'success'){
                alert('录入成功!');
                $('div.all_info').load("collegeRollForm.html");
            }
        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('POST 请求失败!!');
        }
    });
}
function delClass(i, claId) {
    alert("是否删除该班级?");
    i.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team?claId=' + claId,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            console.log(data.result);
            if (data.result == 'success') {
                alert('删除成功！');
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}

function checkOneManager(){
    //alert("checkOneManager");
    $('div.all_info').load("manager.html #content");
   // alert("test");
    console.log("test---" + $('#manId').val() + "---" + $('#manName').val())
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + $('#manId').val() + '&manName=' + $('#manName').val(),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function (i, n) {
                let tbBody = "";
                tbBody += "<tr><td>" + n.manId + "</td>" + "<td>" + n.manName + "</td>" + "<td>" + n.sex + "</td>"
                    + "<td>" + n.graName + "</td>" + "<td>" + n.job + "</td>" + "<td>" + n.phone + "</td>" + "<td>" + n.createDate + "</td><td>"
                    + "<a onclick='delManager(this," + n.manId + ")'>删除</a> <a target='_parent' onclick='editManager(" + n.manId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error: function (data) {
            //请求失败函数内容
            alert(data.result)
            console.log(data.result);
        }
    });
}
function addManager() {
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
        success:function(response) {
            //请求成功函数内容
            if(response.result == 'success'){
                alert('录入成功!');
                $('div.all_info').load("teacherRollForm.html");
            }
        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('POST 请求失败!!');
        }
    });
    window.close();
}
function delManager(i, manId) {
    alert("是否删除该管理员?");
    i.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + manId,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            console.log(data.result);
            if (data.result == 'success') {
                alert('删除成功！');
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}

function checkOneSupermanager() {
    alert("test");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        //url: 'http://192.168.137.1:8080/CourseSystem/superManager/selves?supId=' + $('#supId').val() + '&supName=' + $('#supName').val() ,
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/self?supId=' + $('#supId').val() + '&supName=' + $('#supName').val(),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function (i, n) {
                let tbBody = "";
                tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                    + "<td>" + n.phone + "</td>" + "<td>" + n.createBy + "</td>" + "<td>" + n.createDate + "</td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
function addSuperManager() {
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
            if(data.result == 'success'){
                alert('录入成功!');
                $('div.all_info').load("managerRollForm.html");
            }
        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('POST 请求失败!!');
        }
    });
}
function deleteSuperManagerInfo() {
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/superManager/self",
        //url: "http://192.168.137.1:8080/CourseSystem/superManager/self" ,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            alert('删除成功！');
            console.log(data.result);
            self.location.href = '../login.html';
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}

function editInfo(){
    $('#phone').removeAttr("readonly");
    $('#phone').focus();
}

function saveInfo(){
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        //url: "http://192.168.137.1:8080/CourseSystem/superManager/self" ,
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/self',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //数据
        data: JSON.stringify({  //解决错误码400
            'supName': $('#supName').val(),
            'sex': $('#sex').val(),
            'phone': $('#phone').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            console.log(data.result);
            if (data.result == 'success') {
                alert('保存成功!');
            }
            window.close();
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}

function saveManager(manId){
    //alert(manId);
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager' ,
        data: JSON.stringify({
            supId : manId,
            supName :  $('#supName').val(),
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
            if(data.result == 'success'){
                alert('修改成功!');
            }
            $('div.all_info').load("changeManagerInfo.html");
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

function check(){
    let options = $("#operation option:selected");
    if (options.val()=="学院管理"){
        $('div.all_info').load("college.html #content");
        $('#tbBody').html("");
        getCollege();
    }
    else if (options.val() == "管理员管理") {
        $('div.all_info').load("manager.html #content");
        $('#tbBody').html("");
        getManager();
    }
    else if (options.val() == "超级管理员管理") {
        $('div.all_info').load("superManager.html #content");
        $('#tbBody').html("");
        getSuperManager();
    }
    else{
        $("#operation").val("学院管理");
        $('div.all_info').load("college.html #content");
        $('#tbBody').html("");
        getCollege();
    }
}

function add(){
    let options = $("#operation option:selected");
    if (options.val() == "学院管理") {
        window.open("/../../pages/manager/addCollege.html");
    }
    else if (options.val() == "管理员管理") {
        window.open("/../../pages/manager/addManagerForm.html");
    }
    else if (options.val() == "超级管理员管理") {
        window.open("/../../pages/manager/addSupermanager.html");
    }
}

