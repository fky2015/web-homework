<%@ CODEPAGE=65001 %>  
<% Response.CodePage=65001%>  
<% Response.Charset="UTF-8" %>  
<%
set conn=Server.CreateObject("ADODB.Connection")
conn.Provider="Microsoft.Jet.OLEDB.4.0"
conn.Open Server.MapPath("score.mdb")

set rs=Server.CreateObject("ADODB.recordset") 

dim score
score = Request.Form("score")
dim name
name = Request.Form("name")
dim sql
sql = "INSERT INTO score(s_name, s_score) VALUES ("
sql = sql & "'" & name & "',"
sql = sql & score & ")"



%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>
    
    <% 
    
        if score <> ""  then
        on error resume next
        conn.Execute sql,recaffected
        if err<>0 then
        Response.Write("No update permissions!")
        Response.Write(sql &"<br>")
        for each objErr in conn.Errors
  response.write("<p>")
  response.write("Description: ")
  response.write(objErr.Description & "<br />")
  response.write("Help context: ")
  response.write(objErr.HelpContext & "<br />")
  response.write("Help file: ")
  response.write(objErr.HelpFile & "<br />")
  response.write("Native error: ")
  response.write(objErr.NativeError & "<br />")
  response.write("Error number: ")
  response.write(objErr.Number & "<br />")
  response.write("Error source: ")
  response.write(objErr.Source & "<br />")
  response.write("SQL state: ")
  response.write(objErr.SQLState & "<br />")
  response.write("</p>")
next
        else 
        Response.Write("<h3>" & recaffected & " record added</h3>")
        end if
        conn.close
        end if
    %>
    </h1>
</body>
</html>