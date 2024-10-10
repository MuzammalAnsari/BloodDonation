import { useState } from "react";
import UploadImages from "./UploadImages";
import DonorInputs from "./DonorInputs";
import { Button } from "../ui/button";

export default function DonorForm({ user = {}, onSave }) {
  const [formData, setFormData] = useState({
    userName: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
    address: user?.address || "",
    age: user?.age || "",
    bloodGroup: user?.bloodGroup || "",
    district: user?.district || "",
    pinCode: user?.pinCode || "",
    lastDonation: user?.lastDonation || "",
    image: user?.image || "",
  });

  function handleInfoChange(propName, value) {
    setFormData((prev) => ({ ...prev, [propName]: value }));
  }
  
  function handleInfoChange(propName, value) {
    if (propName === "userName") setUserName(value);
    if (propName === "phoneNumber") setPhoneNumber(value);
    if (propName === "email") setEmail(value);
    if (propName === "address") setAddress(value);
    if (propName === "age") setAge(value);
    if (propName === "bloodGroup") setBloodGroup(value);
    if (propName === "district") setDistrict(value);
    if (propName === "pinCode") setPinCode(value);
    if (propName === "lastDonation") setLastDonation(value);
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 bg-gray-600 p-4 rounded-lg text-white">
        Register As Donor
      </h1>
      <form onSubmit={(ev) => onSave(ev, formData)}>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <UploadImages link={image} setLink={setImage} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-8">
            {/* Left Column (User Image) */}

            {/* Right Column (User Info Inputs) */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userName}
                  onChange={(ev) => setUserName( ev.target.value)}
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
                  value={phoneNumber}
                  onChange={(ev) => setPhoneNumber(ev.target.value)}
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
                  value={email}
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          <DonorInputs
            infoProps={{address, age, bloodGroup, district, pinCode, lastDonation}}
            setInfoProps={handleInfoChange}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
