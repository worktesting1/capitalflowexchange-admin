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
  const [profit, setprofit] = useState(false);
  const [firstFormat, setfirstFormat] = useState("");
  const [forthCode, setForthCode] = useState("");
  const [forthMessage, setForthMessage] = useState("");
  const [secondMLoader, setSecondMLoader] = useState(false);
  const [secondLoader, setSecondLoader] = useState(false);
  const [thirdLoader, setthirdLoader] = useState(false);
  const [thirdMLoader, setthirdMLoader] = useState(false);
  const [forthLoader, setforthLoader] = useState(false);
  const [forthMLoader, setforthMLoader] = useState(false);
  const [secondCode, setsecondCode] = useState("");
  const [secondMessage, setsecondMessage] = useState("");
  const [thirdMessage, setthirdMessage] = useState("");
  const [thirdCode, setthirdCode] = useState("");
  const [headerText, setheaderText] = useState("");
  const [firstFormatLoader, setFirstFormatLoader] = useState(false);
  const [loadingInvestStatus, setLoadingInvestStatus] = useState(false);
  const [activateDepositLoading, setactiveDLoading] = useState(false);
  const [headerTextLoader, setheaderTextLoader] = useState(false);
  const notify = () => toast.success("User Details Updated");

  const navigateBack = () => {
    navigate(`/user-details/${id}`);
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

  const handleSecondBilling = () => {
    setSecondLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { secondCode },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setSecondLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setSecondLoader(false);
      });
  };
  const handleSecondBillingMessage = () => {
    setSecondMLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { secondMessage },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setSecondMLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setSecondMLoader(false);
      });
  };
  const handleThirdBilling = () => {
    setthirdLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { thirdCode },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setthirdLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setthirdLoader(false);
      });
  };
  const handleThirdBillingMessage = () => {
    setthirdMLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { thirdMessage },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setthirdMLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setthirdMLoader(false);
      });
  };
  const handleForthBilling = () => {
    setforthLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { forthCode },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setforthLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setforthLoader(false);
      });
  };
  const handleForthBillingMessage = () => {
    setforthMLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { forthMessage },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setforthMLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setforthMLoader(false);
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
          <p className="add_food_item_form_labels">Second Code</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setsecondCode(e.target.value)}
            defaultValue={userDetails.secondCode}
          />
        </div>
        <Button
          icon={
            secondLoader && (
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
          title={"Update Code"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleSecondBilling}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Second Billing Format</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setsecondMessage(e.target.value)}
            defaultValue={userDetails.secondMessage}
          />
        </div>
        <Button
          icon={
            secondMLoader && (
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
          title={"Update Format"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleSecondBillingMessage}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Third Code</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setthirdCode(e.target.value)}
            defaultValue={userDetails.thirdCode}
          />
        </div>
        <Button
          icon={
            thirdLoader && (
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
          title={"Update Code"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleThirdBilling}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Third Billing Format</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setthirdMessage(e.target.value)}
            defaultValue={userDetails.thirdMessage}
          />
        </div>
        <Button
          icon={
            thirdMLoader && (
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
          title={"Update Format"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleThirdBillingMessage}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Forth Code</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setForthCode(e.target.value)}
            defaultValue={userDetails.forthCode}
          />
        </div>
        <Button
          icon={
            forthLoader && (
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
          title={"Update Code"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleForthBilling}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Forth Billing Format</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setForthMessage(e.target.value)}
            defaultValue={userDetails.forthMessage}
          />
        </div>
        <Button
          icon={
            forthMLoader && (
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
          title={"Update Format"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleForthBillingMessage}
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
