const http=require('http');
const express=require('express')
const logform=express()
const mysql=require('mysql2')
const bodyParser=require('body-parser')
const path=require('path')


const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'seminega',
    database: 'login2'
})
 connection.connect(function(error){
    if(error) throw error
    else console.log(" You connected to your database successfully!!")
 })

logform.use(bodyParser.urlencoded({ extended: true }));
logform.get("/", function(req, res) {
  res.sendFile(path.join('C:/Users/Vanessa/Documents/vanessa/coding_lf/login_form/animlog.html'));
});
logform.post("/sign", (req, res) => {
  const fullnames = req.body.fname;
  const username = req.body.username;
  const email = req.body.email;
  const password1=req.body.password1;
  const password2=req.body.password2;
  
  console.log(password1);
  if(password1===password2){
    connection.query(`insert into formtb(fullname, username, email, password1, passwordconf) values('${fullnames}', '${username}', '${email}', '${password1}', '${password2}')`, function (error, results) {
      if (error) throw error;
      console.log('Data inserted');
    });
    res.sendFile('C:/Users/Vanessa/Documents/vanessa/coding_lf/login_form/setting.html')
  }else{
    res.sendFile(path.join('C:/Users/Vanessa/Documents/vanessa/coding_lf/login_form/animlog.html'));
  };
});


logform.post("/login", (req, res) => {
  console.log(req.body)
  const usernamelog = req.body.orgname;
  const passwordlog = req.body.orgpass;
  console.log('Data inserted well');
    connection.query(`select * from formtb where username='${usernamelog}'and password1='${passwordlog}'`), function (error, results) {
      if (error) {
        console.log("invalid email or password");
        res.sendFile('C:/Users/Vanessa/Documents/vanessa/coding_lf/login_form/loginsucces.html');
      };
      console.log('Data inserted');
    };
    res.sendFile('C:/Users/Vanessa/Documents/vanessa/coding_lf/login_form/loginfail.html');
})



logform.listen(7010,() => {
    console.log(`Server is running on port 7010....`)
    console.log(`http://localhost:7010`)
})
