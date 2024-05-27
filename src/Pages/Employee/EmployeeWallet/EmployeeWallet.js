import React, { useEffect, useState } from "react";
import styles from "./EmployeeWallet.module.css";
import { Get, Post } from "../../../Api/Protected";
import { toast } from "react-toastify";

const EmployeeWallet = () => {
  const [customers, setCustomers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [ew_id, setEw_id] = useState();

  const getCustomers = async () => {
    const cus = await Get("user/getCustomersHaveWallet");
    console.log("cus: ", cus);
    setCustomers(cus);
  };
  const customerSelect = (e) => {
    setEw_id(e.target.value);
    console.log("customers: ", customers);
    console.log("e.target.value: ", e.target.value);

    const cc = customers.find((ele) => ele.ew_id == e.target.value);
    setAmount(cc.amount);
  };

  const updateWalletAmount = async () => {
    try {
      const body = { ew_id, amount };
      const res = await Post("e_wallet/updateAmount", body);
      if (res && res.sucess) {
        toast.success(res.message);
      } else {
        toast.error("There was error, please try again later!");
      }
    } catch (ex) {
      toast.error("There was error, please try again later!");
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className={styles.container}>
      <h2> Customer wallet</h2>
      <select value={ew_id} onChange={customerSelect}>
        <option value="">Select a customer </option>
        {customers.map((ele) => (
          <option value={ele.ew_id}> {ele.full_name}</option>
        ))}
      </select>
      {ew_id ? (
        <>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={updateWalletAmount} disabled={!ew_id}>
            Update amount{" "}
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default EmployeeWallet;
