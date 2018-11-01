var lis = document.querySelectorAll("#example1 li");
var len = lis.length;
//切换页签样式：遍历li，给li绑定onclick事件
for (var i = 0; i < len; i++) {
    lis[i].onclick = function () {
        //切换页签样式↓
        for (var i = 0; i < len; i++) {
            if (lis[i] == this) {//判断是否为当前对象
                lis[i].style.background = "rgb(0, 38, 255)";
                lis[i].querySelector("a").style.color = "white";
            } else {
                lis[i].style.background = "white";
                lis[i].querySelector("a").style.color = "black";
            }
        }
    }
}