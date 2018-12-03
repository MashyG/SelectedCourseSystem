$(document).ready(function () {
    studentInfo();

});

var s_id, courseId, studentId, time_id;

//修改教务员个人信息(电话号码)
function editInfo(){
    $('#phone').removeAttr("readonly");
    $('#phone').focus();
}
function saveInfo(){
    let studentPhone = $('#phone').val();
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;     //联系号码的正则表达式
    if(reg.test(studentPhone)) {
        $.ajax({
            //请求方式
            type: 'PUT',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/self?phone=" + $('#phone').val(),
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
                if (data.result == 'success') {
                    alert('修改成功！');
                    window.close();
                }
            },
            error: function (data) {
                //请求失败函数内容
                alert('修改失败!!');
                console.log(data.result);
            }
        });
    }
    else{
        alert("联系号码有误，请重新输入");
    }
}

//学生管理
//查询所有学生信息
function studentInfo() {
    $('div.all_info').load("studentRollList.html #list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/student",
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
                tbBody += "<tr><td>" + n.stuId + "</td>" + "<td>" + n.stuName + "</td>" + "<td>" + n.sex + "</td>"
                    + "<td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>" +
                    "<td>" + n.claName + "</td>" + "<td>" + n.phone + "</td>" + "<td>" + n.createDate + "</td><td>" +
                    "<a id='withdraw' onclick='delStudent(this," + n.stuId + ")'>删除</a>" +
                    " <a id='select' target='_parent' onclick='editStudent(" + n.stuId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
//查询个别学生信息
function checkedStudentInfo() {
    $('div.all_info').load("studentRollList.html #list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/student?stuId=" + $('#stuId').val() + '&stuName=' + $('#stuName').val(),
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
                tbBody += "<tr><td>" + n.stuId + "</td>" + "<td>" + n.stuName + "</td>" + "<td>" + n.sex + "</td>"
                    + "<td>" + n.graName + "</td>" + "<td>" + n.acaName + "</td>" + "<td>" + n.proName + "</td>" +
                    "<td>" + n.claName + "</td>" + "<td>" + n.phone + "</td>" + "<td>" + n.createDate + "</td><td>" +
                    "<a id='withdraw' onclick='delStudent(this," + n.stuId + ")'>删除</a>" +
                    " <a id='select' target='_parent' onclick='editStudent(" + n.stuId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
//删除学生信息
function delStudent(i,stuId){
    let r = confirm("是否删除该学生信息？");
    if(r == true){
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
                    studentInfo();
                }
                else{
                    alert(data.msg);
                }
            },
            error:function(data){
                //请求失败函数内容
                console.log(data.result);
                alert("删除失败！");
            }
        });
    }
}
//修改学生信息
function editStudent(stuId) {
    studentId = stuId;
    $('div.all_info').load('changeStudentInfo.html .list-body');
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/student?stuId=" + stuId ,
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
                $('#stuName').val(n.stuName);
                $('#sex').val(n.sex);
                $('#graName').val(n.graName);
                $('#acaName').val(n.acaName);
                $('#proName').val(n.proName);
                $('#claName').val(n.claName);
                $('#phone').val(n.phone);
                $('#createDate').val(n.createDate);
            });
        },
        error: function (data) {
            //请求失败函数内容
            //alert('查询失败!!');
            console.log(data.result);
        }
    });
}
function changeStudentInfo1() {
    let studentPhone = $('#phone').val();
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;     //联系号码的正则表达式
    if($('#stuName').val() == ''){
        alert("学生姓名不能为空！");
        return;
    }
    if($('#sex').val() == ''){
        alert("性别不能为空！");
        return;
    }
    if($('#graName').val() == ''){
        alert("年级不能为空！");
        return;
    }
    if($('#acaName').val() == ''){
        alert("学院不能为空！");
        return;
    }
    if($('#proName').val() == ''){
        alert("专业不能为空！");
        return;
    }
    if($('#claName').val() == ''){
        alert("班级不能为空！");
        return;
    }
    if($('#phone').val() == ''){
        alert("联系电话不能为空！");
        return;
    }
    else if(reg.test(studentPhone)){
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
                stuId : studentId,
                stuName :  $('#stuName').val(),
                graName :  $('#graName').val(),
                sex :  $('#sex').val(),
                acaName :  $('#acaName').val(),
                proName : $('#proName').val(),
                claName :  $('#claName').val(),
                phone :  $('#phone').val(),
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType: 'json',
            success:function(data) {
                //请求成功函数内容
                if(data.result == 'success'){
                    alert('修改成功!');
                    studentInfo();
                }
                else{
                    alert(data.msg);
                }
            },
            error:function(data){
                //请求失败函数内容
                console.log(data.result);
                alert("修改失败！");
            }
        });
    }
    else{
        alert("联系号码有误，请重新输入");
    }
}
//修改学生密码
function editStudentPWD() {
    $('div.all_info').load('changeStudentPWD.html .list-body');
}
function changeStudentPWD1() {
    if($('#newPWD1').val() == '' || $('#newPWD2').val() == ''){
        alert("新密码不能为空！");
        return;
    }
    if($('#newPWD1').val() != '' && $('#newPWD2').val() != ''){
        if($('#newPWD1').val() == $('#newPWD2').val()){
            $.ajax({
                //请求方式
                type: 'PUT',
                //发送请求的地址
                url: 'http://39.108.57.12:8080/CourseSystem/manager/student/modifyPassword?username=' + studentId + '&password=' + $('#newPWD1').val() ,
                xhrFields:{
                    withCredentials:true
                },
                crossDomain:true,
                contentType: 'application/json;charset=UTF-8',//解决错误码415
                //服务器返回的数据类型
                dataType: 'json',
                success:function(data) {
                    //请求成功函数内容
                    console.log("test----" + JSON.stringify(data));
                    if(data.result == 'success'){
                        alert('修改成功!');
                        studentInfo();
                    }
                    else{
                        alert(data.msg);
                    }
                },
                error:function(data){
                    //请求失败函数内容
                    console.log(data.msg);
                }
            });
        }
        else{
            alert("两次输入的新密码不一样，请重新输入！");
        }
    }
}
//添加学生信息
function addStudentInfo() {
    $('div.all_info').load("addStudent.html .list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/self" ,
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
                $('#graName').val(n.graName);
            })
        },
        error: function (data) {
            //请求失败函数内容
            //alert('查询失败!!');
            console.log(data.result);
        }
    });
}
function addStudentInfo1() {
    let studentPhone = $('#phone').val();
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;     //联系号码的正则表达式
    if($('#stuName').val() == ''){
        alert("学生姓名不能为空！");
        return;
    }
    if($('#sex').val() == ''){
        alert("性别不能为空！");
        return;
    }
    if($('#graName').val() == ''){
        alert("年级不能为空！");
        return;
    }
    if($('#acaName').val() == ''){
        alert("学院不能为空！");
        return;
    }
    if($('#proName').val() == ''){
        alert("专业不能为空！");
        return;
    }
    if($('#claName').val() == ''){
        alert("班级不能为空！");
        return;
    }
    if($('#phone').val() == ''){
        alert("联系电话不能为空！");
        return;
    }
    else if(reg.test(studentPhone)){
        $.ajax({
            //请求方式
            type: 'POST',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/student',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //数据
            data: JSON.stringify({  //解决错误码400
                'stuName': $('#stuName').val(),
                'sex': $('#sex').val(),
                'graName': $('#graName').val(),
                'acaName': $('#acaName').val(),
                'proName': $('#proName').val(),
                'claName': $('#claName').val(),
                'phone': $('#phone').val()
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                console.log(data.result);
                if (data.result == 'success') {
                    alert('添加成功!');
                    studentInfo();
                }
                else{
                    alert(data.msg);
                }
            },
            error: function (data) {
                //请求失败函数内容
                console.log(data.result);
                alert("添加失败！");
            }
        });
    }
    else{
        alert("联系号码有误，请重新输入");
    }
}
//导入Excel文件
function upload_container() {
    $('div.all_info').load('upload_container.html .navbar-left');
}
function saveFile(){
    let formData = new FormData();
    let name = $("#articleImageFile").val();
    formData.append("file",$("#articleImageFile")[0].files[0]);
    formData.append("name",name);//这个地方可以传递多个参数
    $.ajax({
        type : 'POST',
        url : "http://39.108.57.12:8080/CourseSystem/manager/student/excel",
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        async : false,
        data : formData,
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        beforeSend:function(){
            console.log("正在进行，请稍候");
        },
        success : function(responseText) {
            if(responseText.result=="success"){
                alert("导入成功");
                studentInfo();
            }else{
                alert("导入失败");
            }
        }
    });
}


//课程管理

//查询所有课程信息
function allCourseInfo() {
    $('div.all_info').load("courseRollList.html #list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/course",
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
                tbBody += "<tr><td>" + n.couId + "</td>" + "<td>" + n.couName + "</td>" + "<td>" + n.credit + "</td>"
                    + "<td>" + n.type + "</td>" + "<td>" + n.nature + "</td>" + "<td>" + n.necessity + "</td>" +
                    "<td><a id='withdraw' onclick='delAllCourse(this," + n.couId + ")'>删除</a>" +
                    " <a id='select' target='_parent' onclick='editAllCourse(" + n.couId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//查询个别课程信息
function checkedCourseInfo() {
    $('div.all_info').load("courseRollList.html #list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/course?couName=" + $('#couName').val(),
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
                tbBody += "<tr><td>" + n.couId + "</td>" + "<td>" + n.couName + "</td>" + "<td>" + n.credit + "</td>"
                    + "<td>" + n.type + "</td>" + "<td>" + n.nature + "</td>" + "<td>" + n.necessity + "</td>" +
                    "<td><a id='withdraw' onclick='delAllCourse(this," + n.couId + ")'>删除</a>" +
                    " <a id='select' target='_parent' onclick='editAllCourse(" + n.couId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//删除课程信息
function delAllCourse(i, couId) {
    let r = confirm("是否删除该课程信息？");
    if(r == true){
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
                    allCourseInfo();
                }
                else{
                    alert(data.msg);
                }
            },
            error:function(data){
                //请求失败函数内容
                console.log(data.result);
                alert("删除失败！");
            }
        });
    }
}
//修改所有课程信息
function editAllCourse(couId) {
    courseId = couId;
    $('div.all_info').load('changeAllCourseInfo.html .list-body');
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/course?couId=" + courseId  ,
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
            $.each(data.result, function (i, n) {
                $('#couName').val(n.couName);
                $('#credit').val(n.credit);
                $('#type').val(n.type);
                $('#nature').val(n.nature);
                $('#necessity').val(n.necessity);
            });
        },
        error: function (data) {
            //请求失败函数内容
            //alert('查询失败!!');
            console.log(data.result);
        }
    });
}
function changeAllCourseInfo1() {
    if($('#couName').val() == ''){
        alert("课程名称不能为空！");
        return;
    }
    if($('#credit').val() == ''){
        alert("学分不能为空！");
        return;
    }
    if($('#type').val() == ''){
        alert("类型不能为空！");
        return;
    }
    if($('#nature').val() == ''){
        alert("性质不能为空！");
        return;
    }
    if($('#necessity').val() == ''){
        alert("是否必选不能为空！");
        return;
    }
    if($('#couName').val() != '' && $('#credit').val() != '' && $('#type').val() != ''
        && $('#nature').val() != '' && $('#necessity').val() != '') {
            $.ajax({
                //请求方式
                type: 'PUT',
                //发送请求的地址
                url: 'http://39.108.57.12:8080/CourseSystem/manager/course',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: JSON.stringify({
                    "couId": courseId,
                    "couName": $('#couName').val(),
                    "credit": $('#credit').val(),
                    "type": $('#type').val(),
                    "nature": $('#nature').val(),
                    "necessity": $('#necessity').val()
                }),
                contentType: 'application/json;charset=UTF-8',//解决错误码415
                //服务器返回的数据类型
                dataType: 'json',
                success: function (data) {
                    //请求成功函数内容
                    if (data.result == 'success') {
                        alert('修改成功!');
                        allCourseInfo();
                    }
                },
                error: function (data) {
                    //请求失败函数内容
                    console.log(data.result);
                }
            });
    }
}
//添加课程信息
function addCourseInfo() {
    $('div.all_info').load("courseRollForm.html .list-body");
}
function courseInfoRoll() {
    if($('#couName').val() == ''){
        alert("课程名称不能为空！");
        return;
    }
    if($('#credit').val() == ''){
        alert("学分不能为空！");
        return;
    }
    if($('#type').val() == ''){
        alert("类型不能为空！");
        return;
    }
    if($('#nature').val() == ''){
        alert("性质不能为空！");
        return;
    }
    if($('#necessity').val() == ''){
        alert("是否必选不能为空！");
        return;
    }
    if($('#couName').val() != '' && $('#credit').val() != '' && $('#type').val() != ''
        && $('#nature').val() != '' && $('#necessity').val() != '' ){
        $.ajax({
            //请求方式
            type: 'POST',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/course',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
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
                    allCourseInfo();
                }
                else{
                    alert(data.msg);
                }
            },
            error:function(data){
                //请求失败函数内容
                console.log(data.result);
                alert("录入失败！");
            }
        });
    }
}
//查询学生选课记录
function studentChoiceInfo() {
    $('div.all_info').load("studentChoiceRollList.html #list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/choice",
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
                if (!n.withdrawDate) {
                    tbBody += "<tr><td>" + n.stuId + "</td><td>" + n.choiceId + "</td><td>" + n.couName + "</td><td>" +
                        n.chooseDate + "</td><td>--</td><td><a id='withdraw' onclick='delChoice(this," +
                        n.choiceId + ")'>删除</a></td></tr>";
                }
                else {
                    tbBody += "<tr><td>" + n.stuId + "</td><td>" + n.choiceId + "</td><td>" + n.couName + "</td><td>" +
                        n.chooseDate + "</td><td>" + n.withdrawDate + "</td><td><a  id='withdraw' onclick='delChoice(this," +
                        n.choiceId + ")'>删除</a></td></tr>";
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
//查询个别学生选课记录
function checkedChoiceInfo() {
    $('div.all_info').load("studentChoiceRollList.html .list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/choice?stuId=" + $('#stuId').val() + '&couName=' + $('#couName').val(),
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
                if (!n.withdrawDate) {
                    tbBody += "<tr><td>" + n.stuId + "</td><td>" + n.choiceId + "</td><td>" + n.couName + "</td><td>" +
                        n.chooseDate + "</td><td>--</td><td><a id='withdraw' onclick='delChoice(this," +
                        n.choiceId + ")'>删除</a></td></tr>";
                }
                else {
                    tbBody += "<tr><td>" + n.stuId + "</td><td>" + n.choiceId + "</td><td>" + n.couName + "</td><td>" +
                        n.chooseDate + "</td><td>" + n.withdrawDate + "</td><td><a id='withdraw' onclick='delChoice(" +
                        n.choiceId + ")'>删除</a></td></tr>";
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
//删除学生选课记录
function delChoice(i,choiceId) {
    let r = confirm("是否删除该选课记录？");
    if(r == true) {
        i.parentNode.parentNode.remove();
        $.ajax({
            //请求方式
            type: 'DELETE',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/choice?choiceId=' + choiceId,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                console.log(data.result);
                if (data.result == 'success') {
                    alert('删除成功！');
                    studentChoiceInfo();
                }
                else{
                    alert(data.msg);
                }
            },
            error: function (data) {
                //请求失败函数内容
                console.log(data.result);
                alert("删除失败！");
            }
        });
    }
}
//查询学生可选课程
function studentCourseInfo() {
    $('div.all_info').load("studentCourseRollList.html #list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/StuCourse",
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
                tbBody += "<tr><td>" + n.id + "</td><td>" + n.couName + "</td><td>" + n.graName +
                    "</td><td>" + n.proName + "</td><td><a id='withdraw' onclick='delSelectedCourse(this," + n.id + ")'>删除</a>  " +
                    "<a id='select' target='_parent' onclick='editSelectedCourse(" + n.id + ")'>修改</a></td></tr>";;
                $(".tbBody").append(tbBody);
            });
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//查询学生个别可选课程
function checkedStudentCourseInfo() {
    $('div.all_info').load("studentCourseRollList.html #list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/StuCourse?couName=" + $('#couName').val(),
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
                tbBody += "<tr><td>" + n.id + "</td><td>" + n.couName + "</td><td>" + n.graName +
                    "</td><td>" + n.proName + "</td><td><a id='withdraw' onclick='delSelectedCourse(this," + n.id + ")'>删除</a>  " +
                    "<a id='select' target='_parent' onclick='editSelectedCourse(" + n.id + ")'>修改</a></td></tr>";;
                $(".tbBody").append(tbBody);
            });
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//为学生自动选择必选课程
function checkedChooseNecessity() {
    let r = confirm("是否为学生自动选择必选课程？");
    if(r == true){
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/chooseNecessity" ,
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //服务器返回的数据类型
            dataType: 'json',
            success:function(data) {
                //请求成功函数内容
                //alert('请求成功!');
                console.log(data.msg);
                alert(data.msg);
                studentCourseInfo();
            },
            error: function (data) {
                //请求失败函数内容
                //alert('查询失败!!');
                console.log(data.result);
            }
        });
    }
}
//添加可选课程
function addStudentCourseInfo() {
    $('div.all_info').load("addStudentCourseRollForm.html .list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/self" ,
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
                $('#graName').val(n.graName);
            })
        },
        error: function (data) {
            //请求失败函数内容
            //alert('查询失败!!');
            console.log(data.msg);
        }
    });
}
function addStudentSelectedCourseInfo() {
    if($('#graName').val() == ''){
        alert("年级不能为空！");
    }
    if($('#proName').val() == ''){
        alert("专业不能为空！");
    }
    if($('#couName').val() == ''){
        alert("课程名称不能为空！");
    }
    if($('#graName').val() != '' && $('#proName').val() != '' && $('#couName').val() != ''){
            $.ajax({
                //请求方式
                type: 'POST',
                //发送请求的地址
                url: 'http://39.108.57.12:8080/CourseSystem/manager/StuCourse',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                //数据
                data: JSON.stringify({  //解决错误码400
                    'graName': $('#graName').val(),
                    'proName': $('#proName').val(),
                    'couName': $('#couName').val()
                }),
                contentType: 'application/json;charset=UTF-8',//解决错误码415
                //服务器返回的数据类型
                dataType: 'json',
                success: function (data) {
                    //请求成功函数内容
                    console.log(data.result);
                    if (data.result == 'success') {
                        alert('录入成功!');
                        studentCourseInfo();
                    }
                    else{
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    //请求失败函数内容
                    console.log(data.result);
                }
            });
    }
}
//删除可选课程信息
function delSelectedCourse(i, id) {
    let r = confirm("是否删除该课程信息？");
    if(r == true) {
        i.parentNode.parentNode.remove();
        $.ajax({
            //请求方式
            type: 'DELETE',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/StuCourse?stuCourseId=' + id,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                if (data.result == 'success') {
                    alert('删除成功！');
                    studentCourseInfo();
                }
                else {
                    alert(data.msg);
                }
            },
            error:function(data){
                //请求失败函数内容
                console.log(data);
                alert("删除失败!");
            }
        });
    }
}
//修改可选课程信息
function editSelectedCourse(id) {
    s_id = id;
    $('div.all_info').load('changeSelectedCourseInfo.html .list-body');
    if($('#graName').val() == ''){
        alert("年级不能为空！");
        return;
    }
    if($('#proName').val() == ''){
        alert("专业不能为空！");
        return;
    }
    if($('#couName').val() == ''){
        alert("课程名称不能为空！");
        return;
    }
    if($('#graName').val() != '' && $('#proName').val() != '' && $('#couName').val() != '') {
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/manager/StuCourse?id=" + s_id,
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
                    $('#couName').val(n.couName);
                    $('#graName').val(n.graName);
                    $('#proName').val(n.proName);
                });
            },
            error: function (data) {
                //请求失败函数内容
                //alert('查询失败!!');
                console.log(data.result);
            }
        });
    }
}
function changeSelectedCourseInfo1() {
    if($('#couName').val() == ''){
        alert("课程名称不能为空！");
    }
    if($('#graName').val() == ''){
        alert("年级不能为空！");
    }
    if($('#proName').val() == ''){
        alert("专业不能为空！");
    }
    if($('#couName').val() != '' && $('#graName').val() != '' && $('#proName').val() != '') {
        $.ajax({
            //请求方式
            type: 'PUT',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/StuCourse',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: JSON.stringify({
                "id": s_id,
                "couName": $('#couName').val(),
                "graName": $('#graName').val(),
                "proName": $('#proName').val()
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                console.log(data.result);
                if (data.result == 'success') {
                    alert('修改成功!');
                    studentCourseInfo();
                }
            },
            error: function (data) {
                //请求失败函数内容
                console.log(data.result);
            }
        });
    }
}


