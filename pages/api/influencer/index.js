import nc from 'next-connect'
import error from '@/server/utils/error'
import { influencerForm } from '@/server/controller/influencer'


const handler = nc({error})
  handler.post(influencerForm)
export default handler