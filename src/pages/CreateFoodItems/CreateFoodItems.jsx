import React, { useEffect, useState } from "react";
import "./CreateFoodItems.css";
import { Button, CreateFoodHeader } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateFoodItems = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { baseUrl, getUserDetails, userDetails } = useGlobalContext();
  const { accessDeposit, symbol, country } = userDetails;
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  const [wLoading, setWLoading] = useState(false);
  const [symbolLoading, setSymbolLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBonus, setLoadingBonus] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingOtpMessage, setLoadingOtpMessage] = useState(false);
  const [bonus, setbonus] = useState(false);
  const [profit, setprofit] = useState(false);
  const [otpMessage, setotpMessage] = useState(false);
  const [formatMessage, setformatMessage] = useState(false);
  const [formatMessageLoading, setformatMessageLoading] = useState(false);
  const [otp, setotp] = useState("");
  const [transferStep, setTransferStep] = useState("");
  const [firstFormat, setfirstFormat] = useState("");
  const [headerText, setheaderText] = useState("");
  const [loadingTransfer, setLoadingT] = useState(false);
  const [firstFormatLoader, setFirstFormatLoader] = useState(false);
  const [loadingInvestStatus, setLoadingInvestStatus] = useState(false);
  const [activateDepositLoading, setactiveDLoading] = useState(false);
  const [headerTextLoader, setheaderTextLoader] = useState(false);
  const notify = () => toast.success("User Details Updated");

  const navigateBack = () => {
    navigate(`/user-details/${id}`);
  };

  const handleBonus = () => {
    setLoadingBonus(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { bonus: bonus },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoadingBonus(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoadingBonus(false);
      });
  };
  const handleTransferStep = () => {
    setLoadingT(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { transferStep: transferStep },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoadingT(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoadingT(false);
      });
  };
  const handleProfit = () => {
    setLoading(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { profit: profit },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoading(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const handleOtp = () => {
    setLoadingOtp(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { userOtp: otp },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoadingOtp(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoadingOtp(false);
      });
  };
  const handleOtpMessage = () => {
    setLoadingOtpMessage(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { otpMessage: otpMessage },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoadingOtpMessage(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoadingOtpMessage(false);
      });
  };
  const handleFormatMesssage = () => {
    setformatMessageLoading(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { formatMessage: formatMessage },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setformatMessageLoading(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setformatMessageLoading(false);
      });
  };
  const handleFirstBillingHeaderText = () => {
    setheaderTextLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { headerText: headerText },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setheaderTextLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setheaderTextLoader(false);
      });
  };
  const handleFirstBilling = () => {
    setFirstFormatLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { firstFormat: firstFormat },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setFirstFormatLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setFirstFormatLoader(false);
      });
  };
  const activateWithdrawal = () => {
    setWLoading(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        {
          status: true,
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        if (data.status === 200) {
          toast.success("Withdrawal Active");
          setWLoading(false);
          setTimeout(() => {
            navigate("/users");
          }, 2000);
        }
      })
      .catch((error) => {
        setWLoading(false);
      });
  };
  const activateDeposit = () => {
    setactiveDLoading(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        {
          accessDeposit:
            accessDeposit === "hello" || accessDeposit === "inactive"
              ? "active"
              : "inactive",
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        if (data.status === 200) {
          getUserDetails(id);
          toast.success(
            accessDeposit !== "active"
              ? "Deposit Activated"
              : "Deposit Inactive"
          );
          setactiveDLoading(false);
          setTimeout(() => {
            navigate("/users");
          }, 2000);
        }
      })
      .catch((error) => {
        setactiveDLoading(false);
      });
  };

  const getSymbol = symbol == "" ? "$" : symbol === "$" ? country.symbol : "";

  const handleSymbol = () => {
    setSymbolLoading(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        {
          symbol: getSymbol,
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        if (data.status === 200) {
          if (symbol !== "$") {
            toast.success("You Can Pay in Dollar");
          } else {
            toast.success("You Can Pay in their currency");
          }
          setSymbolLoading(false);
          setTimeout(() => {
            navigate("/user-details/" + userDetails._id);
          }, 2000);
        }
      })
      .catch((error) => {
        setSymbolLoading(false);
      });
  };

  const handleStartTrade = () => {
    setLoadingInvestStatus(true);

    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        {
          startTrade: userDetails.startTrade === "true" ? "false" : "true",
          email: userDetails.email,
          name: `${userDetails.firstName} ${userDetails.lastName}`,
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoadingInvestStatus(false);
        if (userDetails.startTrade === "false") {
          toast.success("Trade Start");
        } else {
          toast.success("Trade Ended");
        }
        getUserDetails(id);
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoadingInvestStatus(false);
      });
  };

  useEffect(() => {
    getUserDetails(id);
  }, []);

  console.log(userDetails.startTrade);

  return (
    <section className="add_food_item_container">
      <CreateFoodHeader
        btn={false}
        navigateBack={navigateBack}
        title={"Update User Details"}
      />
      <div className="add_food_item_form">
        <div className="add_food_item_form_item_three">
          <p className="add_food_item_form_labels">Profit</p>
          <input
            type="text"
            name="profit"
            className="food_item_inputs"
            placeholder="Profit"
            onChange={(e) => setprofit(e.target.value)}
            defaultValue={userDetails.profit}
          />
        </div>
        <Button
          icon={
            loading && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Profit"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleProfit}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Bonus</p>
          <input
            type="text"
            name="bonus"
            className="food_item_inputs"
            placeholder="Bonus"
            onChange={(e) => setbonus(e.target.value)}
            defaultValue={userDetails.bonus}
          />
        </div>
        <Button
          icon={
            loadingBonus && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Bonus"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleBonus}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Code</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update Code"
            onChange={(e) => setotp(e.target.value)}
            defaultValue={userDetails.userOtp}
          />
        </div>
        <Button
          icon={
            loadingOtp && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update OTP"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleOtp}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Billing Format</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="OTP Message"
            defaultValue={userDetails.otpMessage}
            onChange={(e) => setotpMessage(e.target.value)}
          />
        </div>
        <Button
          icon={
            loadingOtpMessage && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Format Message"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleOtpMessage}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Billing Format Message</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Billing Message"
            defaultValue={userDetails.formatMessage}
            onChange={(e) => setformatMessage(e.target.value)}
          />
        </div>
        <Button
          icon={
            formatMessageLoading && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Message"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleFormatMesssage}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Withdrawal Step</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Withdrawal Step"
            onChange={(e) => setTransferStep(e.target.value)}
            defaultValue={userDetails.transferStep}
          />
        </div>
        <Button
          icon={
            loadingTransfer && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Withdrawal Step"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleTransferStep}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">First Billing Format</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Withdrawal Step"
            onChange={(e) => setfirstFormat(e.target.value)}
            defaultValue={userDetails.firstFormat}
          />
        </div>
        <Button
          icon={
            firstFormatLoader && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update First Billing Format"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleFirstBilling}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">First Billing Header Text</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Withdrawal Step"
            onChange={(e) => setheaderText(e.target.value)}
            defaultValue={userDetails.headerText}
          />
        </div>
        <Button
          icon={
            headerTextLoader && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"First Billing Header Text"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleFirstBillingHeaderText}
        />
        <Button
          color={"white"}
          title={wLoading ? "Loading..." : "Activate Withdrawal"}
          navigate={activateWithdrawal}
        />
        <Button
          color={"white"}
          title={
            activateDepositLoading
              ? "Loading..."
              : accessDeposit === "inactive" || accessDeposit === "hello"
              ? "Activate Deposit"
              : "Deactivate Deposit"
          }
          navigate={activateDeposit}
        />
        <Button
          color={"white"}
          title={
            symbolLoading
              ? "Loading..."
              : symbol === country?.symbol || symbol === ""
              ? "Pay $"
              : "Pay In Local Currency"
          }
          navigate={handleSymbol}
        />
        <Button
          icon={
            loadingInvestStatus && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={
            userDetails.startTrade === "false" ? "Start Trade" : "End Trade"
          }
          background={"var(--secondary-color)"}
          color={"#FFF"}
          height={45}
          navigate={handleStartTrade}
        />
      </div>
      <ToastContainer />
    </section>
  );
};

export default CreateFoodItems;
