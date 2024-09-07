import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "../../models/User";
import { DonorInfo } from "../../models/DonorInfo";

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL)
    const data = await req.json()
    const { name, ...otherUserInfo } = data;

    const session = await getServerSession(authOptions)
    const email = session.user.email

    await User.updateOne({ email })

    await DonorInfo.updateOne({email}, otherUserInfo)

    return  Response.json(true);
}

//get
export async function GET(req){
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOptions)
    const email = session.user.email
    if (!email) {
        return Response.json({});
      }

    const user = await User.findOne({ email }).lean()
    const donorInfo = await DonorInfo.findOne({email}).lean()

    return Response.json({...user, ...donorInfo})
}