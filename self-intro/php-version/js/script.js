window.onload = function () {
    this.startTime = new Date();
    var myHour = this.startTime.getHours();
    var greetString = '';
    if (myHour < 12) {
        greetString += "Good Morning!"
    } else if (myHour < 18) {
        greetString += "Good Afternoon!"
    } else {
        greetString += "Good Evening!"
    }
    // greetString += "   It's " + this.startTime.toLocaleString() + " .";
    document.getElementById("time").textContent = greetString;

    this.setInterval("Timing()",1000);
}

function Timing(){
    var ThisTime = new Date();
    var second = (ThisTime.getTime()-window.startTime.getTime())/1000;
    document.getElementById("timer").innerText = second + ' s';
    return second;
}

function verifyRadio(name, answer, point = 5) {
    var nodes = document.getElementsByName(name);
    var res = "";
    for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];
        if (element.checked) {
            res += element.value;
        }
    }

    if (res == answer) {
        return point;
    }
    return 0;
}

function verifyCheckbox(name, answer, totalpoint = 5) {
    // answer => Array()
    var nodes = document.getElementsByName(name);
    var res = new Array();

    for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];
        if (element.checked) {
            res.push(element.value);
        }
    }
    for (let i = 0; i < res.length; i++) {
        res[i]
        if (answer.indexOf(res[i]) == -1) {
            return 0; // 有错误， 0分
        }
    }
    console.log(1.0 * totalpoint / answer.length * res.length)
    return totalpoint / answer.length * res.length;
}

function tryToRun(code) {
    console.log(code);
    (code);
    try {
        eval(code);
    } catch (err) {
        alert('code error: ' + err.message);
        // console.log('err sdfa');
        return false;
    }
    // console.log('ok');
    return true;
}
var func = function () {};

function verifyCode(name, input, answer, point = 5) {
    var code = "func = " + document.getElementsByName(name)[0].value;
    ret = tryToRun(code);
    if (ret == false) {
        return 0;
    }
    if (func(input) === answer) {
        return point;
    }
    return 0;
}



document.getElementById("button").onclick = function () {
    // 检查是否为空
    var name = document.getElementById("name");
    var email = document.getElementById("mail");
    var id = document.getElementById("id");
    if (name.value === "" || email.value === "" || id.value === "") {
        alert("基本信息未填写完毕！");
        return false;
    }



    // 计算分数

    score = 0;
    score += verifyRadio('q1', "C");
    score += verifyRadio('q2', "C");
    score += verifyCheckbox('q3', ['B', 'D'], );
    score += verifyCheckbox('q4', ['A', 'B', 'C', 'D']);
    score += verifyCode('q5', 3, 9);

    var endTime = new Date();
    var totalTime = Timing();
    alert('\nyour point is ' + score + ' / ' + 25 + '\n\n' + '总时间: ' + totalTime + ' seconds');
    // console.log((endTime - window.startTime) / 1000 + ' seconds');
    var node = document.getElementById("score").value = score;
    document.getElementById("form").submit();
    return true; // 阻断
}

var a;
function testfunc(first) {
    window.a = this
}

document.getElementById("test-box").onclick=testfunc;