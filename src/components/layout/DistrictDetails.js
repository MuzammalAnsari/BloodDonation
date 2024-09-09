export default function DistrictDetails({formData, handleChange}) {
  return (
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
        <option value="Attock">Attock</option>
        <option value="Bahawalnagar">Bahawalnagar</option>
        <option value="Bahawalpur">Bahawalpur</option>
        <option value="Bhakkar">Bhakkar</option>
        <option value="Chakwal">Chakwal</option>
        <option value="Chiniot">Chiniot</option>
        <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
        <option value="Faisalabad">Faisalabad</option>
        <option value="Gujranwala">Gujranwala</option>
        <option value="Gujrat">Gujrat</option>
        <option value="Hafizabad">Hafizabad</option>
        <option value="Jhang">Jhang</option>
        <option value="Jhelum">Jhelum</option>
        <option value="Kasur">Kasur</option>
        <option value="Khanewal">Khanewal</option>
        <option value="Khushab">Khushab</option>
        <option value="Lahore">Lahore</option>
        <option value="Layyah">Layyah</option>
        <option value="Lodhran">Lodhran</option>
        <option value="Mandi Bahauddin">Mandi Bahauddin</option>
        <option value="Mianwali">Mianwali</option>
        <option value="Multan">Multan</option>
        <option value="Muzaffargarh">Muzaffargarh</option>
        <option value="Nankana Sahib">Nankana Sahib</option>
        <option value="Narowal">Narowal</option>
        <option value="Okara">Okara</option>
        <option value="Pakpattan">Pakpattan</option>
        <option value="Rahim Yar Khan">Rahim Yar Khan</option>
        <option value="Rajanpur">Rajanpur</option>
        <option value="Rawalpindi">Rawalpindi</option>
        <option value="Sahiwal">Sahiwal</option>
        <option value="Sargodha">Sargodha</option>
        <option value="Sheikhupura">Sheikhupura</option>
        <option value="Sialkot">Sialkot</option>
        <option value="Toba Tek Singh">Toba Tek Singh</option>
        <option value="Vehari">Vehari</option>
      </select>
    </div>
  );
}
