$(document).ready(function(){
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/self",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log("teacherInfo----" + data.result);
            $('#supId').val(data.result[0].manId);
            $('#sex').val(data.result[0].sex);
            $('#graName').val(data.result[0].graName);
            $('#acaName').val(data.result[0].job);
            $('#phone').val(data.result[0].phone);
            $('#createDate').val(data.result[0].createDate);
            /* $.each(data.result, function (i, n) {
                let tbody = '';
                tbody += "<tr><th>学号</th> <td>" + n.manId + "</td></tr>" +
                    "<tr><th>姓名</th> <td>" + n.manName + "</td></tr>" +
                    "<tr><th>性别</th> <td>" + n.sex + "</td></tr>" +
                    "<tr><th>年级</th> <td>" + n.graName + "</td></tr>" +
                    "<tr><th>职务</th> <td>" + n.acaName + "</td></tr>" +
                    "<tr><th>联系号码</th> <td>" + n.phone + "</td></tr>" +
                    "<tr><th>创建时间</th> <td>" + n.createDate + "</td></tr>";
                $('#table').append(tbody);
            }) */
        },
        error: function (data) {
            //请求失败函数内容
            alert('查询失败!!');
            console.log(data.result);
        }
    });
})