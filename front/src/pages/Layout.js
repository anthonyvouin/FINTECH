import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>

      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
          <Link className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
                to="/">
            Home
          </Link>
        <div>
          <Link to="/" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Home</Link>
          <Link to="/contact" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Contact</Link>
        </div>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;