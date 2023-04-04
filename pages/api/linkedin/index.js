import nc from 'next-connect'
import error from '@/server/utils/error'
import { linkdinLogin } from '@/server/controller/REGISTERlOGIN'



const handler = nc({error})
handler.post(linkdinLogin)
export default handler