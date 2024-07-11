"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { AppConstants } from "../constants";
import useAuth from "./useAuth";
import { redirect } from "next/navigation";

export default function LoginForm(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(props);

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const [error, setError] = useState("");

  if (isAuthenticated) {
    console.log("authenitcated");

    redirect(props.redirect);
  }

  function doLogin() {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`, {
        identifier: username,
        password,
      })
      .then((res) => {
        if (res.status === 200 && res.data.jwt && typeof window !== 'undefined') {
          window.localStorage.setItem(AppConstants.ACCESS_TOKEN, res.data.jwt);
          setIsAuthenticated(true);
        } else {
          console.log(res.data);
          setError("error occurrred");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("error occurrred");
      });
  }

  return (
    <div className="flex max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700 content-center flex-col">
      <div className="h-20 flex justify-center items-center mt-5">
        <h1 className="text-black">LOGO</h1>
        {/* {<Image
          src="/lumen-logo-login.svg"
          alt="lumen"
          width={200}
          height={40}></Image>} */}
      </div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="email"
        className="h-9 w-80 border border-gray-200 rounded-lg text-black pl-2 m-7 mb-4"></input>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            doLogin();
          }
        }}
        type="password"
        className="h-9  w-80 mb-4 border border-gray-200 rounded-lg  text-black pl-2 m-7 mt-0"></input>
      <button
        onClick={doLogin}
        className="h-9 m-7 w-80 flex justify-center items-center lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm hover:border-2 rounded-md hover:border-primary-600 cursor-pointer bg-blue-600">
        Login
      </button>
    </div>
  );
}
