import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const baseUrl = "http://localhost:5000/api/";
  // const baseUrl = "https://capitalflowexchange-api.onrender.com/api/";

  const [allDeposits, setAllDeposits] = useState([]);
  const [widthDrawals, setWidthDrawals] = useState([]);
  const [widthDrawalsLoading, setWidthDrawalsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [dLoading, setDLoading] = useState(false);
  const [usersLoading, setSLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [fundingRequests, setFundingRequests] = useState([]);
  const [userKyc, setUserKYC] = useState([]);
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  // Get All Deposits
  const getAllDeposits = (token) => {
    setDLoading(true);
    axios
      .get(`${baseUrl}admin/all-funding`, {
        headers: { token: token },
      })
      .then((data) => {
        console.log(data);

        if (data.status === 200) {
          setAllDeposits(data.data);
          setDLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);

        setDLoading(false);
      });
  };
  const getAllFundingRequest = (token) => {
    axios
      .get(`${baseUrl}admin/funding-requests`, {
        headers: { token: token },
      })
      .then((data) => {
        console.log(data);
        setFundingRequests(data.data.requests);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllWithdrawals = (token) => {
    setWidthDrawalsLoading(true);
    axios
      .get(`${baseUrl}withdraw`, {
        headers: { token: token },
      })
      .then((response) => {
        if (response.status === 200) {
          setWidthDrawals(response.data.withdrawals);
          setWidthDrawalsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);

        // setWidthDrawalsLoading(false);
      });
  };

  const getUserKYC = (adminToken, id) => {
    axios
      .get(`${baseUrl}kyc/${id}`, {
        headers: { token: adminToken },
      })
      .then((data) => {
        console.log(data);

        if (data.status === 200) {
          setUserKYC(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
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
        getAllFundingRequest,
        fundingRequests,
        userKyc,
        getUserKYC,
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
