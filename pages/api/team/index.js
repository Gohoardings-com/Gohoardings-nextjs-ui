import nc from 'next-connect'
import error from '@/server/utils/error'
import { companyStaff } from '@/server/controller/staticPageControl'
import { mapMarkersData } from '@/server/controller/allfilters'

const handler = nc(error)
    handler.get(companyStaff)
    handler.post(mapMarkersData)
export default handler