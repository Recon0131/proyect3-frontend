import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import { SlOptions } from "react-icons/sl";
import ConfimationDelete from "./ConfimationDelete";
import UpdatePost from "./UpdatePost";



function Posts({ posts }) {
  const [viewComments, setViewComments] = useState(false);
  const [idToView, setIdToView] = useState(null);
  const [viewOptions, setViewOptions] = useState(false);
  const [idToOptions, setIdToOptions] = useState(null);
  const [confirmations, setConfirmations] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null)
  const [viewUpdated, setViewUpdated] = useState(false)

  const user = useSelector((state) => state.user);

  return (
    <div className=" w-full justify-center">
      {posts.map((post, i) => {
        
        return (
          <div className=" relative my-2" key={i}>
            
            {
              viewUpdated && (
                <UpdatePost view={setViewUpdated} id={idToOptions}/>
              )
            }
            {confirmations && (
              <ConfimationDelete
                confirmations={setConfirmations}
                id={idToDelete}
              />
            )}
            {post.authorId.id === user.id ? (
              <div className=" absolute z-20">
                {viewOptions && idToOptions === post.id && (
                  <ul className=" absolute -top-20 bg-zinc-800 -mt-9 rounded-t-xl">
                    <li
                      className=" hover:bg-zinc-900 px-8 py-4 cursor-pointer rounded-t-xl"
                      onClick={() => {
                        setConfirmations(!confirmations);
                        setIdToDelete(post.id);
                      }}
                    >
                      Delete
                    </li>
                    <li className="hover:bg-zinc-900 px-8 py-4 cursor-pointer" onClick={()=>{
                      setViewUpdated(!viewUpdated)
                    }}>
                      Update
                    </li>
                  </ul>
                )}
                <SlOptions
                  className="hover:bg-background-buttom-dark-hover text-2xl m-2 p-1 rounded-full hover:cursor-pointer"
                  onClick={() => {
                    setIdToOptions(post.id);
                    setViewOptions(!viewOptions);
                  }}
                />
              </div>
            ) : (
              ""
            )}
            <section
              key={i}
              className=" columns-1 justify-center z-10 relative border-black border-2 py-3 px-6 hover:bg-background-input-dark hover:cursor-pointer hover:opacity-80 transition-all"
              onClick={() => {
                setViewComments(!viewComments);
                setIdToView(post.id);
              }}
            >
              <div className=" inline-flex mx-3 my-1 z-10">
                <img
                  src="https://res.cloudinary.com/dpuap0fag/image/upload/v1703116151/simple-user-default-icon-free-png_h7wqyg.png"
                  height="10"
                  width="50"
                />
                <div className=" mx-2 z-10">
                  <h2 className=" font-bold">{post.authorId.username}</h2>
                  <h1>{post.body}</h1>
                </div>
              </div>
              <div className=" float-right text-sm font-mono text-zinc-400 z-10">
                {post.createdAt}
              </div>
              <div className=" z-10">
                <span className=" flex gap-1 float-right">
                  <FaRegComment className=" my-auto" />
                  {<h1>{post.comments.length}</h1>}
                </span>
              </div>
            </section>
            {viewComments && idToView === post.id ? (
              <Comments
                PostComment={post}
                id={idToView}
                view={setViewComments}
              />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
