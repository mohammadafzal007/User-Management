import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import axios from "axios";
const Edituser = ({setmodal,user,setUsers}) => {
  // console.log(user)
const [formerrors,setformerrors]=useState({})

    const [formData,setformData]=useState(user)

    const handleChange=(e)=>{
const {name,value}=e.target;
setformData((prevFormData) => ({
    ...prevFormData,
    [name]: value
  }));
};


const handleSubmit= async (e)=>{
e.preventDefault();
const errors=formvalidation();
if(Object.keys(errors)>0){
  setformerrors(errors)
  return;
}

  try{

const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData);
// console.log(res.data)

setUsers((prevUsers) =>
    prevUsers.map((u) => (u.id === user.id ? { ...u, ...res.data } : u))
);

toast.success('User Updated Successfully')
console.log('User Updated Successfully')

  setmodal(null);
  }
  catch(e)
  {
    console.log("Error ",e)
    toast.error('Error Updating User')

  }
}

useEffect(()=>{
  if(user)
  {
    setformData(user)
  }
},[user])
const formvalidation=()=>{
    const errors={}

    //name validation
    if(!formData.name || formData.name.length < 3)
    {
        errors.name="Name must be at least 3 Charcters long"
    }

    //email validation
    const emailpattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formData.email || !emailpattern.test(formData.email)){
        errors.email="Enter Valid Email"
    }
//phone validation
const phonepattern=/^\d{10}$/;
    if(!formData.phone || !phonepattern.test(formData.phone)  )
    {
errors.phone="Enter Valid Phone"
    }


    if (!formData.street) {
        errors.street = "Street is required.";
      }
    
      // City validation (required)
      if (!formData.city) {
        errors.city = "City is required.";
      }

      if (formData.company && formData.company.length < 3) {
        errors.company = "Company name must be at least 3 characters long.";
      }
    
      // Website validation (optional but must be a valid URL if provided)
      const websitePattern = /^(https?:\/\/)?([\w\d\-]+\.)+[\w]{2,}(\/.+)?$/;
      if (formData.website && !websitePattern.test(formData.website)) {
        errors.website = "Please enter a valid URL.";
      }


      return errors;
}
  return (
    <>
    <div className='fixed top-0 text-red-500 inset-0 bg-black bg-opacity-85 backdrop-blur-sm flex
justify-center items-center flex-col '>
        {/* <h1>Add</h1> */}
        <button onClick={()=>setmodal(null)} className='absolute top-4 right-4 md:right-8 z-10 text-xl px-2 py-1 bg-white text-white rounded hover:bg-gray-600 transition'>❌</button>
        <h1 className='text-4xl md:text-6xl m-2 md:mb-16 text-white font-bold'>Edit User</h1>
        <form onSubmit={handleSubmit} className='overflow-x-auto  grid grid-cols-1 md:grid-cols-2 gap-4 border border-black p-4 w-full max-w-[95%] md:max-w-[800px] h-auto drop-shadow-sm  shadow-xl rounded-2xl bg-transparet'>
        <div className="">
                <label className="block mb-2 text-white">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full text-black" 
                    required 
                />
                {formerrors.name && <span className="text-red-500 text-sm">{formerrors.name}</span>}
            </div>
            
            <div className="">
                <label className="block mb-2 text-white">Username</label>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    className="border border-gray-300 p-2 w-full text-black" 
                           disabled
                />
                {/* {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>} */}
            </div>
            
            <div>
                <label className="block mb-2 text-white">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full text-black" 
                    required 
                />
                {formerrors.email && <span className="text-red-500 text-sm">{formerrors.email}</span>}
            </div>
            
            <div>
                <label className="block mb-2 text-white">Phone</label>
                <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full text-black" 
                    required 
                />
                {formerrors.phone && <span className="text-red-500 text-sm">{formerrors.phone}</span>}
            </div>
            
            <div>
                <label className="block mb-2 text-white">Street</label>
                <input 
                    type="text" 
                    name="street" 
                    value={formData.address.street} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full text-black" 
                    required 
                />
                {formerrors.street && <span className="text-red-500 text-sm">{formerrors.street}</span>}
            </div>
            
            <div>
                <label className="block mb-2 text-white">City</label>
                <input 
                    type="text" 
                    name="city" 
                    value={formData.address.city} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full text-black" 
                    required 
                />
                {formerrors.city && <span className="text-red-500 text-sm">{formerrors.city}</span>}
            </div>
            
            <div>
                <label className="block mb-2 text-white">Company Name (optional)</label>
                <input 
                    type="text" 
                    name="company" 
                    value={formData.company.name} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full text-black" 
                />
                {formerrors.company && <span className="text-red-500 text-sm">{formerrors.company}</span>}
            </div>
            
            <div>
                <label className="block mb-2 text-white">Website (optional)</label>
                <input 
                    type="text" 
                    name="website" 
                    value={formData.website} 
                    onChange={handleChange} 
                    className="border border-gray-300 p-2 w-full text-black" 
                />
                {formerrors.website && <span className="text-red-500 text-sm">{formerrors.website}</span>}
            </div>
            
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded ">
                Update User
            </button>
        </form>

        
    </div>
        
    </>
  )
}

export default Edituser