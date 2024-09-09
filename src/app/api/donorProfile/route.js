import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "../../models/User";
import { DonorInfo } from "../../models/DonorInfo";

export async function PUT(req) {
    // Establish database connection
    await mongoose.connect(process.env.MONGO_URL);
  
    // Parse request body to get data
    const data = await req.json();
    const { _id, name, ...otherUserInfo } = data;
  
    // Initialize filter object to find the user
    let filter = {};
    if (_id) {
      filter = { _id }; // Use _id if provided
    } else {
      const session = await getServerSession(authOptions);
      const email = session.user.email;
      filter = { email }; // Use email from session if _id is not provided
    }
  
    // Find the user using the filter (either _id or email)
    const user = await User.findOne(filter);
  
    // Update the user's name
    await User.updateOne(filter, { name });
  
    // Update donor info using email as the filter, upsert ensures a new entry if not found
    await DonorInfo.findOneAndUpdate({ email: user.email }, {name, ...otherUserInfo}, {
      upsert: true,
    });
  
    // Return a success response
    return Response.json(true);
  }
  

//get
export async function GET(req) {
    // Establish database connection
    await mongoose.connect(process.env.MONGO_URL);
  
    // Parse the request URL
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id'); // Extract _id if present
  
    // Initialize filter object
    let filterUser = {};
    if (_id) {
      filterUser = { _id }; // Use _id to find user
    } else {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      if (!email) {
        return Response.json({}); // If no email, return an empty object
      }
      filterUser = { email }; // Use email if _id is not provided
    }
  
    // Find the user based on the filter (either _id or email)
    const user = await User.findOne(filterUser).lean();
    if (!user) {
      return Response.json({}); // If user is not found, return empty object
    }
  
    // Find the associated donor info using the user's email
    const donorInfo = await DonorInfo.findOne({ email: user.email }).lean();
  
    // Return the combined user and donor info
    return Response.json({ ...user, ...donorInfo });
  }
  