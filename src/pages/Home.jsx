import React, { useState } from "react";
import { GET_POSTS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Posts from "../components/Posts";
import { AiOutlineLoading } from "react-icons/ai";

function Home() {
  const { loading, data, error } = useQuery(GET_POSTS);

     
  return <div className=" text-white max-w-xl m-auto mt-20 movil:mx-4 ">
    {
      !loading && data ?  (<Posts posts={data.posts} />):(<AiOutlineLoading className=" animate-spin text-3xl flex m-auto" />)
    }
    
  </div>;
}

export default Home;
