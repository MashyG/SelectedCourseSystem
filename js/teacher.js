//获取id，并写入
var loc = window.location.href;
var n2 = loc.indexOf("=");//取得=号的位置
var n3 = loc.indexOf("&");//取得&号的位置
var name = loc.substr(n2 + 1, n3 - n2 - 1);//从=号后面且&号之前的内容

$(document).ready(function () {
    $('#xxxName').html(name);
});

var s_id, courseId, studentId, time_id;

//查询教务员个人信息(未完成)
function TeacherInfo() {
    $('div.all_info').load("teacher_info.html");

}
//修改教务员个人信息(电话号码)
function changeTeacherInfo() {
    $('div.all_info').load("changeInfo.html");
}
function changeTeacherPhone() {
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/student/self/modifyPhone?phone=" + $('#phone').val(),
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
                $('div.all_info').load("changeInfo.html");
            }
        },
        error: function (data) {
            //请求失败函数内容
            //alert('查询失败!!');
            console.log(data.result);
        }
    });
}

//学生管理
function manageStudent() {
    $('div.all_info').load("studentManage.html");
}
//查询所有学生信息
function studentInfo() {
    $('div.all_info').load("studentRollList.html");
}
//查询个别学生信息
function checkedStudentInfo() {
    $('div.all_info').load("studentRollList.html");
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
                    "<a onclick='delStudent(this," + n.stuId + ")'>删除</a> <a target='_parent' onclick='editStudent(" + n.stuId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}
