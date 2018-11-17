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
                    +"<td>" + n.phone + "</td>" + "<td>"+ n.createBy + "</td>" + "<td>"+ n.createDate + "</td></tr>";
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
    //alert(options.val());
    if(options.val() ==  '学院管理'){
        $('div.all_info').load("college.html #content");
        /*$.ajax({
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
        });*/
        getCollege();
        // alert("学院管理");
    }
    else if(options.val() ==  '管理员管理'){
        $('div.all_info').load("manager.html");
        /*$.ajax({
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
        });*/
        getManager();
        // alert("学院管理");
    }
    else if(options.val() ==  '超级管理员管理'){
        $('div.all_info').load("superManager.html");
        /*$.ajax({
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
                    tbBody += "<tr><td>" + n.supId + "</td>" + "<td>" + n.supName + "</td>" + "<td>" + n.sex + "</td>"
                        +"<td>" + n.phone + "</td>" + "<td>"+ n.createBy + "</td>" + "<td>"+ n.createDate + "</td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error : function(){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });*/
        getSuperManager();
        alert("超级管理员管理");
    }
    else
        alert(学院管理);
}
function checkAllCollege() {
    $('#tbBody').html("");
    getCollege();
}
function checkOneCollege() {
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team?claId=' + $('#claId').val() + '&graName=' + $('#graName').val()+ '&acaName=' + $('#acaName').val()+ '&proName=' + $('#proName').val() ,
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
                    +"<td>" + n.claName + "</td>" + "<td>"+ n.createDate + "</td><td>"
                    + "<a onclick='delClass(this,"+ n.claId + ")'>删除</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
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

function checkAllManager() {
    $('#tbBody').html("");
    getManager()
}
function checkOneManager(){
    // alert("test");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/manager?manId=' + $('#manId').val() + '&manName=' + $('#manName').val() ,
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
}

function checkAllSupermanager() {
    $('#tbBody').html("");
    getSuperManager()
}
function checkOneSupermanager() {
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/self',
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log("superManager--"+data.result);
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

function editInfo(){
    $('#phone').removeAttr("readonly");
    $('#phone').focus();
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

function newManPage(){
    window.open("../../pages/manager/addManager.html");
}