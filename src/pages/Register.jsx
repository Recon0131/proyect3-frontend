import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_REQUEST } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import cookieCutter from "cookie-cutter";
function Login() {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate= useNavigate();
  const [RegisterRequest, { loading, error,data }] = useMutation(REGISTER_REQUEST);
  const handleChange = ({ target: { name, value } }) => {
    setRegister({
      ...register,
      [name]: value,
    });
  };
  
  return (
    <div className=" max-w-lg m-auto my-36">
      <div>
        {error && (
          <p className=" bg-red-600 w-1/2 text-center m-auto px-5 py-3 dark:text-white font-bold">
            {error.message}
          </p>
        )}
        <h1 className=" dark:text-zinc-200 text-2xl font-bold">Register</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const data = await RegisterRequest({
                variables: {
                  email: register.email,
                  password: register.password,
                  username: register.username,
                },
              });
              
              cookieCutter.set("token", data.data.register);
              window.location.reload();
              navigate("/");
            } catch (error) {
             
            }
          }}
        >
          <section className="grid grid-cols-1 gap-20 my-12">
            <div className=" relative">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                className=" dark:bg-background-input-dark w-full p-2 dark:text-zinc-200 absolute rounded-xl peer outline-none px-4"
                required
              ></input>
              <label className=" dark:text-zinc-400 absolute p-2 pointer-events-none top-0 mx-2 transition-all peer-focus:-top-5 peer-valid:-top-5 ">
                Username
              </label>
            </div>
            <div className=" relative">
              <input
                type="text"
                name="email"
                onChange={handleChange}
                className=" dark:bg-background-input-dark w-full p-2 dark:text-zinc-200 absolute rounded-xl peer outline-none px-4"
                required
              ></input>
              <label className=" dark:text-zinc-400 absolute p-2 pointer-events-none top-0 mx-2 transition-all peer-focus:-top-5 peer-valid:-top-5 ">
                Email
              </label>
            </div>
            <div className=" relative ">
              <input
                type="password"
                onChange={handleChange}
                name="password"
                className=" dark:bg-background-input-dark w-full p-2 dark:text-zinc-200 absolute rounded-xl peer outline-none px-4"
                required
              ></input>
              <label className=" dark:text-zinc-400 absolute p-2 pointer-events-none top-0 mx-2 transition-all peer-focus:-top-5 peer-valid:-top-5 peer-focus-within:-top-5">
                Password
              </label>
            </div>
            <button className=" w-fit dark:text-zinc-200 dark:bg-background-buttom-dark px-4 py-2 rounded-xl dark:hover:bg-background-buttom-dark-hover">
              Register
            </button>

            <p className=" dark:text-zinc-300">
              You already have acount?{" "}
              <Link to={"/login"} className=" font-bold">
                Login
              </Link>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Login;
