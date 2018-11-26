function checkCourse(){
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
    $('div.all_info').load("checkCourseList.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/student/choice'  ,
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
                tbBody += "<tr><td>" + n.choiceId + "</td>" + "<td>" + n.stuId + "</td><td>" + n.couName +
                    "</td><td>" + n.chooseDate + "</td><td>" + n.withdrawDate + "</td><td><a target='_parent' onclick='withdraw("+
                    n.choiceId + ")'>退选</a></td></tr>";
                $("#check-table").append(tbBody);
            });
        },
        error:function(data){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

function selectCourse(){
    $('div.all_info').load("selectCourseList.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem//student/course'  ,
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
                tbBody += "<tr><td>"+ n.couId + "</td>" + "<td>" + n.couName + "</td>" + "<td>" + n.credit + "</td>" +
                    "<td>" + n.type + "</td>" + "<td>" + n.nature + "</td>" + "<td>" + n.necessity + "</td><td>" +
                    "<a target='_parent' onclick='selectedCourse("+ n.couId +")' >选修</a></td></tr>";
                selectedCourseName[n.couId] = n.couName;
                $("#select-table").append(tbBody);
            });
        },
        error:function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

//选修课程
var selectedCourseName = [];
function selectedCourse(couId) {
    $('div.all_info').load("selectCourseList.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem//student/course'  ,
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
                tbBody += "<tr><td>"+ n.couId + "</td>" + "<td>" + n.couName + "</td>" + "<td>" + n.credit + "</td>" +
                    "<td>" + n.type + "</td>" + "<td>" + n.nature + "</td>" + "<td>" + n.necessity + "</td><td>" +
                    "<a target='_parent' onclick='selectedCourse("+ n.couId +")' >选修</a></td></tr>";
                selectedCourseName[n.couId] = n.couName;
                $("#select-table").append(tbBody);
            });
        },
        error:function(){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/student/choose?couName=' + selectedCourseName[couId] ,
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
                alert('选修成功!');
            }
            else if(data.result == 'fail'){
                alert('未到选课时间!!');
            }

        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

