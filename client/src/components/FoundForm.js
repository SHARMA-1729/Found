// import React, { useState } from 'react';
// import axios from 'axios';
// import '../components.css';

// function FoundForm() {
//   const [formData, setFormData] = useState({
//     location: '',
//     approximateAge: '',
//     appearance: '',
//     contact: '',
//     photo: null,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => data.append(key, formData[key]));
//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/found/report`, data, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       alert('Found child reported successfully');
//     } catch (err) {
//       alert('Failed to report');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   return (
//     <div className="form-container">
//       <h2>Report Found Child</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="location" placeholder="Location Found" onChange={handleChange} required />
//         <input type="number" name="approximateAge" placeholder="Approximate Age" onChange={handleChange} required />
//         <textarea name="appearance" placeholder="Appearance" onChange={handleChange}></textarea>
//         <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} required />
//         <input type="file" name="photo" accept="image/*" onChange={handleChange} required />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default FoundForm;


import React, { useState } from 'react';
import axios from 'axios';
import '../components.css';

function FoundForm() {
  const [formData, setFormData] = useState({
    name: '', // Added name field
    location: '',
    approximateAge: '',
    appearance: '',
    contact: '',
    photo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/found/report`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Found child reported successfully');
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
      <h2>Report Found Child</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Child's Name"
          onChange={handleChange}
          required
        /> {/* Added name input */}
        <input
          type="text"
          name="location"
          placeholder="Location Found"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="approximateAge"
          placeholder="Approximate Age"
          onChange={handleChange}
          required
        />
        <textarea
          name="appearance"
          placeholder="Appearance"
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FoundForm;