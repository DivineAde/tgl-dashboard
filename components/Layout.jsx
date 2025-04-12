import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Nav from "@/components/Nav";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SiPrestashop } from "react-icons/si";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { FaStore, FaUserCircle } from "react-icons/fa";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleMenu() {
    setShowNav(!showNav);
  }

  if (session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Topg Gadgets - Dashboard</title>
          <meta name="description" content="Your premium gadget store dashboard" />
        </Head>

        {/* Mobile header */}
        <header className={`md:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
          <div className="flex justify-between items-center px-4 py-3">
            <Link href="/" className="flex items-center space-x-2">
              <FaStore className="text-blue-600 text-xl" />
              <span className="font-bold text-gray-800">TOPG GADGETS</span>
            </Link>
            <button 
              onClick={toggleMenu} 
              className="z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {showNav ? <IoCloseOutline size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </header>

        {/* Main layout */}
        <div className="flex pt-14 md:pt-0">
          {/* Sidebar navigation */}
          <Nav show={showNav} />
          
          {/* Main content */}
          <main className="flex-1 transition-all duration-300 md:ml-64">
            <div className="container mx-auto p-4 md:p-6">
              {/* Desktop header */}
              <div className="hidden md:flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <div className="flex items-center space-x-3">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      className="w-10 h-10 rounded-full border-2 border-blue-500"
                      alt={session?.user?.name || "User"}
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-400" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{session?.user?.name}</span>
                    <span className="text-xs text-gray-500">{session?.user?.email}</span>
                  </div>
                </div>
              </div>
              
              {/* Content wrapper */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Auth layout when not logged in
  return (
    <div className="flex min-h-screen flex-col md:grid md:grid-cols-2 lg:grid-cols-[55%_45%]">
      <Head>
        <title>Topg Gadgets - Sign In</title>
        <meta name="description" content="Sign in to your Topg Gadgets account" />
      </Head>
      
      {/* Left side - Brand section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 relative hidden md:flex flex-col justify-center px-8 py-12 text-white">
        <nav className="absolute top-8 left-0 flex w-full px-8">
          <div className="flex items-center space-x-2">
            <FaStore className="text-2xl" />
            <h1 className="text-xl font-bold tracking-wider">TOPG GADGETS</h1>
          </div>
        </nav>
        
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to the future of tech shopping
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed">
            Join our community of tech enthusiasts and discover premium gadgets at competitive prices.
          </p>
          
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-3xl font-bold">5K+</p>
              <p className="text-sm">Products</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-3xl font-bold">99%</p>
              <p className="text-sm">Satisfaction</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Authentication section */}
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="md:hidden flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <FaStore className="text-2xl text-blue-600" />
                <h1 className="text-xl font-bold tracking-wider text-gray-800">TOPG GADGETS</h1>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Get Started</h2>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          {/* Auth buttons */}
          <div className="space-y-4">
            <button 
              onClick={async () => await signIn()}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <FaUserCircle className="text-lg" />
              <span>Sign in with Email</span>
            </button>
            
            <button 
              onClick={async () => await signIn("google")}
              className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg transition-all shadow-sm hover:shadow-md hover:bg-gray-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
            
            <div className="flex items-center justify-center space-x-3 my-4">
              <div className="h-px bg-gray-300 w-full"></div>
              <span className="text-sm text-gray-500 whitespace-nowrap">Or create an account</span>
              <div className="h-px bg-gray-300 w-full"></div>
            </div>
            
            <button 
              onClick={async () => await signIn()}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 Topg Gadgets. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}