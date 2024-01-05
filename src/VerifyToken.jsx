import React from "react";
import { useQuery } from "@apollo/client";
import cookieCutter from "cookie-cutter";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { VERIFY } from "./graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import {addUser, changeAuth} from './redux/userSlide.js'
import { AiOutlineLoading } from "react-icons/ai";

function VerifyToken() {
  const dispatch = useDispatch();
  
  try {
    const { loading, data, error } = useQuery(VERIFY, {
      variables: {
        token: cookieCutter.get("token"),
      },
    });
    if (!loading && data.verify) {
        
        dispatch(addUser(data.verify));    
        dispatch(changeAuth({isAuthenticated:true}));    
    }
    if(error){
      console.log(error)
    }
    
    if(loading){
      return <AiOutlineLoading className=" animate-spin" />
    }
  } catch (error) {
    
  }
  
  return <Outlet />;
}

export default VerifyToken;
