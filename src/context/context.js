import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // const baseUrl = "http://localhost:5000/api/";
  const baseUrl = "https://coresmarket-api.onrender.com/api/";

  const [allDeposits, setAllDeposits] = useState([]);
  const [allAssetDeposits, setAllAssetDeposits] = useState([]);
  const [widthDrawals, setWidthDrawals] = useState([]);
  const [widthDrawalsLoading, setWidthDrawalsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [dLoading, setDLoading] = useState(false);
  const [usersLoading, setSLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [fundingRequests, setFundingRequests] = useState([]);
  const [assetfundingRequests, setassetFundingRequests] = useState([]);
  const [userKyc, setUserKYC] = useState([]);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [wLoading, setWLoading] = useState(false);

  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  // Get All Deposits
  const getAllDeposits = (token) => {
    setDLoading(true);
    axios
      .get(`${baseUrl}admin/all-funding`, {
        headers: { token: token },
      })
      .then((data) => {
        if (data.status === 200) {
          setAllDeposits(data.data);
          setDLoading(false);
        }
      })
      .catch((error) => {
        setDLoading(false);
      });
  };
  const getAllAssetDeposits = (token) => {
    setDLoading(true);
    axios
      .get(`${baseUrl}asset-admin/all-funding`, {
        headers: { token: token },
      })
      .then((data) => {
        if (data.status === 200) {
          setAllAssetDeposits(data.data);
          setDLoading(false);
        }
      })
      .catch((error) => {
        setDLoading(false);
      });
  };
  const getAllFundingRequest = (token) => {
    axios
      .get(`${baseUrl}admin/funding-requests`, {
        headers: { token: token },
      })
      .then((data) => {
        setFundingRequests(data.data.requests);
      })
      .catch((error) => {});
  };
  const getAllAssetFundingRequest = (token) => {
    axios
      .get(`${baseUrl}asset-admin/funding-requests`, {
        headers: { token: token },
      })
      .then((data) => {
        setassetFundingRequests(data.data.requests);
      })
      .catch((error) => {});
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
        // setWidthDrawalsLoading(false);
      });
  };
  const navigate = useNavigate();

  const withdrawalFailed = (id, userId) => {
    setWLoading(true);
    axios
      .put(
        `${baseUrl}wallet/withdrawals/approve/${id}`,
        {
          status: "failed",
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        if (data.status === 200) {
          setWLoading(false);
          getUserDetails(userId);
          toast.success("Withdrawal Reject");
          setTimeout(() => {
            navigate("/all-withdrawals");
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.response.data.message === "Withdrawal already finalized") {
          toast.error("Withdrawal already finalized");
        }

        setWLoading(false);
      });
  };

  const getUserPortfolio = (userId, token) => {
    axios
      .get(`${baseUrl}asset-trade/portfolio/${userId}`, {
        headers: { token },
      })
      .then((response) => {
        setUserPortfolio(response.data.portfolio);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserKYC = (adminToken, id) => {
    axios
      .get(`${baseUrl}kyc/${id}`, {
        headers: { token: adminToken },
      })
      .then((data) => {
        if (data.status === 200) {
          setUserKYC(data.data);
        }
      })
      .catch((error) => {});
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
        getAllAssetFundingRequest,
        assetfundingRequests,
        getAllAssetDeposits,
        allAssetDeposits,
        getUserPortfolio,
        userPortfolio,
        withdrawalFailed,
        wLoading,
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
