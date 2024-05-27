import React, { useEffect, useState } from "react";
import styles from "./CustomerBooking.module.css";
import { Post } from "../../Api/Protected";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CustomerBooking() {
  const [bookings, setBookings] = useState([]);

  const convertDate = (dt) => {
    const date = new Date(dt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const getTickets = async () => {
    const result = await Post("ticket/getBookedSeatsOfUser");
    if (!result || !result.length) return;
    console.log("result: ", result);
    setBookings(result);
  };
  useEffect(() => {
    getTickets();
  }, []);

  const deletTicket = async (ticket_id) => {
    try {
      const d = await Post("ticket/delete", { t_id: ticket_id });
      if (d && d.success) {
        toast.success("Deleted successfully");
        getTickets();
      } else {
        toast.error("Something wrong,try again later!");
      }
    } catch (ex) {
      toast.error("Something wrong,try again later!");
    }
  };

  return (
    <div className={styles.body}>
      <section className={styles.section}>
        <div className={styles.container}>
          <h1>Bookings: </h1>
          <table>
            <thead>
              <th> City name</th>
              <th> Stadium name</th>
              <th> Seat price</th>
              <th> League name</th>
              <th>Date </th>
              <th>Time </th>
              <th> Team 1 </th>
              <th> Team 2 </th>
              <th>Seat number </th>
              <th> Finished </th>
              <th> Delete </th>
            </thead>
            <tbody>
              {bookings.map((ele) => (
                <tr>
                  <td> {ele.city_name} </td>
                  <td> {ele.stadium_name} </td>
                  <td> {ele.seat_price}</td>
                  <td> {ele.league_name} </td>
                  <td> {convertDate(ele.date)}</td>
                  <td> {ele.time}</td>
                  <td> {ele.team_1_name} </td>
                  <td> {ele.team_2_name} </td>
                  <td> {ele.seat_number} </td>
                  <td> {ele.finished} </td>
                  <td>
                    {ele.finished ? (
                      "Finished"
                    ) : (
                      <FaTimes
                        onClick={() => deletTicket(ele.t_id)}
                        className={styles.delete}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
