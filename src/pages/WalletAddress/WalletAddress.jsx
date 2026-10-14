import React, { useCallback, useEffect, useState } from "react";
import "./WalletAddress.css";
import { Button, DashHead } from "../../components";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import axios from "axios";
import { useGlobalContext } from "../../context/context";

const WalletAddress = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useGlobalContext();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  const getAllWalletAddresses = useCallback(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}copy-trade/investors/6877d4706822e0a0e0a84476`, {
        headers: { token: adminToken },
      })
      .then((data) => {
        console.log(data);

        if (data.status === 200) {
          setInvestors(data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [adminToken, baseUrl]);

  useEffect(() => {
    getAllWalletAddresses();
  }, [getAllWalletAddresses]);

  return (
    <section className="wallet_address">
      <DashHead
        title={"All Investors Copying Trade"}
        paragraph={"See all wallet addresses Here"}
      />
      <div className="food_item_table">
        <div className="food_item_table_header">
          <h4>All Investors</h4>
          <div>
            <p className="paginators_numbers">1-10</p>
            <p className="paginators_length">of 20</p>
            <Button
              fontsize={20}
              color={"var(--color5)"}
              height={35}
              width={35}
              background={"#fff"}
              icon={<RxCaretLeft />}
              border={"1px solid var(--color2)"}
            />
            <Button
              fontsize={20}
              color={"#fff"}
              height={35}
              width={35}
              background={"var(--secondary-color)"}
              icon={<RxCaretRight />}
            />
          </div>
        </div>
        <div className="investor-list">
          <h2>Investors Copying You</h2>
          {loading ? (
            <p>Loading investors…</p>
          ) : investors.length === 0 ? (
            <p>No investors are copying you yet.</p>
          ) : (
            <ul>
              {investors.map((inv) => (
                <li key={inv._id}>
                  <span className="inv-id">Name:</span> {inv.name} <br />
                  <span className="inv-amount">Invested:</span> $
                  {inv.investedAmount.toFixed(2)} <br />
                  <span className="inv-profit">Email:</span> {inv.email}
                  {/* <span className="inv-profit">Total Profit:</span> $
                  {inv.totalProfit.toFixed(2)} */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default WalletAddress;
