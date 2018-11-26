$(document).ready(function(){
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/student/self" ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log("test"+JSON.stringify(data.result));
            $('#stuId').val(data.result[0].stuId);
            $('#stuName').val(data.result[0].stuName);
            $('#sex').val(data.result[0].sex);
            $('#graName').val(data.result[0].graName);
            $('#acaName').val(data.result[0].acaName);
            $('#proClass').val(data.result[0].proName+data.result[0].claName);
            $('#phone').val(data.result[0].phone);
            $('#createDate').val(data.result[0].createDate);
            /*$.each(data.result, function (i, n) {
                let tbody = '';
                tbody += "<tr><th>学号</th> <td>" + n.stuId + "</td></tr>" +
                    "<tr><th>姓名</th> <td>" + n.stuName + "</td></tr>" +
                    "<tr><th>性别</th> <td>" + n.sex + "</td></tr>" +
                    "<tr><th>年级</th> <td>" + n.graName + "</td></tr>" +
                    "<tr><th>学院</th> <td>" + n.acaName + "</td></tr>" +
                    "<tr><th>专业</th> <td>" + n.proName + "</td></tr>" +
                    "<tr><th>班级</th> <td>" + n.claName + "</td></tr>" +
                    "<tr><th>联系号码</th> <td>" + n.phone + "</td></tr>" +
                    "<tr><th>创建时间</th> <td>" + n.createDate + "</td></tr>";
                $('#table').append(tbody);


            })*/
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('请求失败!!');
        }
    });

})
