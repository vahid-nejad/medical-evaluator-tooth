"use client";
import React, { FormEventHandler, useRef } from "react";
import { Button } from "./Button";

import Link from "next/link";

import { signIn } from "next-auth/react";
import { TextBox } from "./elements";

interface Props {
  className?: string;
  message?: string;
  messageType?: "error" | "info";
  callbackUrl?: string;
}
const Login = (props: Props) => {
  const userName = useRef("");
  const pass = useRef("");
  const loginRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(
      "credentials",

      {
        redirect: true,
        callbackUrl: props.callbackUrl ?? "http://localhost:3000",
        username: userName.current,
        password: pass.current,
      }
    );
  };

  return (
    <div className={props.className}>
      <div className="bg-gradient-to-b from-slate-50 to-slate-200 p-2 text-center text-slate-600">
        Login Form
      </div>
      <p>{props.message}</p>
      <form onSubmit={loginRequest} className="p-2 flex flex-col gap-3">
        <TextBox
          name="username"
          labelText="User Name"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <TextBox
          name="password"
          type="password"
          labelText="Password"
          onChange={(e) => (pass.current = e.target.value)}
        />
        <div className="flex items-center justify-center mt-2 gap-2">
          <Button type="submit" className="w-28">
            Sign In
          </Button>
          <Link
            //not defined yet
            href={"/auth/register"}
            className="w-28 border border-violet-600 text-center py-2 rounded-md text-violet-600 transition hover:bg-violet-600 hover:text-white hover:border-transparent active:scale-95"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
