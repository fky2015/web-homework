$(function () {
  window.startTime = new Date()

  // 打印greeting
  var myHour = window.startTime.getHours()
  var greetString = ''
  if (myHour < 12) {
    greetString += 'Good Morning!'
  } else if (myHour < 18) {
    greetString += 'Good Afternoon!'
  } else {
    greetString += 'Good Evening!'
  }
  document.getElementById('time').textContent = greetString

  window.Timing = function () {
    // 计算并更新时间
    var ThisTime = new Date()
    var second = (ThisTime.getTime() - window.startTime.getTime()) / 1000
    document.getElementById('timer').innerText = (0 | second) + ' s'
    return second
  }

  // 设置定时刷新
  document.interval = setInterval('Timing()', 1000)

  function verifyRadio (name, answer, point = 5) {
    // 单选题判断
    // name : id of element
    // answer : string
    // point : int
    // return resultScore
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

  function verifyCheckbox (name, answer, totalpoint = 5) {
    // 多选题判断
    // name : id of element
    // answer : Array()
    // totalpoint : int
    // return resultScore
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

  function tryToRun (code) {
    // 判题
    try {
      eval(code)
    } catch (err) {
      return false
    }
    return true
  }

  var func = function () {}

  function verifyCode (name, input, answer, point = 5) {
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

  function show_score (herf_value, score , totalscore) {
    // 显示分数到导航栏
    $("a[href='" + herf_value + "']")[0].innerText = score + ' / ' + totalscore
    return score
  }

  var submit_func = function (event) {
    // 计算分数并提交
    event.preventDefault()

    // 检查是否为空
    var name = document.getElementById('name')
    var email = document.getElementById('mail')
    var id = document.getElementById('id')
    if (name.value === '' || email.value === '' || id.value === '') {
      alert('基本信息未填写完毕！')
      return false
    }

    // 计算分数
    score = 0
    
    try {
      score += show_score('#field4', verifyCode('q5', 3, 9), 5)
    } catch(err) {
      alert('code error: ' + err.message)
      return false; // 阻断
    }
    score += show_score('#field2', verifyRadio('q1', 'C') + verifyRadio('q2', 'C'), 10)
    score += show_score('#field3', verifyCheckbox('q3', ['B', 'D']) + verifyCheckbox('q4', ['A', 'B', 'C', 'D']), 10)

    var endTime = new Date()
    var totalTime = Timing()
    var node = document.getElementById('score').value = score

    // 停止计时
    clearInterval(document.interval)

    msg = 'your score: ' + score + '\n'
    msg += 'your time: ' + totalTime + '\n'
    alert(msg)

    $.ajax({
      type: 'POST',
      url: '/php/add.php',
      data: {
        name: name.value,
        score: score,
        time: totalTime
      },
      timeout: 3000,
      success: function (msg) {
        // 提交成功后的回调函数
        $('button').hide('fast')
        $('#success').fadeIn('slow')
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('button')[0].innerText = '连网失败'
      }
    })

    return false; // 阻断
  }

  function query (event) {
    // 查询分数
    var name = $('#name')[0].value
    if (event.ctrlKey) {
      name = ''
    }
    $.ajax({
      type: 'POST',
      url: '/php/query.php',
      data: {
        name: name
      },
      timeout: 2000,
      success: function (msg) {
        // 提交成功后的回调函数

        $('#result-table')[0].innerHTML = msg
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('#check-score')[0].innerText = '连网失败'
      }
    })
  }

  function click_toggle (event) {
    // 导航栏点击特效
    var child = $(this)[0].children
    if (!child[0].checked) {
      child[0].checked = true
    }else {
      child[0].checked = false
    }
  }
  function choose_toggle (event) {
    // input勾选后的特效
    var children = $(this).find('div')
    for (var i = 0;i < children.length;i++) {
      if (children[i].firstElementChild.checked) {
        $(children[i]).css({color: 'rgb(157, 146, 141)'})
      }else {
        $(children[i]).css('color', 'rgb(207, 196, 191)')
      }
    }
  }

  // 绑定事件
  $('fieldset >div > div').click(click_toggle)
  $('fieldset.toggle > div').delegate($('fieldset.toggle >div > div'), 'click', choose_toggle)
  document.getElementById('form').onsubmit = submit_func
  document.getElementById('check-score').onclick = query
})
