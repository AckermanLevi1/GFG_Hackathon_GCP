import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Content/context/AuthorizationContext";
//icons
import { CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AgricultureIcon from "@mui/icons-material/Agriculture";
//components
import UserProfileDisplay from "./userProfileDetails/user_profile_display.js";
import Orders from "../Content/orders/recentOrders";
import Cart from "../Cart/my_cart";
import UserProducts from "./userproducts/userProducts";
import ServicesRequested from "./services_requested/servicesRequested";
//api
import { getUser } from "../api/getUser";
import "./user_profile.css";

export default function User_profile() {
  const [data, setData] = useState({});
  const [activeComponent, setActiveComponent] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const useAuth = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      if (useAuth.currentUser) {
        try {
          setIsLoading(true);
          await getUser(useAuth.currentUser.email).then((result) => {
            setData({ ...result.data });
            setIsLoading(false);
          });
        } catch (error) {
          setIsLoading(false);
          console.log(error.message);
        }
      }
    }
    fetchData();
  }, [useAuth.currentUser]);
  if (isLoading) {
    return <CircularProgress />;
  }
  if (!useAuth.currentUser) {
    return <Navigate to={"/signin"} />;
  }

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await useAuth.SignOut().then((result) => {
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  function setActive(e) {
    setActiveComponent(e.target.id);
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });
    document.getElementById(e.target.id).classList.add("active");
  }

  return (
    <div className="proot">
      <div className="dashboard-container">
        <div className="nav-container">
          <div className="user_details">
            <img className="user-image" src={data?.ip} alt="User photo"></img>
            <div className="user-name">{data?.userName}</div>
            <div className="user-email">{data?.email}</div>
          </div>
          <div className="nav-options">
            <div
              className="nav-item active"
              id="1"
              onClick={(e) => setActive(e)}>
              <ManageAccountsIcon /> User Profile
            </div>
            <div className="nav-item " id="2" onClick={(e) => setActive(e)}>
              <ShoppingCartIcon /> Cart
            </div>
            <div className="nav-item" id="3" onClick={(e) => setActive(e)}>
              <LocalMallIcon /> Orders
            </div>
            <div className="nav-item" id="4" onClick={(e) => setActive(e)}>
              <Inventory2Icon /> Inventory
            </div>
            <div className="nav-item" id="5" onClick={(e) => setActive(e)}>
              <AgricultureIcon /> Service Requests
            </div>
            <button
              disabled={isLoading}
              onClick={() => handleSignOut()}
              className="logout_button">
              {!isLoading ? `Log out ` : <CircularProgress />}
              <LogoutIcon />
            </button>
          </div>
        </div>
        <div className="content-container">
          {activeComponent == 1 && <UserProfileDisplay data={data} />}
          {activeComponent == 2 && <Cart />}
          {activeComponent == 3 && <Orders />}
          {activeComponent == 4 && <UserProducts />}
          {activeComponent == 5 && <ServicesRequested />}
        </div>
      </div>
    </div>
  );
}
