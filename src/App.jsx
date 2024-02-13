import { useState } from "react";
import UserDetails from "./UserDetails";

function App() {
  const [submittedData, setSubmittedData] = useState([]);
  const handleAdduserdata = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;


    console.log(name, email, phoneNumber);

    const userData = {
      name, email, phoneNumber
    }

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSubmittedData([...submittedData, data]);
        form.reset()
      })

  };

  return (
    <div className="w-1/2 mx-auto mt-28 mb-10 p-5 bg-white rounded-lg shadow-2xl ">
      <form onSubmit={handleAdduserdata} className="">
        <div className="grid grid-cols-1 gap-4">

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold">
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold">
              Email
            </label>
            <input
              required
              type="text"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
            />
          </div>


          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
            />
          </div>

        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:purple-500   w-full outline-none text-lg"
          >
            Submit
          </button>
        </div>
      </form>
      <UserDetails submittedData={submittedData}></UserDetails>
    </div>


  );
}

export default App;
