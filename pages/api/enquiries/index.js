import nc from 'next-connect'
import error from '@/server/utils/error'
import { getReview, message, review } from '@/server/controller/enquiry'


const handler = nc({error})
   handler.post(message)
   handler.get(getReview)
   handler.put(review)
export default handler