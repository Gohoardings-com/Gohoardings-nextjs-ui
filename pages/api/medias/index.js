import nc from 'next-connect'
import error from '@/server/utils/error'

import { city, SearchData } from '../../../server/controller/mediaController'
const handler = nc(error)
    handler.patch(city)
    handler.post(SearchData)
export default handler