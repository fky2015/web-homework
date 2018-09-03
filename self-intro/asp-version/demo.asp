<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml

">

<body>

<%
set conn=Server.CreateObject("ADODB.Connection")
conn.Provider="Microsoft.Jet.OLEDB.4.0"
conn.Open(Server.Mappath("score.mdb"))

 sql="INSERT INTO score (s_name,s_score)VALUES('"&Request.Form("NAME")&"','"&Request.Form("total")&"')"

            on error resume next
            conn.Execute sql,recaffected
           if err<>0 then
             Response.Write("No update permissions!")
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

%>

</body>
</html>
