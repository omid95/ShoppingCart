//imports
const mysql = require("mysql2");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session= require('express-session');




var app = express();
app.use(bodyParser.json());
const port = 3002


var connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Yoga#9844",
        database: "shoppingcart",
        multipleStatements: true

    }
);

connection.connect((err) => {
    if (!err) {
        console.log("success");
    }
    else {
        console.log("failed");
    }
})


//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname + 'public/css')));
app.use(express.static(path.join(__dirname + 'public/js')));
app.use(express.static(path.join(__dirname + 'public/img')));
app.use(express.static(path.join(__dirname + 'public/manifest.json')));

// app.use('/css', express.static(__dirname + 'public/css'));
// app.use('/js', express.static(__dirname + 'public/js'));
// app.use('/img', express.static(__dirname + 'public/img'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('', (req, res) => {
    connection.query("SELECT * from products", (err, rows) => {
        connection.query("select count(*) AS a from carttable",(err, rowss) => {
            console.log(rowss);
            console.log(rowss[0].a);
            let b=rowss[0].a;
        if (!err) {
            
            res.render('html', { user: rows, count : b});
        }
        else {
            console.log(err);
        }
        // console.log(rows);
    })
    })
})

app.get('/about/:prdId', (req, res) => {
    // let a=req.params.id
    // console.log(a);
    //https://stackoverflow.com/questions/25187903/what-do-curly-braces-around-javascript-variable-name-mean
    const { prdId } = req.params;
    let sql = "SELECT * from products where ProductId=" + prdId;
    connection.query(sql, (err, rows) => {
        connection.query("select count(*) AS a from carttable",(err, rowss) => {
            console.log(rowss);
            console.log(rowss[0].a);
            let b=rowss[0].a;
        if (!err) {
            res.render('about', { user: rows, count : b });
        }
        else {
            console.log(err);
        }
        //console.log(rows);
    })
    })
})

app.get('/cart', (req, res) => {
    connection.query("SELECT * from carttable", (err, rows) => {
        connection.query("select count(*) AS a from carttable",(err, rowss) => {
            console.log(rows);
            let b=rowss[0].a;
            connection.query("select sum(ProductTotalPrice) AS b from carttable",(err,rowsss)=>{
                let c=rowsss[0].b;
                if(c==null)
                {
                    c=0;
                }
        if (!err) {
            res.render('cart', { user: rows,count : b, totalcost:c });
        }
        else {
            console.log(err);
        }
        // console.log(rows);
    })
})
    })
})


app.post('/delete', (req, res) => {
    let UserId = req.body.UserId;
    let sql = "delete from carttable where CartId=" + UserId;
    connection.query(sql, (err, rows) => {
       
        if (!err) {
            
            res.json({ success: true })
        }
        else {
            console.log(err);
        }
        // console.log(rows);
    })
    })


app.post('/insert', (request, response) => {
    let ImageUrl = request.body.imageurl;
    let price = request.body.price;
    let quantity = request.body.quality;
    let totalprice = request.body.total;
    let Name = request.body.Name;
    let ProcuctId = request.body.ProductId;
    let CartId= request.body.cartid;
    console.log(CartId);
    

    //let sql = "insert into carttable(UserId,ImageUrl,ProductName,ProductPrice,ProductId,ProductTotalPrice,Quantity) values ('Darshan123','ImageUrl', 'name','price',1,'10','1')";
    let sql = "insert into carttable(CartId,UserId,ImageUrl,ProductName,ProductPrice,ProductId,ProductTotalPrice,Quantity) values (CartId,'Darshan123','" + ImageUrl + "','" + Name + "','" + price + "'," + ProcuctId + ",'" + totalprice + "','" + quantity + "'" + ")";
    connection.query(sql, (err, rows) => {
        if (!err) {
            response.json({ success: true })
        }
        else {
            console.log(err);
        }
    })
    // res.render('cart')


})


//listen on port 3000
app.listen(port, () => console.info(`listen on port ${port}`))


  