//修改学生信息
function editStudent(stuId) {
    studentId = stuId;
    $('div.all_info').load('changeStudentInfo.html');
}
function changeStudentInfo1() {
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/student',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: JSON.stringify({
            stuId: studentId,
            stuName: $('#stuName').val(),
            graName: $('#graName').val(),
            sex: $('#sex').val(),
            acaName: $('#acaName').val(),
            proName: $('#proName').val(),
            claName: $('#claName').val(),
            phone: $('#phone').val(),
            createDate: $('#createDate').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            if (data.result == 'success') {
                alert('修改成功!');
            }
            $('div.all_info').load("changeStudentInfo.html");
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//添加学生信息
function addStudentInfo() {
    $('div.all_info').load("addStudent.html");
}
function addStudentInfo1() {
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
                $('div.all_info').load("studentRollList.html");
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}

//课程管理
function courseManageInfo() {
    $('div.all_info').load("courseManage.html");
}
//查询所有课程信息
function allCourseInfo() {
    $('div.all_info').load("courseRollList.html");
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
                    "<td><a onclick='delAllCourse(this," + n.couId + ")'>删除</a>" +
                    " <a target='_parent' onclick='editAllCourse(" + n.couId + ")'>修改</a></td></tr>";
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
    $('div.all_info').load("courseRollList.html");
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
                    "<td><a onclick='delAllCourse(this," + n.couId + ")'>删除</a>" +
                    " <a target='_parent' onclick='editAllCourse(" + n.couId + ")'>修改</a></td></tr>";
                $(".tbBody").append(tbBody);
            });
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//添加课程信息
function addCourseInfo() {
    $('div.all_info').load("courseRollForm.html");
}
function courseInfoRoll() {
    alert("test");
    $.ajax({
        //请求方式
        type: 'POST',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/course',
        //数据
        data: JSON.stringify({  //解决错误码400
            'couName': $('#couName').val(),
            'credit': $('#credit').val(),
            'type': $('#type').val(),
            'nature': $('#nature').val(),
            'necessity': $('#necessity').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success: function (response) {
            //请求成功函数内容
            if (response.result == 'success') {
                alert('录入成功!');
                $('div.all_info').load("courseRollForm.html");
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//删除所有课程信息
function delAllCourse(i, couId) {
    alert("是否删除该课程？");
    i.parentNode.parentNode.remove();
    $.ajax({
        //请求方式
        type: 'DELETE',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/manager/course?couId=' + couId,
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
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//修改所有课程信息
function editAllCourse(couId) {
    courseId = couId;
    $('div.all_info').load('changeAllCourseInfo.html');
}
function changeAllCourseInfo1() {
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
            }
            $('div.all_info').load("changeAllCourseInfo.html");
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//查询学生选课记录
function studentChoiceInfo() {
    $('div.all_info').load("studentChoiceRollList.html");
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
                        n.chooseDate + "</td><td>--</td><td><a onclick='delChoice(" +
                        n.choiceId + ")'>删除</a></td></tr>";
                }
                else {
                    tbBody += "<tr><td>" + n.stuId + "</td><td>" + n.choiceId + "</td><td>" + n.couName + "</td><td>" +
                        n.chooseDate + "</td><td>" + n.withdrawDate + "</td><td><a onclick='delChoice(" +
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
    $('div.all_info').load("studentChoiceRollList.html");
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
                        n.chooseDate + "</td><td>--</td><td><a onclick='delChoice(" +
                        n.choiceId + ")'>删除</a></td></tr>";
                }
                else {
                    tbBody += "<tr><td>" + n.stuId + "</td><td>" + n.choiceId + "</td><td>" + n.couName + "</td><td>" +
                        n.chooseDate + "</td><td>" + n.withdrawDate + "</td><td><a onclick='delChoice(" +
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
function delChoice(choiceId) {
    alert("是否删除该学生选课信息？");
    choiceId.parentNode.parentNode.remove();
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
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//查询学生可选课程
function studentCourseInfo() {
    $('div.all_info').load("studentCourseRollList.html");
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
                    "</td><td>" + n.proName + "</td><td><a onclick='delSelectedCourse(this," + n.id + ")'>删除</a>  " +
                    "<a target='_parent' onclick='editSelectedCourse(" + n.id + ")'>修改</a></td></tr>";;
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
    $('div.all_info').load("studentCourseRollList.html");
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
                    "</td><td>" + n.proName + "</td><td><a onclick='delSelectedCourse(this," + n.id + ")'>删除</a>  " +
                    "<a target='_parent' onclick='editSelectedCourse(" + n.id + ")'>修改</a></td></tr>";;
                $(".tbBody").append(tbBody);
            });
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//添加可选课程
function addStudentCourseInfo() {
    $('div.all_info').load("addStudentCourseRollForm.html");
}
function addStudentSelectedCourseInfo() {
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
        success: function (response) {
            //请求成功函数内容
            console.log(response.result);
            if (response.result == 'success') {
                alert('录入成功!');
                $('div.all_info').load("addStudentCourseRollForm.html");
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//删除可选课程信息
function delSelectedCourse(i, id) {
    alert("是否删除该课程？");
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
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//修改可选课程信息
function editSelectedCourse(id) {
    s_id = id;
    $('div.all_info').load('changeSelectedCourseInfo.html');
}
function changeSelectedCourseInfo1() {
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
                $('div.all_info').load("changeSelectedCourseInfo.html");
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}


//时间设定
//查询时间
function timeSetting() {
    $('div.all_info').load("setTime.html");
}
function checkedTimeInfo() {
    $('div.all_info').load("timeRollList.html");
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
                    + "<td>" + n.end + "</td>" + "<td>" + n.type + "</td>" + "<td><a onclick='delTime(this," + n.timeId + ")'>删除</a>"
                    + " <a target='_parent' onclick='editTime(" + n.timeId + ")'>修改</a></td></tr>";
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
    $('div.all_info').load("timeRollForm.html");
}
function timeInfoRoll() {
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
            if (data.result == 'success') {
                alert('录入成功!');
                $('div.all_info').load("timeRollForm.html");
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//删除时间
function delTime(i, timeId) {
    alert("是否删除该时间？");
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
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
//修改时间
function editTime(timeId) {
    time_id = timeId;
    $('div.all_info').load('changeTimeInfo.html');
}
function changeTimeInfo1() {
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
                $('div.all_info').load("changeTimeInfo.html");
            }
        },
        error: function (data) {
            //请求失败函数内容
            console.log(data.result);
        }
    });
}
