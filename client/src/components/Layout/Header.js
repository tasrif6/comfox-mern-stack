// import React from 'react';
// import {NavLink,Link} from 'react-router-dom';
// import {useAuth} from "../../context/auth";
// import { GiShoppingBag } from "react-icons/gi";
// import toast from "react-hot-toast";
// import SearchInput from "../Form/SearchInput";
// import { useCart } from "../../context/cart";
// import { Badge } from 'antd';

// const Header = () => {
//   const [auth,setAuth] = useAuth();
//   const [cart] = useCart();
//   const handleLogout = () => {
//     setAuth({
//       ...auth,user:null,token:''
//     });
//     localStorage.removeItem('auth');
//     toast.success("Logout Sucdessfully");
//   };
//   return (
//     <>
//      <nav className="navbar navbar-expand-lg bg-body-tertiary">
//   <div className="container-fluid">
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon" />
//     </button>
//     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//       <Link to="/" className="navbar-brand"><GiShoppingBag /> ComFox </Link>
//       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//         <SearchInput />
//         <li className="nav-item">
//           <NavLink to="/" className="nav-link" aria-current="page" href="#">Home</NavLink>
//         </li>
//         {!auth.user ? (
//           <>
//           <li className="nav-item">
//           <NavLink to="/register" className="nav-link dropdown-toggle">Register</NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink to="/login" className="nav-link dropdown-toggle">Login</NavLink>
//         </li>
//           </>
//           ) : (
//           <>
//             <li className="nav-item dropdown">
//                     <NavLink
//                       className="nav-link dropdown-toggle"
//                       href="#"
//                       role="button"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       {auth?.user?.name}
//                     </NavLink>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <NavLink
//                           to={`/dashboard/${
//                             auth?.user?.role === 1 ? "admin" : "user"
//                           }`}
//                           className="dropdown-item"
//                         >
//                           Dashboard
//                         </NavLink>
//                         </li>
//           <li className="nav-item">
//              <NavLink onClick={handleLogout} to="/login" className="nav-link">LogOut</NavLink>
//           </li>
//           </ul>
//           </li>
//           </>
//           )
//         }
//         <li className="nav-item">
//           <Badge count={cart?.length} showZero>
//               <NavLink to="/cart" className="nav-link">
//                 Cart {cart?.length}
//               </NavLink>
//           </Badge>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>

//     </>
//   );
// };

// export default Header;

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import { GiShoppingBag } from "react-icons/gi";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";
import { Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: '' });
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar shadow-lg sticky-top">
        <div className="container-fluid">
          {/* Brand / Logo */}
          <Link to="/" className="navbar-brand fw-bold text-white d-flex align-items-center">
            <GiShoppingBag className="me-2 fs-3 text-warning" />
            ComFox
          </Link>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">

              {/* Search */}
              <li className="nav-item me-2">
                <SearchInput />
              </li>

              {/* Home */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>

              {/* Auth Links */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu animate-dropdown shadow-sm">
                    <li>
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink onClick={handleLogout} to="/login" className="dropdown-item text-danger">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              {/* Cart */}
              <li className="nav-item ms-3">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link fw-semibold">
                    🛒 Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;


