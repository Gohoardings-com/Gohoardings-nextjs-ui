const db = require("../conn/conn");
const jwtToken = require('jsonwebtoken')
const catchError = require('../middelware/catchError');
const fetch = require('node-fetch');
const {sendEmail} = require("../middelware/sendEmail");

async function planMail(data, email) {
    try {
      const response1 = await fetch(`http://localhost:8080/api/v1/datafiles/excel`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ID: data }),
      });
      await response1;
    } catch (error) {
      return 'Error';
    }
  
    try {
      const result = await fetch(`http://localhost:8080/api/v1/datafiles/powerpoint`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ID: data }),
      });
  
      const message = `Your Media add on a Campaingn your Campain id is campaign-TEST`
      await sendEmail({
        email: email,
        subject: "Gohoadings Solutions : India's Largest Outdoor Advertising Company",
        message: message,
        attachments: [
          { fileName: "test", path: `./ppt/GOH${data}.pptx` },
          { fileName: "test2", path: `./excel/GOH${data}.xlsx` }
        ]
      });
  
    } catch (error) {
      return 'Error';
    }
  }
  


exports.addOnCart = catchError(async (req, res) => {
    const cookieData = req.cookies
    if (!cookieData) {
        return res.status(206).json({success:false, message: "No Cookie Found" })
    }
    const token = Object.values(cookieData)[0];
    return jwtToken.verify(token, "thisismysecretejsonWebToken", async (err, user) => {
        if (err) {
            return res.status(206).json({success:false, message: "Login First" })
        } else {
            const userid = user.id
            const { mediaid, mediatype } = req.body;
            db.changeUser({ database: "gohoardi_goh" });
            db.query("INSERT INTO goh_shopping_carts_item (userid, mediaid, campaigid, mediatype, status) VALUES ('" +
                userid +
                "','" +
                mediaid +
                "','" +
                userid +
                "','" +
                mediatype +
                "',0)",
                async (err, result) => {
                    if (err) {
                        return res.status(400).json({success:false, message: "Database Error"})
                    } else {
                        return res.send(result);
                    }
                }
            )
        }
    })
})


exports.campaineId = catchError(async (req,res, next) => {
    db.changeUser({ database: "gohoardi_goh" });
    const userId = req.id;
    let promises = [];
    db.query(
        "SELECT MAX(campaigid) as campaigid FROM goh_shopping_carts_item",
        async (err, result) => {
            if (err) throw err;
             campaign_id = (result[0].campaigid) + 1; 
                next()   
                
           
})
})

exports.processdCart = catchError(async (req, res) => {
    var { products, campainName } = req.body;
    const newCampain = campainName.replace(/ /g,"_");

    const userId = req.id;
    const campaign_name = campaign_id;
    let promises = [];
    if (!userId) {
        return res.status(404).json({message: "Token Valid"})
    } else {
        db.changeUser({database: "gohoardi_crmapp"})
        db.query("SELECT * FROM tblcontacts WHERE userid='" + userId + "'", async (err, result) => {
            if (err) {
                return res.status(206).json({success:false ,message:"User Not Found"})
            };
              const phone = result[0].phonenumber
              const userEmail = result[0].email
    db.changeUser({ database: "gohoardi_goh" });
                products.map((el) => {
                    promises.push(
                        new Promise(async (resolve,reject ) => {
                    const sql = "INSERT into goh_serach_activities (user, phone, campaign_name, start_date, end_date, campaign_city, media_type, address, city) VALUES (" + userId + ",'" + phone + "', '"+newCampain+"-"+ campaign_name+ "','" + el.start_date + "','" + el.end_date + "','" + el.medianame + "','" + el.category_name + "','" + el.address + "','" + el.city_name + "') ";
                    db.query(
                        sql,
                        async (err, code) => {
                            if (err) {
                                   return reject(err)
                            } else {
                                const sql = "UPDATE goh_shopping_carts_item SET isDelete=1,status=1, campaigid = "+campaign_id+" WHERE userid=" + userId + " && mediaid='" + el.code + "'";
                                db.query(
                                    sql,
                                    async (err, data) => {

                                        if (err) {
                                          
                                      return reject(err)
                                        } else {

                                            return resolve(data)
                                        }
                                    })
                            }
                        }
                    );
                    }))
                });
                try {
                    const data = await Promise.all(promises);
        // await   sendEmail({email: "bussduro@gmail.com", subject: "Gohoadings Solutions : India's Largest Outdoor Advertising Company", message: "message" });
                  planMail(campaign_name,userEmail);
                    return res.status(200).json({success:true, message: "Please check your email for the details report and we will be in touch shortly", result:data })
                } catch (err) {
                  return res.status(400).json({success:false, message:"Try Later"})
                }
        }
)}
})

exports.deleteFromCart = catchError(async (req, res, next) => {
    const userid = req.id
    const { code } = req.body;  
    db.changeUser({ database: "gohoardi_goh" });
    const sql = "UPDATE goh_shopping_carts_item SET isDelete=1 WHERE userid='" + userid + "' && mediaid='" + code + "'"
    db.query(sql,
        async (err, result) => {
            if (err) {
           
                return res.status(206).json({success:false, message : "Can't Delete this Item"})
            } else {
         
                return res.send(result);
            }
        }
    );
})


exports.useritems = catchError(async (req, res, next) => {
    const user = req.id
   const data = await executeQuery(`SELECT COUNT(userid) AS item FROM goh_shopping_carts_item WHERE userid = ${user} && isDelete=0 `, "gohoardi_goh", next)
       
            if (!data) {
                return res.send(err)
            } else {
                return res.status(200).json(result)
            }
        }
    );



exports.getUserCartItem = catchError(async (req, res, next) => {
    const user = req.id
    db.changeUser({ database: "gohoardi_goh" });
    db.query(
        `SELECT * FROM goh_shopping_carts_item WHERE userid = ${user} && isDelete= 0 `,
        (err, result) => {
            if (err) {
                return res.status(400).json({success:false, message: "Database Error"})
            } else {
                req.data = result;
                next();
            }
        }
    );
})

exports.cartiemfromdb = async (req, res, next) => {
    const arr = req.data;
    var table_name;
    let promises = [];
    db.changeUser({ database: "gohoardi_goh" });
    arr.map((obj) => {
        try {
            switch (obj.mediatype) {
                case "traditional-ooh-media":
                    table_name = "goh_media";
                    break;
                case "digital-media":
                    table_name = "goh_media_digital";
                    break;
                case "transit-media":
                    table_name = "goh_media_transit";
                    break;
                case "mall-media":
                    table_name = "goh_media_mall";
                    break;
                case "airport-media":
                    table_name = "goh_media_airport";
                    break;
                case "inflight_media":
                    table_name = "goh_media_inflight";
                    break;
                case "office-media":
                    table_name = "goh_media_office";
                    break;
                default:
                    table_name = "goh_media";
            }
            promises.push(
                new Promise(async (resolve, reject) => {
                    db.query(
                        "SELECT media.*,cart.isDelete FROM  " + table_name + " AS media INNER JOIN goh_shopping_carts_item AS cart ON media.code='" + obj.mediaid + "' && cart.isDelete = 0  WHERE cart.userid = '" + obj.userid + "'",
                        async (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                })
            );
        } catch (err) {
            return res.status(400).json({success:false, message: "Database Error"})
        }
    });
    try {
        const data = await Promise.allSettled(promises);
        let result = [];
        data.forEach(element => {
            result.push(element.value[0])
        });
        return res.send(result);
    } catch (err) {
        return res.status(400).json({success:false, message: "Database Error"})
    }
};
