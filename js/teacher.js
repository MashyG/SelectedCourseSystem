//获取id，并写入
var loc = window.location.href;
var n2 = loc.indexOf("=");//取得=号的位置
var n3 = loc.indexOf("&");//取得&号的位置
var name = loc.substr(n2+1, n3-n2-1);//从=号后面且&号之前的内容

$(document).ready(function () {

    $('#xxxName').html(name);

    //管理页面下，点击按钮跳转相应页面
    //个人信息
    $('#teacherInfo').click(function () {
        $('div.all_info').load("teacher_info.html");
    });


    //学生管理
    $('#studentManage').click(function () {
        $('div.all_info').load("studentManage.html");
    });
    //查询所有学生信息
    $('#student_info').click(function () {
        $('div.all_info').load("studentRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/student"  ,
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
                    tbBody += "<tr><td>" + n.stuId + "</td>" + "<td>" + n.stuName + "</td>" + "<td>" + n.sex + "</td>"
                        +"<td>" + n.graName + "</td>" + "<td>"+ n.acaName + "</td>" + "<td>"+ n.proName + "</td>" +
                        "<td>"+ n.claName + "</td>" + "<td>"+ n.phone + "</td>" + "<td>"+ n.createDate   + "</td><td>" +
                        "<a onclick='delStudent(this,"+ n.stuId + ")'>删除</a> <a target='_parent' onclick='editStudent(" + n.stuId + ")'>修改</a></td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //查询个别学生信息
    $('#checkedStudent').click(function () {
        $('div.all_info').load("studentRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/student?stuId=" + $('#stuId').val() + '&stuName=' + $('#stuName').val() ,
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
                    tbBody += "<tr><td>" + n.stuId + "</td>" + "<td>" + n.stuName + "</td>" + "<td>" + n.sex + "</td>"
                        +"<td>" + n.graName + "</td>" + "<td>"+ n.acaName + "</td>" + "<td>"+ n.proName + "</td>" +
                        "<td>"+ n.claName + "</td>" + "<td>"+ n.phone + "</td>" + "<td>"+ n.createDate   + "</td><td>" +
                        "<a onclick='delStudent(this,"+ n.stuId + ")'>删除</a> <a target='_parent' onclick='editStudent(" + n.stuId + ")'>修改</a></td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //添加学生信息
    $('#addStudent_info').click(function () {
        $('div.all_info').load("addStudentRollForm.html");
    });
    $('#addStudentInfo').click(function () {
        $.ajax({
            //请求方式
            type: 'POST',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/student',
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //数据
            data: JSON.stringify({  //解决错误码400
                'stuName' :       $('#stuName').val(),
                'sex' :           $('#sex').val(),
                'graName' :       $('#graName').val(),
                'acaName' :       $('#acaName').val(),
                'proName' :       $('#proName').val(),
                'claName' :       $('#claName').val(),
                'phone' :       $('#phone').val()
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType : 'json',
            success:function(response) {
                //请求成功函数内容
                if(response.result == 'success'){
                    alert('添加成功!');
                    $('div.all_info').load("addStudentRollForm.html");
                }
            },
            error:function(){
                //请求失败函数内容
                alert('POST 请求失败!!');
            }
        });
    });

    //课程管理
    $('#courseManage').click(function () {
        $('div.all_info').load("courseManage.html");
    });
    //查询所有课程信息
    $('#allCourse_info').click(function () {
        $('div.all_info').load("courseRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/course"  ,
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
                    tbBody += "<tr><td>" + n.couId + "</td>" + "<td>" + n.couName + "</td>" + "<td>" + n.credit + "</td>"
                            +"<td>" + n.type + "</td>" + "<td>"+ n.nature + "</td>" + "<td>"+ n.necessity + "</td>" +
                            "<td><a onclick='delAllCourse(this,"+ n.couId + ")'>删除</a>" +
                            " <a target='_parent' onclick='editAllCourse(" + n.couId + ")'>修改</a></td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //查询个别课程信息
    $('#checkedCourse').click(function () {
        $('div.all_info').load("courseRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/course?couName=" + $('#couName').val()  ,
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
                    tbBody += "<tr><td>" + n.couId + "</td>" + "<td>" + n.couName + "</td>" + "<td>" + n.credit + "</td>"
                        +"<td>" + n.type + "</td>" + "<td>"+ n.nature + "</td>" + "<td>"+ n.necessity + "</td>" +
                        "<td><a onclick='delAllCourse(this,"+ n.couId + ")'>删除</a>" +
                        " <a target='_parent' onclick='editAllCourse(" + n.couId + ")'>修改</a></td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //添加课程信息
    $('#addCourse').click(function () {
        $('div.all_info').load("courseRollForm.html");
    });
    $('#courseInfo_roll').click(function () {
        $.ajax({
            //请求方式
            type: 'POST',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/course',
            //数据
            data: JSON.stringify({  //解决错误码400
                'couName' :       $('#couName').val(),
                'credit' :           $('#credit').val(),
                'type' :       $('#type').val(),
                'nature' :       $('#nature').val(),
                'necessity' :       $('#necessity').val()
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType : 'json',
            success:function(response) {
                //请求成功函数内容
                if(response.result == 'success'){
                    alert('录入成功!');
                    $('div.all_info').load("courseRollForm.html");
                }
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('POST 请求失败!!');
            }
        });
    });
    //查询学生选课记录
    $('#studentChoice').click(function () {
        $('div.all_info').load("studentChoiceRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/choice"  ,
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
                    tbBody += "<tr><td>" + n.stuId + "</td><td>" + n.choiceId + "</td><td>" + n.couName + "</td><td>" +
                        n.chooseDate + "</td><td>"+ n.withdrawDate + "</td><td><a onclick='delChoice("+
                        n.choiceId + ")'>删除</a></td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //查询个别学生选课记录
    $('#checkedChoice').click(function () {
        $('div.all_info').load("studentChoiceRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/choice?stuId=" + $('#stuId').val() + '&couName=' + $('#couName').val()  ,
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
                    tbBody += "<tr><td>" + n.stuId + "</td><td>" + n.choiceId + "</td><td>" + n.couName + "</td><td>" +
                        n.chooseDate + "</td><td>"+ n.withdrawDate + "</td> <td><a onclick='delChoice("+
                        n.choiceId + ")'>删除</a></td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //查询学生可选课程
    $('#studentCourse').click(function () {
        $('div.all_info').load("studentCourseRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/StuCourse"  ,
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
                    tbBody += "<tr><td>" + n.id + "</td><td>" + n.couName + "</td><td>" + n.graName +
                        "</td><td>"+ n.proName + "</td><td><a onclick='delSelectedCourse(this,"+ n.id + ")'>删除</a>  " +
                        "<a target='_parent' onclick='editSelectedCourse(" + n.id + ")'>修改</a></td></tr>";;
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //查询学生个别可选课程
    $('#checkedStudentCourse').click(function () {
        $('div.all_info').load("studentCourseRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/StuCourse?couName=" + $('#couName').val()  ,
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
                    tbBody += "<tr><td>" + n.id + "</td><td>" + n.couName + "</td><td>" + n.graName +
                        "</td><td>"+ n.proName + "</td><td><a onclick='delSelectedCourse(this,"+ n.id + ")'>删除</a>  " +
                        "<a target='_parent' onclick='editSelectedCourse(" + n.id + ")'>修改</a></td></tr>";;
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //添加可选课程
    $('#addStudentCourse').click(function () {
        $('div.all_info').load("addStudentCourseRollForm.html");
    });
    $('#addStudentSelectedCourse').click(function () {
        $.ajax({
            //请求方式
            type: 'POST',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/StuCourse',
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //数据
            data: JSON.stringify({  //解决错误码400
                'graName' :       $('#graName').val(),
                'proName' :           $('#proName').val(),
                'couName' :       $('#couName').val()
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType : 'json',
            success:function(response) {
                //请求成功函数内容
                console.log(response.result);
                if(response.result == 'success'){
                    alert('录入成功!');
                    $('div.all_info').load("addStudentCourseRollForm.html");
                }
                else if(response.result == 'fail'){
                    alert('添加失败！');
                }
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('POST 请求失败!!');
            }
        });
    });


    //时间设定
    //查询时间
    $('#timeSet').click(function () {
        $('div.all_info').load("setTime.html");
    });
    $('#checkedTime').click(function () {
        $('div.all_info').load("timeRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/time"  ,
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
                    tbBody += "<tr><td>" + n.timeId + "</td>" + "<td>" + n.graName + "</td>" + "<td>" + n.start + "</td>"
                        +"<td>" + n.end + "</td>" + "<td>"+ n.type + "</td>" +  "<td><a onclick='delTime(this,"+ n.timeId + ")'>删除</a>"
                        + " <a target='_parent' onclick='editTime(" + n.timeId + ")'>修改</a></td></tr>";
                    $(".tbBody").append(tbBody);
                });
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });
    //添加时间
    $('#setTime').click(function () {
        $('div.all_info').load("timeRollForm.html");
    });
    $('#timeInfo_roll').click(function () {
        $.ajax({
            //请求方式
            type: 'POST',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/time',
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //数据
            data: JSON.stringify({  //解决错误码400
                'graName' :       $('#graName').val(),
                'start' :           $('#start').val(),
                'end' :       $('#end').val(),
                'type' :       $('#type').val()
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType : 'json',
            success:function(response) {
                //请求成功函数内容
                console.log(response.result);
                if(response.result == 'success'){
                    alert('录入成功!');
                    $('div.all_info').load("timeRollForm.html");
                }
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('POST 请求失败!!');
            }
        });
    });

    //个人信息修改
    $('.change_info').click(function () {
        $('div.all_info').load("changeInfo.html");
    });

    //修改学生信息
    $('#changeStudentInfo').click(function () {
        editStudent1(studentId);
    });

    //修改所有课程信息
    $('#changeAllCourseInfo').click(function () {
        editAllCourse1(courseId);
    });

    //修改可选课程信息
    $('#changeSelectedCourseInfo').click(function () {
        editSelectedCourse1(s_id);
    });

    //修改时间
    $('#changeTimeInfo').click(function () {
        editTime1(time_id);
    });
});

var studentId,courseId,time_id,s_id;


//查询管理员个人信息
function managerInfo() {
    $('div.all_info').load("teacher_info.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/self" ,
        //url: "http://192.168.137.1:8080/CourseSystem/manager/self" ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function (i, n) {
                let  tbody = '';
                tbody = "<tr><th>学号</th> <td>" + n.manId + "</td></tr>" +
                            "<tr><th>姓名</th> <td>" + n.manName + "</td></tr>" +
                            "<tr><th>性别</th> <td>" + n.sex + "</td></tr>" +
                            "<tr><th>年级</th> <td>" + n.job + "</td></tr>" +
                            "<tr><th>学院</th> <td>" + n.phone + "</td></tr>" +
                            "<tr><th>专业</th> <td>" + n.graName + "</td></tr>" +
                            "<tr><th>创建时间</th> <td>" + n.createDate + "</td></tr>";
                $('#table').append(tbody);
            })
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

//删除学生信息
function delStudent(i,stuId){
    alert("是否删除该学生信息？");
    i.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/student?stuId=' + stuId  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            if(data.result == 'success'){
                alert('删除成功！');
            }
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
//修改学生信息
function editStudent(stuId){
    studentId = stuId;
    $('div.all_info').load('changeStudentInfo.html');
}
function editStudent1(stuId){
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/student' ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        data: JSON.stringify({
            stuId : stuId,
            stuName :  $('#stuName').val(),
            graName :  $('#graName').val(),
            sex :  $('#sex').val(),
            acaName :  $('#acaName').val(),
            proName : $('#proName').val(),
            claName :  $('#claName').val(),
            phone :  $('#phone').val(),
            createDate :  $('#createDate').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            if(data.result == 'success'){
                alert('修改成功!');
            }
            $('div.all_info').load("changeStudentInfo.html");
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

//删除学生选课记录
function delChoice(choiceId){
    alert("是否删除该学生选课信息？");
    alert(choiceId);
    choiceId.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/choice?choiceId=' + choiceId,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('删除成功！');
            }
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

//删除所有课程信息
function delAllCourse(i,couId){
    alert("是否删除该课程？");
    i.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/course?couId=' + couId  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            if(data.result == 'success'){
                alert('删除成功！');
            }
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
//修改所有课程信息
function editAllCourse(couId){
    courseId = couId;
    $('div.all_info').load('changeAllCourseInfo.html');
}
function editAllCourse1(couId){
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/course' ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        data: JSON.stringify({
            "couId" : couId,
            "couName" :  $('#couName').val(),
            "credit" :  $('#credit').val(),
            "type" :  $('#type').val(),
            "nature" :  $('#nature').val(),
            "necessity" : $('#necessity').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            if(data.result == 'success'){
                alert('修改成功!');
            }
            $('div.all_info').load("changeAllCourseInfo.html");
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

//删除可选课程信息
function delSelectedCourse(i,id){
    alert("是否删除该课程？");
    i.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/StuCourse?stuCourseId=' + id  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            if(data.result == 'success'){
                alert('删除成功！');
            }
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
//修改可选课程信息
function editSelectedCourse(id){
    s_id = id;
    $('div.all_info').load('changeSelectedCourseInfo.html');
}
function editSelectedCourse1(id){
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/StuCourse' ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        data: JSON.stringify({
            "id" : id,
            "couName" :  $('#couName').val(),
            "graName" :  $('#graName').val(),
            "proName" :  $('#proName').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('修改成功!');
                $('div.all_info').load("changeSelectedCourseInfo.html");
            }
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}


//删除时间
function delTime(i,timeId){
    alert("是否删除该时间？");
    i.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/time?timeId=' + timeId  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            if(data.result == 'success'){
                alert('删除成功！');
            }
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
//修改时间
function editTime(timeId){
    time_id = timeId;
    $('div.all_info').load('changeTimeInfo.html');
}
function editTime1(timeId){
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/time' ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        data: JSON.stringify({
            "timeId" : timeId,
            "graName" :  $('#graName').val(),
            "start" :  $('#start').val(),
            "end" :  $('#end').val(),
            "type" :  $('#type').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            if(data.result == 'success'){
                alert('修改成功!');
            }
            $('div.all_info').load("changeTimeInfo.html");
        },
        error : function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

