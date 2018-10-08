var express  = require('express');
    var app  = express();   


const PORT = 3002;
var mysql      = require('mysql');
var connection = require('./config');

var multer = require('multer');
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

var bodyParser = require('body-parser')
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/partials'));
app.use(express.static(__dirname + '/template'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/fonts'));
app.use(express.static(__dirname + '/webfonts'));
app.use(express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.sendfile(__dirname + '/public/index.html');
// });

//var mysqlDump = require('mysqldump');
 
// mysqlDump({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'purchase',
//     dest:'./data.sql' 
// },function(err){
    
// })

app.post('/insertDetails',  (req, res) => {
    //console.log(req.body);
    connection.query('INSERT INTO supplier_master SET ?', req.body, 
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
    );
});

app.post('/updateDetails',  (req, res) => {
    //console.log(req.body);
    connection.query('UPDATE `supplier_master` SET `company_name`=?,`company_address`=?,`contact1`=?,`contact2`=?,`mail`=?,`gst_no`=? WHERE `id` =?', [req.body.company_name, req.body.company_address, req.body.contact1, req.body.contact2, req.body.mail, req.body.gst_no, req.body.id], 
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
    );
});

app.post('/updateProducts',  (req, res) => {
    console.log(req.body);
    connection.query('UPDATE `product_master` SET `product_name`=?,`uom`=?,`tax`=? WHERE `id` =?', [req.body.product_name, req.body.uom, req.body.tax, req.body.id], 
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
    );
});



app.post('/updateCustomers',  (req, res) => {
    //console.log(req.body);
    connection.query('UPDATE `customer_master` SET `company_name`=?,`customer_name`=?,`mobile`=?,`landline`=?,`mail`=?,`gst_no`=? WHERE `id` =?', [req.body.company_name, req.body.customer_name, req.body.mobile, req.body.landline, req.body.mail, req.body.gst_no, req.body.id], 
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
    );
});

app.post('/insertProducts',  (req, res) => {
    //console.log(req.body);
      var jsondata  = req.body;
      var products = []; 
products.push(jsondata);
     var mappedArray221 = products.map(function (item) { 
       return [item.product_name, item.uom]; 
    });
     connection.query('INSERT INTO prod_temp (product_name, uom) VALUES ?', [mappedArray221], 
        function (err, result) {
            if (err) throw err;
           
        }
         );
    connection.query('INSERT INTO product_master SET ?', req.body, 
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
       
    );

});

app.post('/insertPhy',  (req, res) => {
    //console.log(req.body);
      var jsondata  = req.body;
      var products = []; 
products.push(jsondata);
     var mappedArray221 = products.map(function (item) { 
       return [item.phy_id, item.indate]; 
    });
    // console.log(products);
     connection.query('INSERT INTO physical_stock (phy_id, date) VALUES ?', [mappedArray221], 
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
           
        }
         );
  

});

app.post('/updatePhy',  (req, res) => {
    //console.log(req.body);
      var jsondata  = req.body;
      
     var mappedArray221 = jsondata.map(function (item) { 
       return [item.inward, item.id, item.product_name, item.uom, item.quantity]; 
    });
    //console.log(mappedArray221);
     connection.query('INSERT INTO physical_stock_entry (phy_id, prod_id, product_name, uom, new_quantity) VALUES ?', [mappedArray221], 
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
           
        }
         );
  

});



app.post('/insertCustomer',  (req, res) => {
    //console.log(req.body);
    connection.query('INSERT INTO customer_master SET ?', req.body, 
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
    );
});

app.post('/insertPurchaseDetails',  (req, res) => {
    //console.log(req.body);
     var jsondata  = req.body;
     var products = []; 
products.push(jsondata);
console.log(products);
  //var values = [5, 12, 18, 28];
  var mappedArray221 = products.map(function (item) { 
       return [item.inward_number, item.inward_date, item.company_name, item.gst, item.invoice_number, item.invoice_date, item.file_path]; 
    });

    connection.query('INSERT INTO `purchase_details` (inward_number,inward_date, company_name, gst, invoice_number, invoice_date, file_path) VALUES ?',[mappedArray221], 
        function (err, result) {
            if (err) throw err;
           res.send('User added to database with ID: ' + result.insertId);
        }
    );

    
});

app.post('/insertMonthly',  (req, res) => {
    //console.log(req.body);
var jsondata  = req.body;
     var products = []; 
products.push(jsondata);
console.log(products);
  //var values = [5, 12, 18, 28];
  var mappedArray221 = products.map(function (item) { 
       return [item.invoice_date, item.invoice_number, item.company_name, item.gst, item.basictotal, item.taxtotal, item.taxtotal, item.grandtotal]; 
    });
    connection.query('INSERT INTO month_report_purchase (date, invoice_number, company_name, company_gst, gross_amt, sgst, cgst, totalPrice) VALUES ?', [mappedArray221], 
        function (err, result) {
            if (err) throw err;
           res.send('User added to database with ID: ' + result.insertId);
        }
    );

    
});


app.post('/insertSalesDetails',  (req, res) => {
    //console.log(req.body);
    
    connection.query('INSERT INTO sales_details SET ?', req.body, 
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
    );

});

app.post('/updateStatus',  (req, res) => {
    //console.log(req.body);
     var jsondata  = req.body;
     var products = []; 
products.push(jsondata);
console.log(products);
  //var values = [5, 12, 18, 28];
  var mappedArray221 = products.map(function (item) { 
       return [item.inviDate, item.invi, item.inviCname, item.inviCgst, item.sumGrandBasicTotal, item.sumBasicTotal, item.ab, item.ac, item.sumBasicTotal1, item.ba, item.bc, item.sumBasicTotal2, item.ca, item.cb, item.sumBasicTotal3, item.da, item.db, item.grandtotal]; 
    });
    //console.log(mappedArray221);
//      var plz = result.map(function(item) {
//   return [item.inviDate, item.invi, item.inviCname, item.inviCgst, item.sumGrandBasicTotal, item.sumBasicTotal, item.ab, item.ac, item.sumBasicTotal1, item.ba, item.bc, item.sumBasicTotal2, item.ca, item.cb, item.sumBasicTotal3, item.da, item.db, item.grandtotal];
// });
//console.log(jsondata);

  //    var months = [];
  //    for(var i=0; i< jsondata.length; i++)
  // months.push([jsondata[i].inviDate, jsondata[i].invi, jsondata[i].inviCname, jsondata[i].inviCgst, jsondata[i].sumGrandBasicTotal, jsondata[i].sumBasicTotal, jsondata[i].ab, jsondata[i].ac, jsondata[i].sumBasicTotal1, jsondata[i].ba, jsondata[i].bc, jsondata[i].sumBasicTotal2, jsondata[i].ca, jsondata[i].cb, jsondata[i].sumBasicTotal3, jsondata[i].da, jsondata[i].db, jsondata[i].grandtotal]);
    
  //   console.log(months);
   

    connection.query('INSERT IGNORE INTO `month_report` (date, invoice_number, company_name, company_gst, bill_amt, amt1, cgst1, sgst1, amt2, cgst2, sgst2, amt3, cgst3, sgst3, amt4, cgst4, sgst4, total) VALUES ?', [mappedArray221], 
        function (err, result) {
            if (err) throw err;
           res.send('User added to database with ID: ' + result.insertId);
        }
    );

    
});

app.post('/insertPurchaseProductDetails',  (req, res) => {
   // console.log(req.body);
    var jsondata  = req.body;
   // console.log(values);
   var values = [];
   var array = [];
   for(var i=0; i< jsondata.length; i++)
  values.push([jsondata[i].inward,jsondata[i].p_name,jsondata[i].p_uom,jsondata[i].full_qty,jsondata[i].basic_price,jsondata[i].taxTotal,jsondata[i].total,jsondata[i].totalPrice,jsondata[i].selectedTax]);
//console.log(values);
    connection.query('INSERT INTO purchased_product_entry (inward_number, p_name, p_uom, full_qty, basic_price, taxTotal, total, totalPrice, selectedTax) VALUES ?', [values],
        function (err, result) {
            if (err) throw err;
            //res.send('User added to database with ID: ' + result.insertId);
        }
    );
 // var mappedArray2 = jsondata.map(function (item) { 
 //      return [item.p_id]; 
 //    });
 // var array1 = [];
 // var q2 = [];
 // var queryString = 'SELECT present_stock FROM product_master WHERE  id = ?';
 // for(var i in mappedArray2) {
 //             connection.query(queryString, [mappedArray2[i]], (err, data, fields) => {
 //               if (err) throw err;
               
 //                    array1.push([data[0].present_stock]);
 //               var q2 = array1;
 //                console.log(array1);
               
 //            //  array1 = data[0].present_stock;
 //            // console.log(array1);
 //           }); 
 //           }

 //    console.log(q2);  
     var mappedArray = jsondata.map(function (item) { 
       return [item.full_quantity, item.selectedTax, item.basic_price, item.p_id]; 
    });
 //   console.log(mappedArray);
for(var i in mappedArray) {
  //console.log(mappedArray[i]);
    connection.query('UPDATE `product_master` SET `present_stock`=?, `tax`=?, `basic_price`=?  WHERE `id` =?', mappedArray[i],
        function (err, result) {
            if (err) throw err;
            // res.send('User added to database with ID: ' + result.insertId);
        }
    );
  }

  var mappedDetails = jsondata.map(function (item) { 
       return [item.p_name, item.tdate, item.init_stock, item.full_qty, item.full_quantity]; 
    });
    connection.query('INSERT INTO stock_details (product_name, inward_date, opening_stock, in_qty, closing_stock) VALUES ?', [mappedDetails],
        function (err, result) {
            if (err) throw err;
            //res.send('User added to database with ID: ' + result.insertId);
        }
    );

});

app.post('/updateOldPhy',  (req, res) => {
   // console.log(req.body);
    var jsondata  = req.body;

   
     var mappedArray = jsondata.map(function (item) { 
       return [item.present_stock, item.id]; 
    });
 //   console.log(mappedArray);
for(var i in mappedArray) {
  //console.log(mappedArray[i]);
    connection.query('UPDATE `physical_stock_entry` SET `old_quantity`=?  WHERE `prod_id` =?', mappedArray[i],
        function (err, result) {
            if (err) throw err;
            // res.send('User added to database with ID: ' + result.insertId);
        }
    );
  }


});

app.post('/updateNewWithOld',  (req, res) => {
   // console.log(req.body);
    var jsondata  = req.body;

   
     var mappedArray = jsondata.map(function (item) { 
       return [item.quantity, item.id]; 
    });
 //   console.log(mappedArray);
for(var i in mappedArray) {
  //console.log(mappedArray[i]);
    connection.query('UPDATE `product_master` SET `present_stock`=?  WHERE `id` =?', mappedArray[i],
        function (err, result) {
            if (err) throw err;
            // res.send('User added to database with ID: ' + result.insertId);
        }
    );
  }


});

app.post('/insertSalesProductDetails',  (req, res) => {
   //console.log(req.body);
    var jsondata  = req.body;
  //console.log(jsondata);
  var values = [];
   //var qtys = [];
   for(var i=0; i< jsondata.length; i++)
  values.push([jsondata[i].p_name,jsondata[i].quantity,jsondata[i].invoice,jsondata[i].basic_price,jsondata[i].basic_total,jsondata[i].sale_price,jsondata[i].sale_quantity,jsondata[i].tax,jsondata[i].taxTotal, jsondata[i].totalPrice, jsondata[i].cgst, jsondata[i].cgst, jsondata[i].taxTotalDivide, jsondata[i].taxTotalDivide]);
//console.log(values);
    connection.query('INSERT INTO sales_product_entry (p_name, quantity, invoice, basic_price, basic_total, sale_price, sale_quantity, tax, taxTotal, totalPrice, cgst, sgst, tax1, tax2) VALUES ?', [values],
        function (err, result) {
            if (err) throw err;
            //res.send('User added to database with ID: ' + result.insertId);
        }
    );
   
   var mappedArray12 = jsondata.map(function (item, idx) { 
       return [item.full_quantity, item.p_id]; 
    });
 //   console.log(mappedArray);
for(var i in mappedArray12) {
  //console.log(mappedArray[i]);
    connection.query('UPDATE `product_master` SET `present_stock`=?  WHERE `id` =?', mappedArray12[i],
        function (err, result) {
            if (err) throw err;
            // res.send('User added to database with ID: ' + result.insertId);
        }
    );
  }

   var mappedSales = jsondata.map(function (item) { 
       return [item.p_name, item.tdate, item.quantity, item.sale_quantity, item.full_quantity]; 
    });
    connection.query('INSERT INTO stock_details (product_name, inward_date, opening_stock, out_qty, closing_stock) VALUES ?', [mappedSales],
        function (err, result) {
            if (err) throw err;
            //res.send('User added to database with ID: ' + result.insertId);
        }
    );
});

app.get('/getPurchaseDetails',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM purchase_details';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.get('/getSalesList',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM sales_details';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.get('/getTempProd',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM prod_temp';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.get('/getStockLedger',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM stock_details';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.get('/getMonthSales',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM month_report';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.get('/getMonthPurchase',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM month_report_purchase';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.post('/getPurc',  (req, res) => {
        //console.log(req.body);
            var queryString = 'SELECT * FROM purchased_product_entry WHERE inward_number = ?';

            connection.query(queryString,[req.body.inward_number], (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.post('/getSale',  (req, res) => {
        //console.log(req.body);
            var queryString = 'SELECT * FROM sales_product_entry WHERE invoice = ?';

            connection.query(queryString,[req.body.invoice_number], (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.post('/getUpdatedList',  (req, res) => {
        //console.log(req.body);
            var queryString = 'SELECT * FROM physical_stock_entry WHERE phy_id = ?';

            connection.query(queryString,[req.body.phy_id], (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});


app.post('/getResultTax',  (req, res) => {
  var jsondata  = req.body;
  console.log(jsondata);
  var products = []; 
products.push(jsondata);
console.log(products);
  //var values = [5, 12, 18, 28];
  var mappedArray22 = products.map(function (item) { 
       return [item.invoice_number, item.invoice_number, item.invoice_number, item.invoice_number]; 
    });
    console.log(mappedArray22);

        //console.log(req.body);
            //var queryString = 'SELECT sum(`tax1`) AS total FROM `sales_product_entry` WHERE `tax` = 5 AND `invoice` = ?';
for(var i in mappedArray22) {
            connection.query('SELECT sum(`tax1`) AS total1, sum(`basic_total`) AS basic1 FROM `sales_product_entry` WHERE `tax` = 5 AND `invoice` = ?; SELECT sum(`tax1`) AS total2, sum(`basic_total`) AS basic2 FROM `sales_product_entry` WHERE `tax` = 12 AND `invoice` = ?; SELECT sum(`tax1`) AS total3, sum(`basic_total`) AS basic3 FROM `sales_product_entry` WHERE `tax` = 18 AND `invoice` = ?; SELECT sum(`tax1`) AS total4, sum(`basic_total`) AS basic4 FROM `sales_product_entry` WHERE `tax` = 28 AND `invoice` = ?',mappedArray22[i], (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
          }
});

app.get('/getPurchasedProducts',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM product_master';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.get('/getSalesDetails',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM sales_details';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});



app.get('/getSupplier',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM supplier_master';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.get('/getPhyUpdate',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM physical_stock';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.get('/getCustomer',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM customer_master';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

app.get('/getProduct',  (req, res) => {
        //console.log(req);
            var queryString = 'SELECT * FROM product_master';

            connection.query(queryString, (err, data, fields) => {
               if (err) throw err;
               res.end(JSON.stringify(data));
            }); 
});

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])

        }
    });

var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
    /** API path that will upload the files */
    app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.send(res.req.file.filename);
            
             var path = res.req.file.filename;
             console.log('The filename is ' + path);
        })
    });

    app.get('/:file(*)', function(req, res, next){ // this routes all types of file
  var path=require('path');
  var file = req.params.file;
  var path = path.resolve(".")+'/uploads/'+file;
  res.download(path); // magic of download fuction

});

app.listen(process.env.PORT || PORT, () =>
	console.log(`Your server running in ${PORT}`)
	);