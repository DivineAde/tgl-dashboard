import Link from "next/link"
import { FaHamburger } from "react-icons/fa"
import { BsViewList } from "react-icons/bs"
import { BiHome, BiCategory } from "react-icons/bi"
import { MdOutlineCategory } from "react-icons/md";
import { BiCog, BiLogOut } from "react-icons/bi"
import { CiReceipt } from "react-icons/ci";
import { FaShopify } from "react-icons/fa"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"

export default  function Nav ({ show }) {
  const inactiveLink = 'flex items-center gap-1 p-1';
  const activeLink = inactiveLink+ ' bg-white text-blue-900 rounded-lg';
  const router = useRouter();
  const {pathname} = router;

  async function logout() {
   await router.push('/')
    await signOut()
  }
  return (
    <>
     <aside className={(show ? "left-0 text-black top-0 p-4 capitalize fixed h-full w-full bg-[#F2EAE1] md:sticky md:w-auto transition-all" : "text-black top-0 p-4 capitalize fixed h-full w-full bg-[#F2EAE1] -left-full md:sticky md:w-auto transition-all")}>
      <Link href={'/'} className="flex items-center gap-1 mb-4 mr-4">
        <FaHamburger className=" w-8 h-8" />
        <span className="">
          TopggadgetsAdmin
        </span>
      </Link>
      <nav className="flex flex-col gap-2">
        <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
          <BiHome className=" w-7 h-7" />
          Dashboard
        </Link>
        <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
          <FaShopify className=" w-7 h-7" />
          Products
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <CiReceipt className=" w-7 h-7" />
          Orders
        </Link>
        <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
          <MdOutlineCategory className=" w-7 h-7" />
          Categories
        </Link>
        <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <BiCog className=" w-7 h-7" />
          Settings
        </Link>
        <button onClick={logout} className="flex gap-1 items-center">
          <BiLogOut className=" w-7 h-7" />
          Logout
        </button>
      </nav>
     </aside>
    </>
  )
}