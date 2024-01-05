import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Cookiecutter from 'cookie-cutter'
import { redirect } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import AddPost from './AddPost';


function NavBar() {
    const user = useSelector((state)=>state.user)
    const [showAddPost,setShowAddPost] = useState(false);

    const logout = ()=>{

        Cookiecutter.set("token", "")
        redirect("/login")
        window.location.reload()
    }
    
  return (
    <div className=" dark:text-white flex justify-between m-3 mx-5">
      <a href="/" className=" font-bold my-auto">
        FriendFind
      </a>
      <div className="flex flex-row gap-10 mx-5 my-2">
        {user.id ? (
          <div className=" flex gap-10 font-bold">
            <IoMdAdd className=' text-2xl cursor-pointer' onClick={()=>setShowAddPost(!showAddPost)}/>
            <h1> {user.username}</h1>
            <button onClick={()=>logout()} >Logout</button>
          </div>
        ) : (
          <div className=' font-bold flex gap-5'>
            <a href='/login'>Login</a>
            <a href="/register">Register</a>
          </div>
        )}
      </div>
      {
        showAddPost && <AddPost view={setShowAddPost}/>
      }
    </div>
  )
}

export default NavBar