import nc from 'next-connect'
import error from '@/server/utils/error'
import { checkOTP, sendOTP, sendPasswordEmail } from '@/server/controller/otp'


const handler = nc({error})
  handler.patch(sendOTP)
  handler.put(sendPasswordEmail)
  handler.get(checkOTP)
export default handler