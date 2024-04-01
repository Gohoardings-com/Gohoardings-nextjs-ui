const  {executeQuery} = require("../conn/conn");
const jwtToken = require('jsonwebtoken')
const catchError = require("../middelware/catchError");
const ErrorHandle = require("../utils/Errorhandler");
const { sendEmail } = require("../middelware/sendEmail");

exports.message = catchError(async (req, res, next) => {
  const { name, email, phone, message } = req.body;
  const row =  await executeQuery('SELECT id,assigned FROM tblleads WHERE source = 3 order by id desc limit 0,1',"gohoardi_crmapp",next)
  const lastAssigned = row[0].assigned;
  
  let assign;

  if (lastAssigned == 7) {
    assign = 40;
  } else if (lastAssigned == 40) {
    assign = 46;
  } else if (lastAssigned == 46) {
    assign = 40;
  } else {
    assign = 40;
  }  

  const query = "insert into tblleads set name='"+name+"',addedfrom=0,phonenumber='"+phone+"',description = '"+message+"',email='"+email+"',source=3,status=2,assigned='"+assign+"',dateadded=NOW(),dateassigned=NOW()";
  await sendEmail({email: "deepti@gohoardings.com", subject: "website lead", message: "Lead : - "+name+" with email : "+email+" and contact number : "+phone+". contacted you with message :- "+message+". Thank you have a great day."});
  await sendEmail({email: "vikas@gohoardings.com", subject: "website lead", message: "Lead : - "+name+" with email : "+email+" and contact number : "+phone+". contacted you with message :- "+message+". Thank you have a great day."});
  await sendEmail({email: "Deepali@gohoardings.com", subject: "website lead", message: "Lead : - "+name+" with email : "+email+" and contact number : "+phone+". contacted you with message :- "+message+". Thank you have a great day."});
  const sql = await executeQuery(query,"gohoardi_crmapp",next);
  if (sql) {
    return res
      .status(200)
      .json({ success: true, message: "Thanks, we will contact you soon!" });
  }
});


exports.review = catchError(async (req, res, next) => { 
    const {feedback, rating, ip} = req.body
   const result = await executeQuery("SELECT * from goh_review WHERE ip_address = '"+ip+"'","gohoardi_goh", next)
      if(result.length == 0) { 
            const cookieData = req.cookies
            if (!cookieData) {
                return res.status(206).json({ message: "No Cookie Found" })
            }
            const token = cookieData.gohoardings;
            let sql ;
            return jwtToken.verify(token, "thisismysecretejsonWebToken", async (err, user) => {
                if(err){
                  sql = "INSERT into goh_review (uid, Comments, rate, ip_address, source) VALUES ( 'unknown', '" + feedback + "'," + rating + ",'" + ip + "','gohoardings')"
                }else{
                    const userID = user.id;
                    sql ="INSERT into goh_review (uid, Comments, rate, ip_address, source) VALUES (" + userID + ", '" + feedback + "','" + rating + "','" + ip + "', 'gohoardings')"        
                }
            
            const data = await executeQuery(sql, "gohoardi_goh", next)
                        if (data) {      
                            return res.status(200).json({success: true, message: "Thanks, we will contact you soon!"})
                        }
                    })
        } else{
            return res.status(200).json({success:false, message:'Profile Already Exists'})
        }
    })


exports.getReview = catchError(async (req,res, next) =>{

 const result =  await  executeQuery("SELECT DISTINCT ip_address from goh_review", "gohoardi_goh", next)
        if (result) {   
            return res.status(200).json(result)
        } 
    })


    exports.brangLogo = catchError(async (req,res, next) =>{
        const result =  await  executeQuery("SELECT * from goh_client_logos", "gohoardi_goh", next)
        if (result) {   
            return res.status(200).json(result)
        } 
    })
