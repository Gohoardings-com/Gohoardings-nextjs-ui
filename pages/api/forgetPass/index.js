import nc from 'next-connect'
import error from '@/server/utils/error'
import { changePassword, checkOTP} from '@/server/controller/otp'


const handler = nc({error})
  handler.patch(checkOTP)
  handler.put(changePassword)
 
export default handler