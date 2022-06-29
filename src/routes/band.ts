import { getBandAbout } from '../controllers/band-controller'
import express from 'express'
const router = express.Router()

router.get('/band-about', getBandAbout)

export default router
