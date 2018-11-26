$(document).ready(function(){
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
})