//时间设定
//查询时间
function checkedTimeInfo() {
    $('div.all_info').load("timeRollList.html #list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/time",
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
                tbBody += "<tr><td>" + n.timeId + "</td>" + "<td>" + n.graName + "</td>" + "<td>" + n.start + "</td>"
                    + "<td>" + n.end + "</td>" + "<td>" + n.type + "</td>" + "<td><a id='withdraw' onclick='delTime(this," + n.timeId + ")'>删除</a>"
                    + " <a id='select' target='_parent' onclick='editTime(" + n.timeId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
//添加时间
function addTimeInfo() {
    $('div.all_info').load("timeRollForm.html .list-body");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/self" ,
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
                $('#graName').val(n.graName);
            })
        },
        error: function (data) {
            //请求失败函数内容
            //alert('查询失败!!');
            console.log(data.result);
        }
    });
}
function timeInfoRoll() {
    if($('#graName').val() == ''){
        alert("年级不能为空！");
        return;
    }
    if($('#start').val() == ''){
        alert("开始时间不能为空！");
        return;
    }
    if($('#end').val() == ''){
        alert("结束时间不能为空！");
        return;
    }
    if($('#type').val() == ''){
        alert("类型不能为空！");
        return;
    }
    if($('#graName').val() != '' && $('#start').val() != '' && $('#end').val() != '' && $('#type').val() != '') {
        $.ajax({
            //请求方式
            type: 'POST',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/time',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //数据
            data: JSON.stringify({  //解决错误码400
                'graName': $('#graName').val(),
                'start': $('#start').val(),
                'end': $('#end').val(),
                'type': $('#type').val()
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                console.log(data.result);
                if (data.msg == 'success') {
                    alert('录入成功!');
                    checkedTimeInfo();
                }
                else {
                    alert(data.msg);
                }
            },
            error: function (data) {
                //请求失败函数内容
                console.log(data);
            }
        });
    }
}
//删除时间
function delTime(i, timeId) {
    let r = confirm("是否删除该时间？");
    if(r == true) {
        i.parentNode.parentNode.remove();
        $.ajax({
            //请求方式
            type: 'DELETE',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/time?timeId=' + timeId,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                if (data.result == 'success') {
                    alert('删除成功！');
                    checkedTimeInfo();
                }
                else {
                    alert(data.msg);
                }
            },
            error: function (data) {
                //请求失败函数内容
                console.log(data.result);
                alert("删除失败!");
            }
        });
    }
}
//修改时间
function editTime(timeId) {
    time_id = timeId;
    $('div.all_info').load('changeTimeInfo.html .list-body');
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/time?timeId=" + time_id  ,
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
                $('#graName').val(n.graName);
                $('#start').val(n.start);
                $('#end').val(n.end);
                $('#type').val(n.type);
            });
        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
function changeTimeInfo1() {
    if($('#graName').val() == ''){
        alert("年级不能为空！");
        return;
    }
    if($('#start').val() == ''){
        alert("开始时间不能为空！");
        return;
    }
    if($('#end').val() == ''){
        alert("结束时间不能为空！");
        return;
    }
    if($('#type').val() == ''){
        alert("类型不能为空！");
        return;
    }
    if($('#graName').val() != '' && $('#start').val() != '' && $('#end').val() != '' && $('#type').val() != '') {
        $.ajax({
            //请求方式
            type: 'PUT',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/manager/time',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: JSON.stringify({
                "timeId": time_id,
                "graName": $('#graName').val(),
                "start": $('#start').val(),
                "end": $('#end').val(),
                "type": $('#type').val()
            }),
            contentType: 'application/json;charset=UTF-8',//解决错误码415
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                console.log(data.result);
                if (data.result == 'success') {
                    alert('修改成功!');
                    checkedTimeInfo();
                }
            },
            error: function (data) {
                //请求失败函数内容
                console.log(data.result);
            }
        });
    }
}
