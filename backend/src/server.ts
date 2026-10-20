import express from 'express';
import cors from 'cors'
import userRouter from './routers/user.router';
import mongoose from 'mongoose'
import firmRouter from './routers/firm.router'
import requestRouter from './routers/request.router';
import forbiddenRouter from './routers/forbidden.router';
import bookingRouter from './routers/booking.router';
import rejectedBookingRouter from './routers/rejectedBooking.router';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/garden')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()
router.use('/users', userRouter)
router.use('/firms', firmRouter)
router.use('/requests', requestRouter)
router.use('/forbiddens', forbiddenRouter)
router.use('/bookings', bookingRouter)
router.use('/rejectedBookings', rejectedBookingRouter)


app.use("/" ,router)
app.listen(4000, () => console.log(`Express server running on port 4000`));