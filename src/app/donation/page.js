"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";
import DistrictDetails from "@/components/layout/DistrictDetails";
import UploadImages from "@/components/layout/UploadImages";

function DonationPage() {
  const { data: session, status } = useSession();
  const userImage = session?.user?.image;
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    phoneNumber: "",
    email: "",
    address: "",
    age: "",
    bloodGroup: "",
    district: "",
    pinCode: "",
    lastDonation: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prevData) => ({
        ...prevData,
        name: session.user.name, // Set user name within formData
      }));
      fetch("api/donorProfile")
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            ...data, // Merge fetched data with existing formData
          }));
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
          name: formData.name, // Use formData.name instead of userName
          image: formData.image,
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
        console.log("Backend Response:", data); // Log the response data
        resolve(data);
      } else {
        reject(response);
      }
    });

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
    <div className="container mx-auto p-4 border mt-8 max-w-screen-md">
      <h1 className="text-2xl font-bold mb-4 bg-gray-600 p-4 rounded-lg text-white">
        Register As Donor
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Main section with image on the left */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Left side image */}
          <div className="flex items-center justify-center">
            <UploadImages
              link={formData.image} // Current image URL
              setLink={(imageUrl) => {
                console.log("New image URL:", imageUrl);
                setFormData((prevData) => ({ ...prevData, image: imageUrl }));
              }}
              handleImageUpload={(imageUrl) =>
                setFormData((prevData) => ({ ...prevData, image: imageUrl }))
              }
            />
          </div>

          {/* Right side inputs */}
          <div className="flex-1 space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name} // Use formData.name
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                disabled
                value={formData.email}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        {/* Additional fields below main inputs and image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div>
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="age" className="block mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="bloodGroup" className="block mb-2">
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          <div>
            <DistrictDetails formData={formData} handleChange={handleChange} />
          </div>
          <div>
            <label htmlFor="state" className="block mb-2">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Punjab">Punjab</option>
            </select>
          </div>
          <div>
            <label htmlFor="pinCode" className="block mb-2">
              Pin Code
            </label>
            <input
              type="number"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="lastDonation" className="block mb-2">
                Last Donation
              </label>
              <DatePicker
                id="lastDonation"
                name="lastDonation"
                selected={formData.lastDonation || null} // Make sure to handle empty values gracefully
                onChange={(date) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    lastDonation: date,
                  }))
                }
              />
            </div>
            <div className="mt-8 lg:ml-[200px] md:ml-[100px]">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DonationPage;
