import Layout from "@/components/Layout";
import { signIn, useSession } from "next-auth/react";
import { BsFillEmojiWinkFill } from "react-icons/bs";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <div className="flex min-h-screen flex-col w-screen md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
          <div className="auth-bg relative hidden md:flex flex-1 flex-col justify-center px-5 pt-8 text-[#fff] md:px-6 py-[22px] lg:px-8">
            <nav className="absolute top-8 left-0 flex w-full px-5">
              <h1 className=" uppercase font-bold">Topg Gadgets</h1>
            </nav>
            <div>
              <h1 className=" text-3xl font-bold capitalize flex items-center">
                Welcome to Topg gadgets.
                <BsFillEmojiWinkFill className="text-[#FE7600]" />
              </h1>
              <p className="text-lg font-medium text-gray-100">
                Sign in with your email address or Google account
              </p>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center h-screen p-3">
            <h2 className=" font-bold text-2xl">Get Started</h2>

            <div className="w-full max-w-[440px] mt-5">
              <div className="grid sm:grid-cols-2 gap-x-3 gap-y-3">
                <button className="relative flex h-[50px] items-center justify-center overflow-hidden bg-blue-600 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px] rounded-md">
                  <span
                    className="relative z-10"
                    onClick={async () => await signIn()}
                  >
                    Sign-In
                  </span>
                </button>
                <button className="relative flex h-[50px] items-center justify-center overflow-hidden bg-blue-600 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px] rounded-md">
                  <span
                    className="relative z-10"
                    onClick={async () => await signIn()}
                  >
                    Sign-Up
                  </span>
                </button>
              </div>
            </div>

            <div className="absolute bottom-10">
              <p className=" text-gray-500 font-bold opacity-60">
                Divine Adeyeye &copy; 2023
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between">
        <div>
          <h1>
            Hello, <span className="font-bold">{session?.user?.name}</span>
          </h1>
        </div>
        <div className="flex items-center bg-slate-700 text-white rounded-lg p-1">
          <img
            src={session?.user?.image}
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <span className="">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
