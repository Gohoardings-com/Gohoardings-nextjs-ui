import nc from 'next-connect'
import error from '@/server/utils/error'
import { changePassword, checkOTP} from '@/server/controller/otp'
import { verifyToken } from '@/server/middelware/token'
import { useritems } from '@/server/controller/cartItems'
import { tawktolead } from '@/server/controller/userdata'


const handler = nc({error})
  handler.patch(checkOTP)
  handler.put(changePassword)
  handler.get(verifyToken, useritems)
  handler.post(tawktolead)
export default handler