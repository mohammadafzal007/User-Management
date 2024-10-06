import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast';
import Adduser from './Adduser';
import Edituser from './Edituser';
const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
const[modal,setmodal]=useState(false);
const [currentUser, setCurrentUser] = useState(null);
const[searchTerm,setSearchTerm]=useState("")

const handleaddmodal=()=>{
  setmodal("add");
}
const handleeditmodal=(user)=>{
  setmodal("edit");
  setCurrentUser(user)
  console.log(user)
}
    const deleteuser=async (id)=>{
        try{
await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}1`)
setUsers(users.filter((user)=>user.id!=id))
toast.success("User Deleted Successfully")
        }
        catch(e){
            console.log("Error",e)
        }
    };

    const getallusers=async ()=>{
      
        try{
            const res=await axios.get('https://jsonplaceholder.typicode.com/users');
            const data=await res.data;
            console.log(data)
            setUsers(data);
            setLoading(false)
        }
        catch(e){
        console.log("Error",e)
        }
    }
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(()=>{
        getallusers();
    },[])

  return (<>
  <section className='flex justify-center place-items-center w-full border-blue-600 '>
    <section className='flex flex-col justify-center place-items-center   border-black w-full gap-10'>
    <header className='flex flex-col md:flex-row w-full justify-around items-center border-black gap-2 p-2'>
    <a onClick={handleaddmodal} className='cursor-pointer bg-blue-700 px-4 py-2 rounded mr-2 text-white text-xl'> + Add user</a>
    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search User" className='rounded-2xl border border-sky-500 p-2 text-black'/>
    </header>
   {/* <Link to={{pathname:"/user",state:users}}>Afzal</Link> */}
    {loading ?(<h1>Loading.....</h1>):(
    <>
    {filteredUsers.length === 0 ? (            //if no search match then no data found msg 
              <h2>No user found</h2>  
                            ) : (
    
 //table for display users
 <div className="overflow-x-auto w-full">

 
    <table className=' border border-gray-300 w-full overflow-x-auto min-w-full  '>

  <thead className='bg-gray-100 w-full'>
    <tr>
      <th className='px-4 py-2 border'>Sr.No</th>
      {/* <th className='px-4 py-2 border'>Id</th> */}
      <th className='px-4 py-2 border'>Name</th>
      <th className='px-4 py-2 border'>Username</th>
      <th className='px-4 py-2 border'>Email</th>
      <th className='px-4 py-2 border'>Action</th>
    </tr>
  </thead>
  
  <tbody>
    {
    filteredUsers.map((user,index)=>{
        return  <tr className='hover:bg-gray-100 border even:bg-blue-100 odd:bg-green-200' key={index}>
        <td className='text-center px-6 py-4 whitespace-nowrap'>{index+1}</td>
        {/* <td className='text-center px-6 py-4 whitespace-nowrap'>{user.id}</td> */}
        <td className='text-center px-6 py-4 whitespace-nowrap'>
        <Link to={`/user/${user.id}`} state={{ user }}  
        className='text-blue-500 underline '>{user.name}</Link></td>
        <td className='text-center px-6 py-4 whitespace-nowrap'>{user.username}</td>
        <td className='text-center px-6 py-4 whitespace-nowrap'>{user.email}</td>
        <td className='text-center px-6 py-4 whitespace-nowrap '>
          
          <button className='px-3 py-1 bg-blue-500 text-white rounded mr-2' onClick={()=>handleeditmodal(user)}>    
            Edit
          </button>
          <button className='px-3 py-1 bg-red-500 text-white rounded mr-2' onClick={()=>deleteuser(user.id)}>         
            Delete
          </button>
        </td>
      </tr>
    })
}
    

  </tbody>
</table>
</div>
)}
</>
    )}
    </section>
  </section>
{modal=="add" && (<Adduser setmodal={setmodal} users={users} setUsers={setUsers}/>)}   {/*{openmodal for add user}*/}
{modal=="edit" && (<Edituser setmodal={setmodal} user={currentUser} setUsers={setUsers}/>)}   {/*{openmodal for edit user}*/}

  </>
  )
}

export default Home







// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Adduser from './Adduser';
// import Edituser from './Edituser';

// const Home = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modal, setModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleAddModal = () => {
//     setModal('add');
//   };

//   const handleEditModal = (user) => {
//     setModal('edit');
//     setCurrentUser(user);
//   };

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
//       setUsers(users.filter((user) => user.id !== id));
//       toast.success('User Deleted Successfully');
//     } catch (e) {
//       console.log('Error', e);
//     }
//   };

//   const getAllUsers = async () => {
//     try {
//       const res = await axios.get('https://jsonplaceholder.typicode.com/users');
//       const data = await res.data;
//       setUsers(data);
//       setLoading(false);
//     } catch (e) {
//       console.log('Error', e);
//     }
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   return (
//     <>
//       <section className="flex justify-center items-center w-full border-blue-600">
//         <section className="flex flex-col justify-center items-center p-5 md:p-10 lg:p-20 w-full gap-6 md:gap-10 border-black">
//           <header className="flex flex-col md:flex-row w-full justify-between items-center mb-5">
//             <button
//               onClick={handleAddModal}
//               className="cursor-pointer bg-blue-700 px-4 py-2 rounded mb-4 md:mb-0 text-white text-lg md:text-xl"
//             >
//               + Add user
//             </button>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search User"
//               className="border border-sky-500 p-2 w-full md:w-auto"
//             />
//           </header>
//           {loading ? (
//             <h1>Loading.....</h1>
//           ) : (
//             <>
//               {filteredUsers.length === 0 ? (
//                 <h2>No user found</h2>
//               ) : (
//                 <div className="overflow-x-auto w-full">
//                   <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="px-4 py-2 border">Sr.No</th>
//                         <th className="px-4 py-2 border">Name</th>
//                         <th className="px-4 py-2 border">Username</th>
//                         <th className="px-4 py-2 border">Email</th>
//                         <th className="px-4 py-2 border">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredUsers.map((user, index) => (
//                         <tr
//                           className="hover:bg-gray-100 border even:bg-blue-100 odd:bg-green-200"
//                           key={index}
//                         >
//                           <td className="text-center px-6 py-4 whitespace-nowrap">{index + 1}</td>
//                           <td className="text-center px-6 py-4 whitespace-nowrap">
//                             <Link
//                               to={`/user/${user.id}`}
//                               state={{ user }}
//                               className="text-blue-500 underline"
//                             >
//                               {user.name}
//                             </Link>
//                           </td>
//                           <td className="text-center px-6 py-4 whitespace-nowrap">{user.username}</td>
//                           <td className="text-center px-6 py-4 whitespace-nowrap">{user.email}</td>
//                           <td className="text-center px-6 py-4 whitespace-nowrap">
//                             <button
//                               className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
//                               onClick={() => handleEditModal(user)}
//                             >
//                               Edit
//                             </button>
//                             <button
//                               className="px-3 py-1 bg-red-500 text-white rounded"
//                               onClick={() => deleteUser(user.id)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </>
//           )}
//         </section>
//       </section>
//       {modal === 'add' && <Adduser setModal={setModal} users={users} setUsers={setUsers} />}
//       {modal === 'edit' && <Edituser setModal={setModal} user={currentUser} setUsers={setUsers} />}
//     </>
//   );
// };

// export default Home;
