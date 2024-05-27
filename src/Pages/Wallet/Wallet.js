import React, { useEffect, useState } from "react";
import styles from "./Wallet.module.css";
import { Get, Post } from "../../Api/Protected";

const Wallet = () => {
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [preWallet, setPreWallet] = useState();

  const handleSubmit = async (e) => {
    try {
      const res = await Post("e_wallet/", { pin, address });
      if (res.success) {
        setPin("");
        setAddress("");
        setSuccess("Wallet submission successful");
        getPrevWallet();
      } else {
        setError(res.message || "An error occurred");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };
  const getPrevWallet = async () => {
    const res = await Get("e_wallet/");
    console.log("res: ", res);
    if (res && res.length > 0) {
      setPreWallet(res[0]);
    }
  };

  useEffect(() => {
    getPrevWallet();
  }, []);

  return (
    <div className={styles.ImageBackground}>
      <div className={styles.walletForm}>
        <h2 className={styles.walletFormH2}>Wallet Information</h2>

        {preWallet ? (
          <div>
            <p>
              You have already created a wallet with the address:{" "}
              {preWallet.address}
            </p>
            <p> You have now {preWallet.amount ? preWallet.amount : "0" } SP</p>
          </div>
        ) : (
          <form>
            <label className={styles.walletFormLabel} htmlFor="pin">
              PIN:
            </label>
            <input
              className={styles.walletFormInput}
              type="password"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
            <br />
            <label className={styles.walletFormLabel} htmlFor="address">
              Address:
            </label>
            <input
              className={styles.walletFormInput}
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <br />
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <button
              className={styles.walletFormButton}
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Wallet;
