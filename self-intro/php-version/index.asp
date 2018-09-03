<%@ CODEPAGE=65001 %>  
<% Response.CodePage=65001%>  
<% Response.Charset="UTF-8" %>  


<%
set conn=Server.CreateObject("ADODB.Connection")
conn.Provider="Microsoft.Jet.OLEDB.4.0"
conn.Open Server.MapPath("score.mdb")

set rs=Server.CreateObject("ADODB.recordset") 
sql = "select * from score order by s_score desc"

rs.Open sql, conn

%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <nav id="navbar">
        <div id="navbar-fix">
            <div id="timer">ready to start


            </div>
            <div id="time"></div>
        </div>
    </nav>
    <header>
        <h1>计算机基础知识竞赛</h1>
        <div>
            <p>计算机基础是每一个计算机专业学生必须具备的基础能力，本试题将从多个方面检查答题者的这种能力</p>
        </div>
        <!-- <span id='time'></span> -->
    </header>
    <main>
        <form method="post" action="/add.asp" id="form">
            <fieldset>
                <legend>基本信息</legend>

                <div><label for="name">姓名:</label>
                    <input type="text" name="name" id="name">
                </div>
                <div><label for="mail">邮箱:</label>
                    <input type="email" name="mail" id="mail">
                </div>
                <div><label for="id">学号:</label>
                    <input type="text" id="id" name="id" maxlength="10">

                </div>
                <div><label for="sex">性别:</label>
                    <select>
                        <option value ="male">男</option>
                        <option value ="female">女</option>
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <legend>单项选择题</legend>
                <div>
                    <h3>ARP协议实现的功能是：</h3>
                    <!-- C -->
                    <input type="radio" name="q1" value="A">A.域名地址到IP地址的解析<br>
                    <input type="radio" name="q1" value="B">B.IP地址到域名地址的解析<br>
                    <input type="radio" name="q1" value="C">C.IP地址到物理地址的解析<br>
                    <input type="radio" name="q1" value="D">D.物理地址到IP地址的解析

                </div>
                <div>
                    <h3>TCP/IP是</h3>
                    <!-- C -->
                    <input type="radio" name="q2" value="A">A.一种网络操作系统<br>
                    <input type="radio" name="q2" value="B">B.一个网络地址<br>
                    <input type="radio" name="q2" value="C">C.一种网络通信协议<br>
                    <input type="radio" name="q2" value="D">D.一个网络部件

                </div>
            </fieldset>
            <fieldset>
                <legend>多项选择题</legend>
                <div>
                    <h3>计算机系统是由____组成</h3>
                    <!-- BD -->
                    <input type="checkbox" name="q3" value="A"> A.中央处理器<br>
                    <input type="checkbox" name="q3" value="B"> B.硬件系统<br>
                    <input type="checkbox" name="q3" value="C"> C.打印机<br>
                    <input type="checkbox" name="q3" value="D"> D.软件系统
                </div>
                <div>
                    <h3>下列指标中____是微机的主要性能特征</h3>
                    <!-- ABCD -->
                    <input type="checkbox" name="q4" value="A"> A.主频<br>
                    <input type="checkbox" name="q4" value="B"> B.字长<br>
                    <input type="checkbox" name="q4" value="C"> C.内存容量<br>
                    <input type="checkbox" name="q4" value="D"> D.外设配置

                </div>
            </fieldset>
            <fieldset>
                <legend>简答题</legend>
                <div>
                    <h3>提交js代码，输入一个x，得到x的平方</h3>
                </div>
                <div>
                    <textarea name="q5" id="code" cols="30" rows="10" placeholder="// please paste your code here">
function (x){
    return x;
};
                </textarea>
                </div>
            </fieldset>
            <div class="hide">
                <input type="text" name="score" id="score" value="">
            </div>
            <div class="button">
                <button type="submit" id="button">提交信息</button>
            </div>
        </form>

        <div id="table">
        <table border="1" width="100%">
  <tr>
  <%for each x in rs.Fields
    response.write("<th>" & x.name & "</th>")
  next%>
  </tr>
  <%do until rs.EOF%>
    <tr>
    <%for each x in rs.Fields%>
      <td><%Response.Write(x.value)%></td>
    <%next
    rs.MoveNext%>
    </tr>
  <%loop
  rs.close
  conn.close%>
</table>
        </div>
        

    </main>

    <script src="/js/script.js"></script>
</body>

</html>