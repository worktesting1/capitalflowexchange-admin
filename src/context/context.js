import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // const baseUrl = "http://localhost:5000/api/";
  const baseUrl = "https://capitalflowexchange-api.onrender.com/api/";

  const [allDeposits, setAllDeposits] = useState([]);
  const [widthDrawals, setWidthDrawals] = useState([]);
  const [widthDrawalsLoading, setWidthDrawalsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [dLoading, setDLoading] = useState(false);
  const [usersLoading, setSLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  // Get All Deposits
  const getAllDeposits = (token) => {
    setDLoading(true);
    axios
      .get(`${baseUrl}deposit`, {
        headers: { token: token },
      })
      .then((data) => {
        if (data.status === 200) {
          setAllDeposits(data.data.deposits);
          setDLoading(false);
        }
      })
      .catch((error) => {
        setDLoading(false);
      });
  };
  const getAllWithdrawals = (token) => {
    setWidthDrawalsLoading(true);
    axios
      .get(`${baseUrl}transfer`, {
        headers: { token: token },
      })
      .then((data) => {
        if (data.status === 200) {
          setWidthDrawals(data.data.transfers);
          setWidthDrawalsLoading(false);
        }
      })
      .catch((error) => {
        setWidthDrawalsLoading(false);
      });
  };

  // Get All Users
  const getAllUsers = (token) => {
    setSLoading(true);
    axios
      .get(`${baseUrl}users`, {
        headers: { token: token },
      })
      .then((data) => {
        if (data.status === 200) {
          setSLoading(false);
          setAllUsers(data.data);
        }
      })
      .catch((error) => {
        setSLoading(false);
      });
  };

  // Get User Details
  const getUserDetails = (id) => {
    setUserLoading(true);
    axios
      .get(`${baseUrl}users/admin/${id}`, {
        headers: { token: adminToken },
      })
      .then((data) => {
        if (data.status === 200) {
          setUserDetails(data.data);
          setUserLoading(false);
        }
      })
      .catch((error) => {
        setUserLoading(false);
      });
  };

  return (
    <AppContext.Provider
      value={{
        baseUrl,
        getAllDeposits,
        allDeposits,
        getAllUsers,
        allUsers,
        getUserDetails,
        userDetails,
        dLoading,
        usersLoading,
        userLoading,
        getAllWithdrawals,
        widthDrawals,
        widthDrawalsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
