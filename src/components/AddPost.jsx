import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_POST } from "../graphql/mutations";
import { useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";

function AddPost({ view }) {
  const user = useSelector((state) => state.user);
  const [PostRequest] = useMutation(ADD_POST);
  const [addBody, setAddBody] = useState({
    body: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setAddBody({
      ...addBody,
      [name]: value,
    });
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen w-screen z-30">
      <div
        className=" absolute opacity-80 bg-black z-0 h-screen w-screen"
        onClick={() => view(false)}
      />
      <div className=" absolute z-10 max-w-lg min-h-80 left-0 right-0 ml-auto mr-auto my-20  bg-zinc-950 rounded-xl movil:mx-2">
        <IoIosCloseCircle
          className=" absolute text-4xl -top-2 -right-2"
          onClick={() => view(false)}
        />
        <h1 className=" flex justify-center font-bold font-mono text-xl my-10">
          Add a new post:{" "}
        </h1>
        <input
          type="text"
          className=" flex m-auto p-1 min-w-96 text-zinc-800 pb-10 rounded-xl movil:min-w-80"
          name="body"
          onChange={handleChange}
        />
        <div className=" flex justify-center my-10 gap-10">
          <button
            className=" bg-zinc-800 px-6 py-2 rounded-xl hover:bg-zinc-900"
            onClick={() => view(false)}
          >
            Cancel
          </button>
          <button
            className=" bg-background-buttom-dark px-6 py-2 rounded-xl hover:bg-background-buttom-dark-hover"
            onClick={async () => {
              try {
                const res = await PostRequest({
                  variables: {
                    body: addBody.body,
                    authorId: user.id,
                  },
                });
                console.log(res);
                window.location.reload();
              } catch (error) {
                console.log("error", error);
              }
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
