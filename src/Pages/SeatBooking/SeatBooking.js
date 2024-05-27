import React, { useEffect, useState } from "react";
import styles from "./SeatBooking.module.css";
import { Get, Post } from "../../Api/Protected";
import { useLocation, useNavigate } from "react-router-dom";

function SeatBooking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [match_id, setMatchId] = useState();

  const [rr, setRR] = useState();
  const [cc, setCC] = useState();
  const [pp, setPP] = useState();
  const [booked, setBooked] = useState();
  const [total_price, setTotalPrice] = useState(0);
  const [user_amount, setUserAmount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const getBookedSeatsOfMatch = async (m_id) =>
    new Promise(async (resolve, rej) => {
      const res = await Post("ticket/getBookedSeatsOfMatch", {
        match_id: m_id,
      });
      console.log("res: ", res);
      if (res && res[0] && res[0].seat_columns && res[0].seat_rows) {
        setBooked(res[0].booked_seats.split(",").map((ele) => parseInt(ele)));
        setRR(res[0].seat_rows);
        setCC(res[0].seat_columns);
        setPP(res[0].seat_price);

        resolve();
      }
    });
  const [noWallet, setNoWallet] = useState(false);
  const getUserAmount = async () =>
    new Promise(async (resolve, reject) => {
      const res = await Get("e_wallet/");
      if (res && res.length > 0) {
        setUserAmount(res[0].amount);
        setNoWallet(false);
      } else {
        setNoWallet(true);
      }
      resolve();
    });

  const loadPage = async (m_id) => {
    console.log("maaaaa: ", m_id);
    setLoading(true);
    setMatchId(m_id);
    await getBookedSeatsOfMatch(m_id);
    await getUserAmount();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (!location.state || !location.state.m_id) {
      navigate("/Leagues");
      return;
    }
    loadPage(location.state.m_id);
  }, []);

  const handleSeatClick = (seat) => {
    console.log("ss: ", seat);
    const isSelected = selectedSeats.includes(seat);
    if (!isSelected) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    }
  };
  useEffect(() => {
    if (selectedSeats && selectedSeats.length > 0) {
      setTotalPrice(selectedSeats.length * pp);
    }
  }, [selectedSeats]);

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    try {
      const res = await Post("ticket/", {
        seat_numbers: JSON.stringify(selectedSeats),
        m_id: match_id,
        total_price,
      });
      if (res.success) {
        setSelectedSeats([]);
        setSuccess("Seats successfully booked!");
        loadPage(location.state.m_id);
      } else {
        setError(res.message || "An error occurred");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={styles.imageBackground}>
      <h1>Seat Booking</h1>
      {loading ? (
        <h3> Loading...</h3>
      ) : noWallet ? (
        <h3> No wallet</h3>
      ) : (
        <>
          <div className={styles.seatGrid}>
            {Array.from(Array(rr), (q, i1) => (
              <div key={i1} className={styles.seatRow}>
                {Array.from(Array(cc), (e, i2) => {
                  const seatNumber = i1 * 10 + i2 + 1;

                  return (
                    <button
                      key={seatNumber}
                      className={`${styles.seat} ${
                        selectedSeats.includes(seatNumber)
                          ? styles.selected
                          : booked.includes(seatNumber)
                          ? styles.unavailable
                          : ""
                      }`}
                      title={`Price: ${pp} SP`}
                      onClick={
                        booked.includes(seatNumber)
                          ? () => {}
                          : () => handleSeatClick(seatNumber)
                      }
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className={styles.bookingInfo}>
            <p>
              <b> Selected Seats:</b> {selectedSeats.join(", ")}
            </p>
            <p>
              <b> Total Price:</b> {total_price} SP
            </p>
            <p>
              <b> Your money:</b> {user_amount} SP
            </p>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              selectedSeats.length == 0 ||
              user_amount < total_price
            }
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </>
      )}
    </div>
  );
}

export default SeatBooking;
