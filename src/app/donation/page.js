"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

function DonationPage() {
  const { data: session, status } = useSession(); // Destructure session and status
  const userImage = session?.user?.image; // get user image from session
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    age: '',
    bloodGroup: '',
    district: '',
    pinCode: '',
    lastDonationMonth: '',
    lastDonationYear: '',
  });
  // Set the userName after the session is fully loaded
  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
      fetch('api/donorProfile').then(response => {
        response.json().then(data => {
          setFormData(data);
          console.log(data);
        })
      })
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

    try {
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
            lastDonationMonth: formData.lastDonationMonth,
            lastDonationYear: formData.lastDonationYear

         }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Register As Donor</h1>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block mb-2 text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userName}
            onChange={ev => setUserName(ev.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block mb-2 text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            disabled={true}
            value={formData.email}
            className="shadow appearance-none border rounded w-full py-2 px-3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-2 text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="age" className="block mb-2 text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="bloodGroup" className="block mb-2 text-gray-700">
            Blood Group
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label htmlFor="district" className="block mb-2 text-gray-700">
            District
          </label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select District</option>
          </select>
        </div>
        <div>
          <label htmlFor="state" className="block mb-2 text-gray-700">
            State
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select State</option>
          </select>
        </div>
        <div>
          <label htmlFor="pinCode" className="block mb-2 text-gray-700">
            Pin Code
          </label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="lastDonationMonth" className="block mb-2 text-gray-700">
            Last Donation Month
          </label>
          <select
            id="lastDonationMonth"
            name="lastDonationMonth"
            value={formData.lastDonationMonth}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Month</option>
          </select>
        </div>
        <div>
          <label htmlFor="lastDonationYear" className="block mb-2 text-gray-700">
            Last Donation Year
          </label>
          <select
            id="lastDonationYear"
            name="lastDonationYear"
            value={formData.lastDonationYear}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Year</option>
          </select>
        </div>
        
      </div>
      <div className="text-center mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  );
}

export default DonationPage;
