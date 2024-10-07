"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import DistrictDetails from "../../components/layout/DistrictDetails";
import { resolve } from "path";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";

function DonationPage() {
  const { data: session, status } = useSession(); // Destructure session and status
  const userImage = session?.user?.image; // get user image from session
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    age: "",
    bloodGroup: "",
    district: "",
    pinCode: "",
    lastDonation: "",
  });
  // Set the userName after the session is fully loaded
  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
      fetch("api/donorProfile").then((response) => {
        response.json().then((data) => {
          setFormData(data);
          console.log(data);
        });
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();


      const donorPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/donorProfile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userName,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            age: formData.age,
            bloodGroup: formData.bloodGroup,
            district: formData.district,
            pinCode: formData.pinCode,
            lastDonation: formData.lastDonation,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          resolve(data);
        } else {
          reject(response);
        }
      })
      await toast.promise(donorPromise, {
        loading: "Saving...",
        success: "Saved!",
        error: "Failed to save",
      });
      

  
  };
  

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 border mt-8">
      <h1 className="text-2xl font-bold mb-4 bg-gray-600 p-4 rounded-lg text-white">
        Register As Donor
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-2 ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-
              leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block mb-2 ">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-
              leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label htmlFor="address" className="block mb-2 ">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full px-3
              leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled={true}
              value={formData.email}
              className="shadow appearance-none border rounded w-full py-2 px-3
              leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="age" className="block mb-2 ">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3
              leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="bloodGroup" className="block mb-2 ">
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3
              leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <DistrictDetails formData={formData} handleChange={handleChange} />
          </div>
          <div>
            <label htmlFor="state" className="block mb-2 ">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3
              leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Punjab</option>
            </select>
          </div>
          <div>
            <label htmlFor="pinCode" className="block mb-2 ">
              Pin Code
            </label>
            <input
              type="number"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3
             leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="lastDonation"
              className="block mb-2"
            >
              Last Donation
            </label>
            
            <DatePicker
             id="lastDonation"
             name="lastDonation"
             value={formData.lastDonation}
             onChange={handleChange}
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <Button
            type="submit"
          //   className="bg-blue-500 hover:bg-blue-700 text-white 
          // font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DonationPage;
