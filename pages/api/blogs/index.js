import { executeQuery } from "@/server/conn/conn";
import catchError from "@/server/middelware/catchError";


export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "GET":
      blogs(req, res);
      break;
  }
}

export const blogs = catchError(async (req, res) => {
  try {
    const qry="SELECT * FROM gohoardings_blog WHERE blog_for = 'gohoarding' ORDER BY id DESC LIMIT 6 "
    const data = await executeQuery(qry,"gohoardi_crmapp")

    if(data.length>0){
        return res
        .status(200)
        .json({ success: true,data });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});
