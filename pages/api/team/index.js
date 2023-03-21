import nc from 'next-connect'
import error from '@/server/utils/error'
import { companyStaff } from '@/server/controller/staticPageControl'

const handler = nc(error)
    handler.get(companyStaff)
export default handler