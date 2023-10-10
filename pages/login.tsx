import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const loginUser = async (e: any) => {
    e.preventDefault();
    signIn();
    router.push("/");
  }
  return (
      <div className="flex justify-center items-center m-auto p-3">
        <form
          onSubmit={loginUser}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value})
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              name="password"
              type="password"
              placeholder="******************"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value})
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2  px-4 rounded  focus:outline-none  focus:shadow-outline"
              type="submit"
            >
              Sign in
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
  );
}

LoginPage.auth = false