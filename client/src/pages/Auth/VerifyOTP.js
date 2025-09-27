// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Layout from "../../components/Layout/Layout";
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import "../../styles/AuthStyles.css";
// import { useAuth } from "../../context/auth";

// const VerifyOTP = () => {
//     const [otp, setOtp] = useState('');
//     const [auth, setAuth] = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const handleVerifyOTP = async (e) => {
//         e.preventDefault();
//         const userId = sessionStorage.getItem('userId');
//         try {
//             const res = await axios.post(`/api/v1/auth/verify-otp`, { userId, otp });
//             if (res && res.data.success) {
//                 toast.success(res.data.message);
//                 // OTP is correct, store the token and proceed to the dashboard
//                 setAuth({
//                     ...auth,
//                     user: res.data.user,
//                     token: res.data.token,
//                 });
//                 localStorage.setItem("auth", JSON.stringify(res.data));
//                 navigate(location.state?.from || '/');
//             } else {
//                 toast.error(res.data.message);
//             }
//         } catch (error) {
//             console.error("Error in OTP verification request:", error); 
//             toast.error('Invalid OTP');
//         }
//     };

//     return (
//         <Layout title="Verify OTP - Ecommerce App">
//             <div className="form-container">
//                 <form onSubmit={handleVerifyOTP}>
//                     <h4 className="title">VERIFY OTP</h4>
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                             className="form-control"
//                             placeholder="Enter Your OTP"
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary">
//                         VERIFY
//                     </button>
//                 </form>
//             </div>
//         </Layout>
//     );
// };

// export default VerifyOTP;