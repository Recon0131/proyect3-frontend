import React, { useState } from "react";
import { IoIosCloseCircle, IoMdSad } from "react-icons/io";
import { useSelector } from "react-redux";
import cookieCutter from "cookie-cutter";
import { ADD_COMMENT } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

function Comments({ PostComment, id, view }) {
  const user = useSelector((state) => state.user);

  const [CommentPostRequest] = useMutation(ADD_COMMENT);

  const [addComment, setAddComment] = useState({
    comment: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setAddComment({
      ...addComment,
      [name]: value,
    });
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen w-screen z-30">
      <div
        className=" absolute opacity-80 bg-black z-0 h-screen w-screen"
        onClick={() => view(false)}
      />
      <div className=" absolute z-10 max-w-lg min-h-80 left-0 right-0 ml-auto mr-auto my-20  bg-zinc-950 rounded-xl movil:mx-4">
      <IoIosCloseCircle
          className=" absolute text-4xl -top-2 -right-2"
          onClick={() => view(false)}
        />
        <div className=" mx-5 my-4 mb-20 text-center movil:mx-1">
          {user.isAuthenticated ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await CommentPostRequest({
                    variables: {
                      comment: addComment.comment,
                      postId: PostComment.id,
                      token: cookieCutter.get("token"),
                    },
                  });
                  window.location.reload();
                } catch (error) {
                  console.log("error", error);
                }
              }}
            >
              <h1 className=" font-bold font-mono text-xl">
                Add your comment:
              </h1>
              <textarea
                type="text"
                onChange={handleChange}
                name="comment"
                className=" rounded-lg bg-background-input-dark min-w-96 p-1 pb-10 my-4 movil:min-w-80"
              />
              <button className="flex m-auto bg-background-buttom-dark px-6 py-2 rounded-xl font-bold hover:bg-background-buttom-dark-hover">
                Post
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
        <div className=" max-h-96 overflow-y-auto scrollbar-thumb-background-buttom-dark scrollbar-thin">
          <h1 className=" font-bold text-center text-xl font-mono mt-2 mb-5">
            Comments:
          </h1>
          {PostComment.comments.length < 1 && (
            <div className="flex justify-center items-center my-auto gap-2 mb-10">
              <h1 className=" text-zinc-300">
                It seems no one has commented yet{" "}
              </h1>
              <IoMdSad className=" text-3xl text-zinc-600" />
            </div>
          )}

          <section>
            {PostComment.comments.map((comment, i) => {
              return (
                <div
                  key={i}
                  className=" border-2 border-zinc-800 px-4 py-4 columns-1 justify-center"
                >
                  <p className=" float-right font-mono text-zinc-500">
                    {comment.createdAt}
                  </p>
                  <div className=" inline-flex mx-3 my-1">
                    <img
                      src="https://res.cloudinary.com/dpuap0fag/image/upload/v1703116151/simple-user-default-icon-free-png_h7wqyg.png"
                      height="5"
                      width="50"
                    />
                    <div className=" mx-4 ">
                      <h1 className=" font-bold">{comment.user.username}</h1>
                      <p className=" my-2">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Comments;
