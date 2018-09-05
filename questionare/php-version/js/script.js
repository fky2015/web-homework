$(function () {
  window.startTime = new Date()
  var myHour = window.startTime.getHours()
  var greetString = ''
  if (myHour < 12) {
    greetString += 'Good Morning!'
  } else if (myHour < 18) {
    greetString += 'Good Afternoon!'
  } else {
    greetString += 'Good Evening!'
  }
  // greetString += "   It's " + this.startTime.toLocaleString() + " ."
  document.getElementById('time').textContent = greetString

  window.Timing = function () {
    var ThisTime = new Date()
    var second = (ThisTime.getTime() - window.startTime.getTime()) / 1000
    document.getElementById('timer').innerText = (0 | second) + ' s'
    return second
  }

  document.interval = setInterval('Timing()', 1000);

  function verifyRadio(name, answer, point = 5) {
    var nodes = document.getElementsByName(name)
    var res = ''
    for (let i = 0; i < nodes.length; i++) {
      const element = nodes[i]
      if (element.checked) {
        res += element.value
      }
    }

    if (res == answer) {
      return point
    }
    return 0
  }

  function verifyCheckbox(name, answer, totalpoint = 5) {
    // answer => Array()
    var nodes = document.getElementsByName(name)
    var res = []

    for (let i = 0; i < nodes.length; i++) {
      const element = nodes[i]
      if (element.checked) {
        res.push(element.value)
      }
    }
    for (let i = 0; i < res.length; i++) {
      res[i]
      if (answer.indexOf(res[i]) == -1) {
        return 0; // 有错误， 0分
      }
    }
    console.log(1.0 * totalpoint / answer.length * res.length)
    return totalpoint / answer.length * res.length
  }

  function tryToRun(code) {
    console.log(code);
    (code)
    try {
      eval(code)
    } catch (err) {
      alert('code error: ' + err.message)
      // console.log('err sdfa')
      return false
    }
    // console.log('ok')
    return true
  }

  var func = function () {}

  function verifyCode(name, input, answer, point = 5) {
    var code = 'func = ' + document.getElementsByName(name)[0].value
    ret = tryToRun(code)
    if (ret == false) {
      return 0
    }
    if (func(input) === answer) {
      return point
    }
    return 0
  }

  var submit_func = function (event) {
    event.preventDefault();

    // 检查是否为空
    var name = document.getElementById('name');
    var email = document.getElementById('mail');
    var id = document.getElementById('id');
    if (name.value === '' || email.value === '' || id.value === '') {
      alert('基本信息未填写完毕！');
      return false
    }

    // 计算分数

    score = 0
    score += verifyRadio('q1', 'C')
    score += verifyRadio('q2', 'C')
    score += verifyCheckbox('q3', ['B', 'D'])
    score += verifyCheckbox('q4', ['A', 'B', 'C', 'D'])
    score += verifyCode('q5', 3, 9)

    var endTime = new Date();
    var totalTime = Timing();
    // alert('\nyour point is ' + score + ' / ' + 25 + '\n\n' + '总时间: ' + totalTime + ' seconds')
    // console.log((endTime - window.startTime) / 1000 + ' seconds')
    var node = document.getElementById('score').value = score;

    // 停止计时
    clearInterval(document.interval);

    $.ajax({
      type: 'POST',
      url: 'add.php',
      data: {
        name: name.value,
        score: score,
        time: totalTime
      },
      timeout: 3000,
      success: function (msg) {
        // 提交成功后的回调函数
        $('button').hide('fast');
        $('#success').fadeIn('slow');

      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('button')[0].innerText = '连网失败';
      }
    });

    return false; // 阻断
  }

  function query(event) {
    var name = $("#name")[0].value;
    if (event.ctrlKey) {
      name = '';
    }
    $.ajax({
      type: 'POST',
      url: 'query.php',
      data: {
        name: name
      },
      timeout: 2000,
      success: function (msg) {
        // 提交成功后的回调函数
        // console.log('let it be');

        $('#result-table')[0].innerHTML = msg;
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $("#check-score")[0].innerText = '连网失败';
      }
    });
  };

  document.getElementById("form").onsubmit = submit_func;
  document.getElementById("check-score").onclick = query;

});
