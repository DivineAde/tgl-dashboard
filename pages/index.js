import Layout from "@/components/Layout";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  FaStore, 
  FaUserCircle, 
  FaShoppingCart, 
  FaBoxOpen, 
  FaChartLine,
  FaUsers,
  FaRegCreditCard,
  FaBell
} from "react-icons/fa";
import { 
  PieChart, 
  LineChart, 
  BarChart, 
  Calendar, 
  Activity, 
  TrendingUp,
  Package,
  ShoppingBag,
  DollarSign,
  AlertCircle
} from "lucide-react";

export default function Home() {
  const { data: session } = useSession();
  const [salesData, setSalesData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      // Simulate fetching data
      setTimeout(() => {
        setSalesData([
          { month: 'Jan', amount: 4500 },
          { month: 'Feb', amount: 6200 },
          { month: 'Mar', amount: 5100 },
          { month: 'Apr', amount: 8400 },
          { month: 'May', amount: 7800 },
          { month: 'Jun', amount: 9200 }
        ]);
        
        setNotifications([
          { id: 1, message: "New order #1042 received", time: "10 minutes ago", isNew: true },
          { id: 2, message: "Product 'Ultra Gadget X1' is low in stock", time: "2 hours ago", isNew: true },
          { id: 3, message: "Customer feedback submitted by John D.", time: "5 hours ago", isNew: false },
          { id: 4, message: "Weekly sales report is ready", time: "Yesterday", isNew: false }
        ]);
        
        setIsLoading(false);
      }, 1000);
    }
  }, [session]);

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col md:grid md:grid-cols-2 lg:grid-cols-[55%_45%]">
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
              Join our community of tech enthusiasts and discover premium
              gadgets at competitive prices.
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
                  <h1 className="text-xl font-bold tracking-wider text-gray-800">
                    TOPG GADGETS
                  </h1>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Get Started
              </h2>
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
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  Or create an account
                </span>
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
                By continuing, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
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

  return (
    <Layout>
      {/* Welcome Header with Notifications */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-800">
            Welcome back,{" "}
            <span className="font-bold text-blue-600">
              {session?.user?.name}
            </span>
          </h1>
          <p className="text-gray-500">
            Dashboard overview & analytics
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          {/* Notifications dropdown */}
          <div className="relative">
            <button className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <FaBell className="text-gray-600" />
              {notifications.filter(n => n.isNew).length > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>
          
          {/* User profile */}
          <div className="flex items-center space-x-3 bg-gray-100 rounded-full py-2 px-4">
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
              <span className="font-medium text-gray-800">
                {session?.user?.name}
              </span>
              <span className="text-xs text-gray-500">
                {session?.user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">$24,780</h3>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" /> 
                <span>12% increase</span>
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Orders</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">156</h3>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" /> 
                <span>8% increase</span>
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Products</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">432</h3>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" /> 
                <span>5% increase</span>
              </p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Customers</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">854</h3>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" /> 
                <span>18% increase</span>
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FaUsers className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content - 2 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md">Monthly</button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md">Yearly</button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="h-64 w-full">
                {/* This would be a real chart in a real app */}
                <div className="relative h-full w-full">
                  {/* Simplified chart for demo */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-48">
                    {salesData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center w-full">
                        <div 
                          className="w-10 bg-blue-500 hover:bg-blue-600 transition-all rounded-t-md"
                          style={{ height: `${(item.amount / 10000) * 100}%`, maxHeight: '100%' }}
                        ></div>
                        <div className="text-xs font-medium text-gray-500 mt-2">{item.month}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
                    <span>$10k</span>
                    <span>$7.5k</span>
                    <span>$5k</span>
                    <span>$2.5k</span>
                    <span>$0</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                    <FaBoxOpen className="text-blue-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium">Ultra Gadget X1</h3>
                    <p className="text-xs text-gray-500">45 units sold</p>
                  </div>
                  <span className="text-sm font-medium">$11,200</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center">
                    <FaBoxOpen className="text-green-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium">Tech Wearable Pro</h3>
                    <p className="text-xs text-gray-500">38 units sold</p>
                  </div>
                  <span className="text-sm font-medium">$9,500</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-md flex items-center justify-center">
                    <FaBoxOpen className="text-purple-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium">Smart Home Hub</h3>
                    <p className="text-xs text-gray-500">32 units sold</p>
                  </div>
                  <span className="text-sm font-medium">$7,800</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Category</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Electronics</span>
                    <span className="text-sm font-medium text-gray-700">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Smart Home</span>
                    <span className="text-sm font-medium text-gray-700">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Wearables</span>
                    <span className="text-sm font-medium text-gray-700">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Audio</span>
                    <span className="text-sm font-medium text-gray-700">22%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                notifications.map(notification => (
                  <div key={notification.id} className="flex items-start">
                    <div className={`w-2 h-2 mt-2 rounded-full ${notification.isNew ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <FaShoppingCart className="text-blue-600 text-xl mb-2" />
                <span className="text-sm font-medium">New Order</span>
              </button>
              
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <FaBoxOpen className="text-blue-600 text-xl mb-2" />
                <span className="text-sm font-medium">Add Product</span>
              </button>
              
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <FaUsers className="text-blue-600 text-xl mb-2" />
                <span className="text-sm font-medium">Customers</span>
              </button>
              
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <FaChartLine className="text-blue-600 text-xl mb-2" />
                <span className="text-sm font-medium">Reports</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Payments</h2>
              <span className="text-sm text-gray-500">April 2025</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-md">
                  <FaRegCreditCard className="text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">Supplier Payment</h3>
                  <p className="text-xs text-gray-500">Due in 3 days</p>
                </div>
                <span className="ml-auto font-medium">$2,150</span>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-amber-100 rounded-md">
                  <FaRegCreditCard className="text-amber-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">Shipping Service</h3>
                  <p className="text-xs text-gray-500">Due in 5 days</p>
                </div>
                <span className="ml-auto font-medium">$890</span>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-md">
                  <FaRegCreditCard className="text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">Marketing Campaign</h3>
                  <p className="text-xs text-gray-500">Due in 7 days</p>
                </div>
                <span className="ml-auto font-medium">$1,200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}