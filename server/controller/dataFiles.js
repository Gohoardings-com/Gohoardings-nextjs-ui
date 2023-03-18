const db = require("../conn/conn");
const catchError = require('../middelware/catchError')
const path = require('path')
const XLSX = require('xlsx');
const pptxgen = require ("pptxgenjs");

exports.excel = catchError(async (req, res) => {
    const {ID} = req.body;
    if(!ID){
        return res.status(206).json({success:false, message:"Try Again"})
    }
    db.changeUser({ database: "gohoardi_goh" });
    const sql = "SELECT DISTINCT mediaid, userid, mediatype FROM goh_shopping_carts_item WHERE campaigid = "+ID+" && status=1"
    db.query(
        sql,
        async (err, result) => {
            if (err) {
                return res.status(400).json({success:false, message: "Database Error"})
            } else { 
                let file = await alldata(result,ID);
                if(!file){
                    return res.status(206).json({success:false, message:"Try Again"})
                }
                return res.download(file);
            }
        }
    );
})

const alldata = async (data,ID) => {
const arr = data;
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
            new Promise(async (reject, resolve) => {
                const sql = "SELECT media.id,media.medianame as 'Media name', media.location, media.illumination, media.city_name as City, media.state, media.width as 'Width (feet)', media.height as 'Height (feet)', Media.area as 'Total Area', media.widthunit as 'Area in', media.price as Price, media.pricetype as 'Price type', media.ftf as 'Foot Fall', media.subcategory as Category, media.geolocation FROM  " + table_name + " AS media WHERE media.code='" + obj.mediaid + "'"
                db.query(
                    sql,
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
        result.push(element.reason[0])
    });
    if(result.length == 0){
        return res.status(206).json({success:false, message: "Data Not Found"})
    }
    const file = convertJsonToExcel(result,ID);
    return file;
} catch (err) {
    return err
}
}



exports.powerpoint = catchError(async (req, res) => {
const {ID} = req.body;

if(!ID){
    return res.status(206).json({success:false, message:"Try Again"})
}
db.changeUser({ database: "gohoardi_goh" });
const sql = "SELECT DISTINCT mediaid, userid, mediatype FROM goh_shopping_carts_item WHERE campaigid = "+ID+" && status=1";
db.query(
    sql,
    async (err, result) => {
        if (err) {
            return res.status(400).json({success:false, message: "Database Error"})
        } else {
            const file = await alldata2(result, ID);
            if(!file){
                return res.status(206).json({success:false, message:"Try Again"})
            }
            return res.download(file);
        }
    }
);
})

    const alldata2 = async (data,ID) => {
        var table_name;
        let promises = [];
        db.changeUser({ database: "gohoardi_goh" });
        data.map((obj) => {
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
                    new Promise(async (reject, resolve) => {
                        db.query(
                            "SELECT media.id, media.thumb ,media.medianame, media.mediaownercompanyname ,media.location, media.illumination, media.city_name, media.state, media.area as 'size', media.price, media.pricetype, media.foot_fall, media.subcategory, media.geolocation FROM  " + table_name + " AS media WHERE media.code='" + obj.mediaid + "'",
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
                    result.push(element.reason[0])
        
            });
            if(result.length == 0){
                return res.status(206).json({success:false, message: "Data Not Found"})
            }
            let file = convertJsonToPPT(result,ID);
            return file;
        } catch (err) {
            return err
        }
    }

  /********************
    JSON TO XLSX
*********************/

// const students = [
//     { name: "Raj", email: "raj@gmail.com", age: 23, gender: "M" },
//     { name: "Rahul", email: "rahul@gmail.com", age: 15, gender: "M" }
//   ]
const convertJsonToExcel = async(data,ID) => {

    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
  
    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    // Generate buffer
    XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
  
   
    // Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    const filePath = path.join(__dirname, '../excel/', `GOH${ID}.xlsx`);
    XLSX.writeFile(workBook, filePath)
   
    return filePath;
  }
  

  
  const convertJsonToPPT = async (data,ID) => {

  // 1. Create a new Presentation
  let pres = new pptxgen();
  pres.layout = 'LAYOUT_4x3';
  
  // 2. Add a Slide
  let slide1 = pres.addSlide();
  
  // Image by local URL
  slide1.addImage({ path: "images/headerppt.jpg",w:'100%', h:'100%' });

  data.forEach(element => {
    const thumb = element.thumb.startsWith("https")
      ? element.thumb
      : `https://${element.mediaownercompanyname
          .trim()
          .split(" ")
          .slice(0, 2)
          .join("_")
          .toLowerCase()}.odoads.com/media/${element.mediaownercompanyname
          .trim()
          .split(" ")
          .slice(0, 2)
          .join("_")
          .toLowerCase()}/media/images/new${element.thumb}`;
  
    const slide = element.code = pres.addSlide();
    slide.addImage({ path: thumb ,w:'100%', h:'100%' });
  
    let textboxText = [
      { text: "Name : "+element.medianame+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
      { text: "Media Type : "+element.subcategory+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
      { text: "City : "+element.city_name+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
      { text: "Location : "+element.location+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
      { text: "GEO Location : "+element.geolocation+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
      { text: "Size : "+element.size+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
      { text: "Illumination : "+element.illumination+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
      { text: "Price : "+element.price+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
      { text: "Foot fall : "+element.foot_fall+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
    ];
    slide.addText(textboxText,{ shape: pres.ShapeType.rect, fill: { color: "000000" } ,w:'40%',h:'35%', x:'0%',y:'65%', fontSize:15});
  });
  
  let slide3 = pres.addSlide();
  slide3.addImage({ path: "images/footerppt.jpg",w:'100%', h:'100%' });
  
  // path of file to create and name
  var filePath = path.join(__dirname, '../ppt/', `GOH${ID}.pptx`);
  
  // 4. Save the Presentation
  try {
    await pres.writeFile(filePath)
       return filePath;
  } catch(error) {
    return 'Error in creating PPT';
  }


  }


