import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { DonorInfo } from "@/app/models/DonorInfo";

export async function PUT(req) {
    // Establish database connection
    await mongoose.connect(process.env.MONGO_URL);

    // Parse the request body to get data
    const data = await req.json();
    const { _id, name, image, phoneNumber, address, age, bloodGroup, district, pinCode, lastDonation } = data;

    let filter = {};
    if (_id) {
        filter = { _id }; // Use _id if provided
    } else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        // Log email for debugging
        console.log("Session email:", email);

        if (!email) {
            return Response.json({ error: "Email not found in session" }, { status: 400 });
        }

        filter = { email }; // Use email from session if _id is not provided
    }

    // Find the user using the filter (either _id or email)
    const user = await User.findOne(filter);

    // If the user is not found, return a 404 error
    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user's profile, including the image
    await User.updateOne(filter, { name, image, phoneNumber, address, age, bloodGroup, district, pinCode, lastDonation });

    // Log the user email and donor info update process for debugging
    console.log("User found:", user);

    // Update donor info using email as the filter, upsert ensures a new entry if not found
    const donorInfoUpdate = await DonorInfo.findOneAndUpdate(
        { email: user.email },
        { name, image, phoneNumber, address, age, bloodGroup, district, pinCode, lastDonation },
        { upsert: true, new: true }
    );

    // Log the result of donor info update
    console.log("Donor info updated:", donorInfoUpdate);

    return Response.json({ success: true });
}

export async function GET(req) {
  try {
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
          console.log('Session:', session); // Log session details

          const email = session?.user?.email;
          if (!email) {
              return Response.json({ error: "Email not found in session" }, { status: 404 });
          }
          filterUser = { email }; // Use email if _id is not provided
      }

      // Find the user based on the filter (either _id or email)
      const user = await User.findOne(filterUser).lean();
      console.log('User found:', user); // Log user data

      if (!user) {
          return Response.json({ error: "User not found" }, { status: 404 });
      }

      // Find the associated donor info using the user's email
      const donorInfo = await DonorInfo.findOne({ email: user.email }).lean();
      console.log('Donor info found:', donorInfo); // Log donor info

      // Return the combined user and donor info
      return Response.json({ ...user, ...donorInfo });
  } catch (error) {
      console.error('Error in GET request:', error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
