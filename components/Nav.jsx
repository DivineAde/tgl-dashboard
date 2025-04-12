import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { 
  FaStore, 
  FaChartBar, 
  FaSignOutAlt, 
  FaBox, 
  FaShoppingCart, 
  FaTags, 
  FaCog, 
  FaChevronRight
} from "react-icons/fa";

export default function Nav({ show }) {
  const router = useRouter();
  const { pathname } = router;
  const [activeSection, setActiveSection] = useState(null);

  const menuSections = [
    {
      title: "Management",
      items: [
        { name: "Dashboard", icon: <FaChartBar />, path: "/" },
        { name: "Products", icon: <FaBox />, path: "/products" },
        { name: "Orders", icon: <FaShoppingCart />, path: "/orders" },
        { name: "Categories", icon: <FaTags />, path: "/categories" },
      ]
    },
    {
      title: "Account",
      items: [
        { name: "Settings", icon: <FaCog />, path: "/settings" },
      ]
    }
  ];

  // Toggle section collapse
  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  // Check if a path is active
  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.includes(path)) return true;
    return false;
  };

  async function logout() {
    await router.push('/');
    await signOut();
  }

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 flex flex-col w-64 h-screen transition-transform bg-white border-r shadow-sm md:translate-x-0 ${
        show ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <FaStore className="text-blue-600 text-xl" />
          <span className="text-xl font-semibold">Topg Gadgets</span>
        </Link>
      </div>

      {/* Sidebar content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="search" 
              className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search..." 
            />
          </div>
        </div>

        {/* Menu sections */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className="mb-4">
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:bg-gray-50 group"
              >
                <span>{section.title}</span>
                <FaChevronRight 
                  className={`w-3 h-3 transition-transform duration-200 ${
                    activeSection === sectionIndex ? "transform rotate-90" : ""
                  }`} 
                />
              </button>

              <div className={`mt-1 space-y-1 ${activeSection === sectionIndex ? "block" : "hidden"}`}>
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`
                      group flex items-center px-3 py-2 text-sm rounded-md transition-colors
                      ${isActive(item.path) 
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"}
                    `}
                  >
                    <span className={`mr-3 ${isActive(item.path) ? "text-blue-600" : "text-gray-500"}`}>
                      {item.icon}
                    </span>
                    {item.name}
                    {isActive(item.path) && (
                      <span className="ml-auto h-5 w-1 rounded-full bg-blue-600"></span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Sidebar footer */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}