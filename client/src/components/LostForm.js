import React, { useState } from 'react';
import axios from 'axios';
import '../components.css';

function LostForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    skinColor: '',
    height: '',
    lastLocation: '',
    details: '',
    photo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/lost/report`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Lost child reported successfully');
    } catch (err) {
      alert('Failed to report');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  return (
    <div className="form-container">
      <h2>Report Lost Child</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="skinColor" placeholder="Skin Color" onChange={handleChange} required />
        <input type="text" name="height" placeholder="Height" onChange={handleChange} required />
        <input type="text" name="lastLocation" placeholder="Last Known Location" onChange={handleChange} required />
        <textarea name="details" placeholder="Additional Details" onChange={handleChange}></textarea>
        <input type="file" name="photo" accept="image/*" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LostForm;