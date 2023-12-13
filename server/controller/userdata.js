const {executeQuery} =  require('../conn/conn')
const catchError = require('../middelware/catchError');
const redis = require('redis');
const axios = require('axios')
const client = redis.createClient()
    client.connect()


exports.allcompanyData = catchError(async (req,res, next) => {
  const userId = req.id;
  const result = await executeQuery("SELECT * FROM tblclients WHERE userid = "+userId+"", "gohoardi_crmapp",next) 
        if(result){
            return res.status(200).json(result)
    }})

exports.Profile = catchError(async (req, res, next) => {
    const userId = req.id;

    const search_activity = 'user, phone, campaign_name, start_date,end_date,city,pincode, address,campaign_city,media_type,status, payment_status,code';
    const sql =await executeQuery("SELECT  " + search_activity + " FROM goh_campaign WHERE user='" + userId + "' && status = 1", "gohoardi_goh", next)

    if (sql) {
             req.getItemdata = sql
            next()
        }
    })


exports.getItemid = catchError(async(req,res, next) => {
    const userId = req.id;
    const sql = await executeQuery("select mediaid, mediatype From goh_shopping_carts_item WHERE userid="+userId+"", "gohoardi_goh",next)
    if(sql){   
    const newdata = await alldata(sql, next)
    const data = req.getItemdata;
   if(newdata){
    for (let i = 0; i < data.length; i++) {
        data[i].page_title = newdata[i].page_title;
        data[i].illumination = newdata[i].illumination;
        data[i].subcategory = newdata[i].subcategory;
        }
   }
        return res.status(200).json({message: data})
    }
  });



const alldata = async (data, next) => {
    const arr = data;
    var table_name;
    let promises = [];
    arr.map((obj) => {
        try {
            switch (obj.mediatype) {
                case "billboard":
                    table_name = "goh_media";
                    break;
                case "digital-branding":
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
                case "lift-branding":
                    table_name = "goh_media_office";
                    break;
                default:
                    table_name = "goh_media";
            }
            promises.push(
                new Promise(async (reject, resolve) => {
                    const result = await executeQuery("SELECT media.code, media.illumination, media.page_title,media.subcategory FROM  " + table_name + " AS media WHERE media.code='" + obj.mediaid + "'", "gohoardi_goh", next)
                 if (!result) {
                        reject(result);
                    } else {
                        resolve(result);
                    }
                }
                    )
              
            );
        } catch (err) {
            return res.status(400).json({success:false, message: "Database Error"})
        }
    });
    try {
        const data = await Promise.allSettled(promises);
        let result = [];
        data.forEach(element => {
            result.push(element.reason[0])
        });
        if(result.length == 0){
            return res.status(206).json({success:false, message: "Data Not Found"})
        }
        return result;
    } catch (err) {
        return err
    }
}


const WEBHOOK_SECRET = '7650c3b9224b7e059a7eab393f39ee3a8f5a74f129a9f5cebd7dde04a4f317090316b0b8428833d464d7269578a4eb4a';
const crypto = require('crypto');
function verifySignature (body, signature) {
  if (typeof body !== 'string') {
    body = JSON.stringify(body);
  }

    const digest = crypto
        .createHmac('sha1', WEBHOOK_SECRET)
        .update(body)
        .digest('hex');
    return signature === digest;
};

exports.tawkto = catchError(async (req, res, next) => {
	const { visitor } = req.body;
	const text = req.body.message.text;
	const phoneRegex = /Phone : (\d+)/;
	const match = text.match(phoneRegex);
	let phoneNumber;
	if (match && match[1]) {
  	phoneNumber = match[1];
	} else {
  	phoneNumber = 1234567890;
	}
  if (!verifySignature(req.body, req.headers['x-tawk-signature'])) {
    const q = `INSERT into enquiry (name, email, phone, message) VALUES ('name','email@email.com',9765432356,'error')`;
    const result = await executeQuery(q, "gohoardi_goh", next);
    res.send("error");
  } else {
    const result = sendtawktolead(visitor.name,visitor.email,phoneNumber,visitor.city);
    res.send(result);
  }
});

function sendtawktolead (name,email,phone,city) {
	const url = `https://rocket.gohoardings.com/test?name=${name}&email=${email}&phone=${phone}&city=${city}`;
    axios.get(url)
    .then((response) => {
        console.log(response.data);
        return true;
    })
    .catch((error) => {
        console.error('Axios error:', error.message);
        return false
    });
}
