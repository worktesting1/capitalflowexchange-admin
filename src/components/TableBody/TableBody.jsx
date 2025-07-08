import React, { useState } from "react";
import "./TableBody.css";
import Button from "../Button/Button";
import Delete from "../../asset/delete.svg";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { ColorRing } from "react-loader-spinner";
import { useGlobalContext } from "../../context/context";
import { toast } from "react-toastify";
import axios from "axios";

const TableBody = ({
  path,
  order,
  toggleNotification,
  tableData,
  toggleDepositStatus,
  loading,
  symbol,
  toggleWithdrawalStatus,
}) => {
  const [status, setStatus] = useState(true);
  const [kycLoader, setKycLoader] = useState(false);
  const { baseUrl, getUserKYC, userKyc } = useGlobalContext();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  const updateKYC = (id, userId, email) => {
    if (!userKyc?.status) {
      setKycLoader(true);
      axios
        .put(
          `${baseUrl}kyc/${id}`,
          {
            status: true,
            email: email,
          },
          { headers: { token: adminToken } }
        )
        .then((data) => {
          if (data.status === 200) {
            setKycLoader(false);
            getUserKYC(adminToken, userId);
            toast.success("User KYC Status Updated");
          }
        })
        .catch((error) => {
          setKycLoader(false);
        });
    }
  };
  const navigate = useNavigate();
  return (
    <>
      {order === "Order" ? (
        <section className="table_body">
          <div className="table_body_header">
            {[
              "Profit",
              "Bonus",
              "Customer",
              "created on",
              "Gender",
              "Pending Withdrawal",
              "Successful Deposit",
              "Pending Deposits",
            ].map((item, index) => (
              <div
                className={`table_body_header_item_${1 + index}`}
                key={index}
              >
                <p className="table_body_header_text">{item}</p>
              </div>
            ))}
          </div>
          <>
            {loading ? (
              <div className="list_loader">
                <ColorRing
                  visible={true}
                  height="60"
                  width="60"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["black", "black", "black", "black", "black"]}
                />
              </div>
            ) : (
              tableData?.map((item, index) => {
                const {
                  profit,
                  firstName,
                  lastName,
                  bonus,
                  created_At,
                  gender,
                  deposits,
                  pendingDeposits,
                  pendingWithdrawals,
                  _id,
                } = item;
                return (
                  <Link
                    to={`/${path}/${_id}`}
                    key={index}
                    className="table_body_body"
                  >
                    <div className={`table_body_header_item_1`}>
                      <p className="food_item_paragraphs">
                        {symbol}
                        {profit}
                      </p>
                    </div>
                    <div className={`table_body_header_item_2`}>
                      <p className="food_item_paragraphs">
                        {symbol}
                        {bonus}
                      </p>
                    </div>
                    <div className={`table_body_header_item_3`}>
                      <p className="food_item_paragraphs">
                        {firstName} {lastName}
                      </p>
                    </div>
                    <div className={`table_body_header_item_4`}>
                      <p className="food_item_paragraphs">
                        {moment(item.createdAt).format("MMMM Do YYYY, h:mm")}
                      </p>
                    </div>
                    <div className={`table_body_header_item_5`}>
                      <p className="food_item_paragraphs">{gender}</p>
                    </div>
                    <div className={`table_body_header_item_6`}>
                      <p className="food_item_paragraphs">
                        {symbol}
                        {0}
                      </p>
                    </div>
                    <div className={`table_body_header_item_7`}>
                      <p className="food_item_paragraphs">
                        {symbol}
                        {deposits}
                      </p>
                    </div>
                    <div className={`table_body_header_item_8`}>
                      <p className="food_item_paragraphs">
                        {symbol}
                        {pendingDeposits}
                      </p>
                    </div>
                  </Link>
                );
              })
            )}
          </>
        </section>
      ) : order === "Orderdetails" ? (
        <section className="table_body">
          <div className="table_body_header">
            {[
              "S/n",
              "item",
              "Description",
              "price",
              "quantity",
              "prepare time",
              "Total amount",
            ].map((item, index) => (
              <div
                className={`table_body_header_item_${1 + index}`}
                key={index}
              >
                <p className="table_body_header_text">{item}</p>
              </div>
            ))}
          </div>
          <>
            {[1].map((_, index) => (
              <Link
                to={`/${path}/${index + 1}`}
                key={index}
                className="table_body_body"
              >
                <div className={`table_body_header_item_1`}>
                  <p className="food_item_paragraphs">1</p>
                </div>
                <div className={`table_body_header_item_2`}>
                  <p className="food_item_paragraphs">Egusi soup with beef</p>
                </div>
                <div className={`table_body_header_item_3`}>
                  <p className="food_item_paragraphs">
                    Special rice and stew for family
                  </p>
                </div>
                <div className={`table_body_header_item_4`}>
                  <p className="food_item_paragraphs">2000</p>
                </div>
                <div className={`table_body_header_item_5`}>
                  <p className="food_item_paragraphs">10</p>
                </div>
                <div className={`table_body_header_item_6`}>
                  <p className="food_item_paragraphs">Soup</p>
                </div>
                <div className={`table_body_header_item_7`}>
                  <p className="food_item_paragraphs">8</p>
                </div>
              </Link>
            ))}
          </>
        </section>
      ) : order === "Customers" ? (
        <section className="table_body">
          <div className="table_body_header">
            {[
              "S/n",
              "id",
              "User",
              "created on",
              "Phone No",
              "email",
              "Country",
              "status",
              "action",
            ].map((item, index) => (
              <div
                key={index}
                className={`table_body_header_item_${1 + index}`}
              >
                <p className="table_body_header_text">{item}</p>
              </div>
            ))}
          </div>
          <>
            {loading ? (
              <div className="list_loader">
                <ColorRing
                  visible={true}
                  height="60"
                  width="60"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["black", "black", "black", "black", "black"]}
                />
              </div>
            ) : (
              tableData?.map((item, index) => {
                const {
                  firstName,
                  lastName,
                  created_At,
                  phone,
                  _id,
                  email,
                  country,
                } = item;
                return (
                  <div key={index} className="table_body_body">
                    <div className={`table_body_header_item_1`}>
                      <p className="food_item_paragraphs">{index + 1}</p>
                    </div>
                    <Link
                      to={`/${path}/${_id}`}
                      className={`table_body_header_item_2`}
                    >
                      <p className="paginators_numbers">{_id.slice(0, 8)}</p>
                    </Link>
                    <div className={`table_body_header_item_3`}>
                      <p className="food_item_paragraphs">{`${firstName} ${lastName}`}</p>
                    </div>
                    <div className={`table_body_header_item_4`}>
                      <p className="food_item_paragraphs">
                        {moment(item.createdAt).format("MMMM Do YYYY, h:mm")}
                      </p>
                    </div>
                    <div className={`table_body_header_item_5`}>
                      <p className="food_item_paragraphs">{phone}</p>
                    </div>
                    <div className={`table_body_header_item_6`}>
                      <p className="food_item_paragraphs">{email}</p>
                    </div>
                    <div className={`table_body_header_item_7`}>
                      <p className="food_item_paragraphs">{country?.name}</p>
                    </div>
                    <div className={`table_body_header_item_8`}>
                      <Button
                        background={status ? "#EDFFF9" : "#FFF3E7"}
                        title={status ? "Active" : "Inactive"}
                        color={status ? "#27AE61" : "var(--other-color)"}
                        width={83}
                        height={30}
                      />
                    </div>
                    <div className={`table_body_header_item_9`}>
                      <img
                        onClick={() => toggleNotification(_id)}
                        src={Delete}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })
            )}
          </>
        </section>
      ) : order === "customers_favorite_details" ? (
        <div className="orders">
          <section className="table_body">
            <div className="table_body_header">
              {[
                "S/n",
                "type",
                "amount",
                "created on",
                "Proof",
                "Updated At",
                "Reference",
                "status",
              ].map((item, index) => (
                <div
                  key={index}
                  className={`table_body_header_item_${1 + index}`}
                >
                  <p className="table_body_header_text">{item}</p>
                </div>
              ))}
            </div>
            <>
              {loading ? (
                <div className="list_loader">
                  <ColorRing
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={["black", "black", "black", "black", "black"]}
                  />
                </div>
              ) : (
                tableData.map((item, index) => {
                  const {
                    updatedAt,
                    createdAt,
                    amount,
                    transactionType,
                    image,
                    status,
                    _id,
                    userId,
                    referenceNumber,
                    currency,
                  } = item;
                  return (
                    <div key={index} className="table_body_body">
                      <div className={`table_body_header_item_1`}>
                        <p className="food_item_paragraphs">{index + 1}</p>
                      </div>
                      <div className={`table_body_header_item_2`}>
                        <p className="paginators_numbers">{transactionType}</p>
                      </div>
                      <div className={`table_body_header_item_3`}>
                        <p className="food_item_paragraphs">
                          {amount} {currency}
                        </p>
                      </div>
                      <div className={`table_body_header_item_4`}>
                        <p className="food_item_paragraphs">
                          {moment(createdAt).format("MMMM Do YYYY, h:mm")}
                        </p>
                      </div>
                      <div className={`table_body_header_item_5`}>
                        {!image ? (
                          <p className="food_item_paragraphs">Image Deleted</p>
                        ) : (
                          <img src={image[0]} className="proof" alt="" />
                        )}
                      </div>
                      <div className={`table_body_header_item_6`}>
                        <p className="food_item_paragraphs">
                          {moment(updatedAt).format("MMMM Do YYYY, h:mm")}
                        </p>
                      </div>
                      <div className={`table_body_header_item_7`}>
                        <p className="food_item_paragraphs">
                          {referenceNumber}
                        </p>
                      </div>
                      <div className={`table_body_header_item_8`}>
                        <Button
                          background={
                            status === "approved"
                              ? "#EDFFF9"
                              : status === "pending"
                              ? "#FFF3E7"
                              : ""
                          }
                          title={
                            status === "pending"
                              ? "Pending"
                              : status === "rejected"
                              ? "Failed"
                              : "Successful"
                          }
                          color={
                            status === "approved"
                              ? "var(--secondary-color)"
                              : "var(--color1)"
                          }
                          width={83}
                          height={30}
                          navigate={() => toggleDepositStatus(_id, userId)}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </>
          </section>
        </div>
      ) : order === "customers_order_details" ? (
        <div className="orders">
          <section className="table_body">
            <div className="table_body_header">
              {[
                "S/n",
                "id",
                "Type",
                "created on",
                "Account Number",
                "amount",
                "Account Name",
                "status",
              ].map((item, index) => (
                <div
                  className={`table_body_header_item_${1 + index}`}
                  key={index}
                >
                  <p className="table_body_header_text">{item}</p>
                </div>
              ))}
            </div>
            <>
              {tableData.map((transfer, index) => (
                <div key={index} className="table_body_body">
                  <div className={`table_body_header_item_1`}>
                    <p className="food_item_paragraphs">{index + 1}</p>
                  </div>
                  <div className={`table_body_header_item_2`}>
                    <p className="paginators_numbers">
                      {transfer?._id.slice(0, 9)}
                    </p>
                  </div>
                  <div className={`table_body_header_item_3`}>
                    <p className="food_item_paragraphs">
                      {transfer.accountType}
                    </p>
                  </div>
                  <div className={`table_body_header_item_4`}>
                    <p className="food_item_paragraphs">
                      {moment(transfer?.createdAt).format("MMMM Do YYYY, h:mm")}
                    </p>
                  </div>
                  <div className={`table_body_header_item_5`}>
                    <p className="food_item_paragraphs">
                      {transfer.accountNumber}
                    </p>
                  </div>
                  <div className={`table_body_header_item_6`}>
                    <p className="food_item_paragraphs">
                      {symbol}
                      {transfer.amount}
                    </p>
                  </div>
                  <div className={`table_body_header_item_7`}>
                    <p className="food_item_paragraphs">
                      {transfer.accountName}
                    </p>
                  </div>
                  <div className={`table_body_header_item_8`}>
                    <Button
                      background={
                        transfer.status === "approved"
                          ? "#EDFFF9"
                          : transfer.status === "reject"
                          ? "#FFF3E7"
                          : ""
                      }
                      title={
                        transfer.status === "approved"
                          ? "Approved"
                          : transfer.status === "pending"
                          ? "Active"
                          : "Reject"
                      }
                      color={
                        transfer.status === "pending" ||
                        transfer.status === "approved"
                          ? "var(--secondary-color)"
                          : "var(--other-color)"
                      }
                      width={83}
                      height={30}
                      navigate={() =>
                        toggleWithdrawalStatus(transfer?._id, transfer?.userId)
                      }
                    />
                  </div>
                </div>
              ))}
            </>
          </section>
        </div>
      ) : (
        <section className="table_body">
          <div className="table_body_header kyc_table_body_header">
            {["Name", "Number", "Id Front", "Id Back", "action"].map(
              (item, index) => (
                <div
                  key={index}
                  className={`table_body_header_item_${1 + index}`}
                >
                  <p className="table_body_header_text">{item}</p>
                </div>
              )
            )}
          </div>
          <>
            {loading ? (
              <div className="list_loader">
                <ColorRing
                  visible={true}
                  height="60"
                  width="60"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["black", "black", "black", "black", "black"]}
                />
              </div>
            ) : (
              tableData && (
                <div className="table_body_body kyc_table_body_body">
                  <div className={`table_body_header_item_1`}>
                    <p className="food_item_paragraphs">{tableData?.idname}</p>
                  </div>
                  <div className={`table_body_header_item_2`}>
                    <p className="paginators_numbers">{tableData?.idnumber}</p>
                  </div>
                  <div className={`table_body_header_item_3`}>
                    <img
                      src={tableData?.front && tableData?.front[0]?.url}
                      className="proof"
                      alt=""
                    />
                  </div>
                  <div className={`table_body_header_item_4`}>
                    <img
                      src={tableData?.back && tableData?.back[0]?.url}
                      className="proof"
                      alt=""
                    />
                  </div>
                  <div className={`table_body_header_item_5`}>
                    <button
                      onClick={() =>
                        updateKYC(
                          tableData._id,
                          tableData.userId,
                          tableData.email
                        )
                      }
                      className="update_wallet_btn btn"
                    >
                      {kycLoader
                        ? "loading..."
                        : !tableData.status
                        ? "Unapproved"
                        : "Approved"}
                    </button>
                  </div>
                </div>
              )
            )}
          </>
        </section>
      )}
    </>
  );
};

export default TableBody;
