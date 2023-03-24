import nc from 'next-connect'
import error from '@/server/utils/error'
import { product } from '@/server/controller/product'


const handler = nc(error)
    handler.post(product)
export default handler