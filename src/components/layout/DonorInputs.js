import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";

export default function DonorInputs({
  infoProps,
  setInfoProps,
  disabled = false,
}) {
  const { address, age, bloodGroup, district, state, pinCode, lastDonation } =
    infoProps;

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const districts = [
    "Attock",
    "Bahawalnagar",
    "Bahawalpur",
    "Bhakkar",
    "Chakwal",
    "Chiniot",
    "Dera Ghazi Khan",
    "Faisalabad",
    "Gujranwala",
    "Gujrat",
    "Hafizabad",
    "Jhang",
    "Jhelum",
    "Kasur",
    "Khanewal",
    "Khushab",
    "Lahore",
    "Layyah",
    "Lodhran",
    "Mandi Bahauddin",
    "Mianwali",
    "Multan",
    "Muzaffargarh",
    "Nankana Sahib",
    "Narowal",
    "Okara",
    "Pakpattan",
    "Rahim Yar Khan",
    "Rajanpur",
    "Rawalpindi",
    "Sahiwal",
    "Sargodha",
    "Sheikhupura",
    "Sialkot",
    "Toba Tek Singh",
    "Vehari",
  ];

  return (
    <>
      {/* Main section with image and basic details */}

      {/* Additional fields below main inputs and image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="address" className="block mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            disabled={disabled}
            value={address}
            onChange={(ev) => setInfoProps("address", ev.target.value)}
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
            disabled={disabled}
            value={age}
            onChange={(ev) => setInfoProps("age", ev.target.value)}
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
            value={bloodGroup}
            disabled={disabled}
            onChange={(ev) => setInfoProps("bloodGroup", ev.target.value)}
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
          <label htmlFor="district" className="block mb-2 ">
            District
          </label>
          <select
            id="district"
            name="district"
            value={district}
            disabled={disabled}
            onChange={(ev) => setInfoProps("district", ev.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3
                  leading-tight focus:outline-none focus:shadow-outline"
          >
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="state" className="block mb-2">
            State
          </label>
          <select
            id="state"
            name="state"
            value={state}
            disabled={disabled}
            onChange={(ev) => setInfoProps("state", ev.target.value)}
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
            value={pinCode}
            disabled={disabled}
            onChange={(ev) => setInfoProps("pinCode", ev.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Last Donation and Submit Button */}
      <div className="flex flex-col md:flex-row items-center md:justify-between mt-8 space-y-4 md:space-y-0">
        <div>
          <label htmlFor="lastDonation" className="block mb-2">
            Last Donation
          </label>
          <DatePicker
            id="lastDonation"
            name="lastDonation"
            value={lastDonation}
            onChange={(ev) => setInfoProps("lastDonation", ev)}
          />
        </div>
      </div>
    </>
  );
}
