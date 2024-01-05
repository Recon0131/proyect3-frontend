import { gql, useMutation } from "@apollo/client";
import React from "react";
import cookieCutter from "cookie-cutter";
import { DELETE_COMMENT } from "../graphql/mutations";
import { IoIosCloseCircle } from "react-icons/io";


function ConfimationDelete({ confirmations, id }) {
  const [DeletePostRequest] = useMutation(DELETE_COMMENT);
  
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen w-screen z-30">
      <div
        className="absolute opacity-20 bg-black z-0 h-screen w-screen"
        onClick={() => confirmations(false)}
      />
      <div className=" absolute z-10 max-w-lg min-h-80 left-0 right-0 ml-auto mr-auto my-20  bg-zinc-950 rounded-xl movil:mx-2">
      <IoIosCloseCircle
          className=" absolute text-4xl -top-2 -right-2"
          onClick={() => confirmations(false)}
        />
        <h1 className=" text-center mt-20 font-bold">
          Are you sure to delete this post?{" "}
        </h1>
        <div className=" flex gap-10 justify-center my-10">
          <button
            className=" bg-zinc-800 px-6 py-2 rounded-xl hover:bg-zinc-900"
            onClick={() => confirmations(false)}
          >
            Cancel
          </button>
          <button
            className=" bg-red-700 px-6 py-2 rounded-xl hover:bg-red-800"
            onClick={async () => {
              try {
                const res = await DeletePostRequest({
                  variables: {
                    id: id,
                    token: cookieCutter.get("token"),
                  }
                });
                window.location.reload();
              } catch (error) {
                console.log("error", error);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfimationDelete;
