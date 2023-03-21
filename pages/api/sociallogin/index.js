import nc from 'next-connect'
import error from '@/server/utils/error'
import { googleLogin, linkdinLogin } from '@/server/controller/REGISTERlOGIN'




const handler = nc({error})
handler.put(linkdinLogin)
   handler.post(googleLogin)
export default handler