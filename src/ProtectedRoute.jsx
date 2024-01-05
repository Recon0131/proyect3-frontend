import React from "react";
import { useQuery } from "@apollo/client";
import cookieCutter from "cookie-cutter";
import { Navigate, Outlet } from "react-router-dom";
import { VERIFY } from "./graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { changeAuth } from "./redux/userSlide.js";
import { AiOutlineLoading } from "react-icons/ai";

function ProtectedRoute() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user)

  try {
    const { loading, data, error } = useQuery(VERIFY, {
      variables: {
        token: cookieCutter.get("token"),
      },
    });
    
 
    if (!loading && data.verify) {
      
      dispatch(changeAuth({ isAuthenticated: true }));
      return <Navigate to="/" replace={true} />;
    }
    if(loading){
      return <AiOutlineLoading className=" animate-spin" />
    }
  } catch (error) {
    
  }

  return <Outlet />;
}

export default ProtectedRoute;
