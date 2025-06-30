import React, { useState } from 'react'
import axios from 'axios'

// gray: 495867, HardBlue: 577399, SoftBlue: BDD5EA, White: FFFFFF, SoftRed: F7B1AB

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3030/api/auth/register', formData)


      setMessage(response.data.message)
      setFormData({
        username: '',
        email: '',
        password: ''
      })

      setTimeout(() => {
        setMessage('');
      }, 5000)

    } catch (error) {
      if (error.response) {
        if (error.response) {

          setError(error.response.data.message);
          setTimeout(() => {
            setError('');
          }, 5000)
        }
      }
      console.error("Error registering user:", error.message);
    }
  }

  return (
    <div className="h-screen bg-[linear-gradient(to_bottom,_#ffffff_0%,_#ffffff_65%,_#bdd5ea_90%,_#bdd5ea_100%)] flex flex-col justify-center items-center">
      <h1 className='text-3xl font-bold mb-7 shadow-2xl'>Register</h1>
      <form className="border-2 border-[#F7B1AB] shadow-[4px_4px_14px_rgba(0,0,0,0.3)] rounded-lg p-6">

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border-2 border-[#577399] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:scale-110 transition duration-200 ease-in-out"
            id="username"
            type="text"
            name="username"
            maxLength={20}
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border-2 border-[#577399] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:scale-110 transition duration-200 ease-in-out"
            id="email"
            type="email"
            name="email"
            maxLength={100}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border-2 border-[#577399] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:scale-110 transition duration-200 ease-in-out"
            id="password"
            type="password"
            name="password"
            maxLength={20}
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-[#577399] hover:bg-[#f7b1ab] cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>

        {message && <p className="text-[#577399] mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}


      </form>

    </div>
  )

}

export default Register
