import React, { useEffect, useState } from "react";
import styles from "./Matches.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Post } from "../../Api/Unprotected";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const convertDate = (dt) => {
    const date = new Date(dt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  useEffect(() => {
    if (!location.state || !location.state.team_league_id) {
      navigate("/Leagues");
      return;
    }
    localStorage.setItem("team_league_id", location.state.team_league_id);

    const ff = async () => {
      const result = await Post("teams/GetMatchesOfTeam", {
        team_league_id: location.state.team_league_id,
      });
      if (!result || !result.length) return;
      console.log("result: ", result);
      setMatches(result);
    };
    ff();
  }, []);
  const openLink = (link) => {
    navigate(link);
  };

  const goToStatistics = (m_id) => {
    console.log("m_id: " , m_id)
    const data = { m_id };
    navigate("/Statistics", { state: data });
  };
  const openBooking = (m_id) => {
    const data = { m_id };
    navigate("/SeatBooking", { state: data });

  }
  return (
    <div className={styles.body}>
      <section className={styles.section}>
        <div className={styles.container}>
          <h1>Club Matches</h1>
          <h2> Not played</h2>
          <div className={styles.cards}>
            {matches
              .filter((ele) => ele.finished == 0)
              .map((card, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.teamContainer}>
                    <img
                      src={card.t1_photo}
                      alt={card.t1_name}
                      className={styles.image}
                    />
                    <div className={styles.vsContainer}>
                      <div className={styles.teamNames}>
                        <span>{card.t1_name}</span> X{" "}
                        <span>{card.t2_name}</span>
                      </div>
                      <p>
                        {convertDate(card.date)} - {card.time}
                      </p>
                      <div className={styles.buttonContainer}>
                        <button
                          onClick={() => openLink(card.link)}
                          className={styles.btn}
                        >
                          Watch
                        </button>
                        <button
                          onClick={() => openBooking(card.match_id)}
                          className={styles.btn}
                        >
                          Book
                        </button>
                        
                      </div>
                    </div>
                    <img
                      src={card.t2_photo}
                      alt={card.t2_name}
                      className={styles.image}
                    />
                  </div>
                </div>
              ))}
          </div>
          <h2> Finished</h2>
          <div className={styles.cards}>
            {matches
              .filter((ele) => ele.finished == 1)
              .map((card, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.teamContainer}>
                    <img
                      src={card.t1_photo}
                      alt={card.t1_name}
                      className={styles.image}
                    />
                    <div className={styles.vsContainer}>
                      <div className={styles.teamNames}>
                        <span>{card.t1_name}</span> X{" "}
                        <span>{card.t2_name}</span>
                      </div>
                      <h3>
                        {card.team1_score} X {card.team2_score}{" "}
                      </h3>
                      <p>
                        {convertDate(card.date)} - {card.time}
                      </p>
                    </div>
                    <img
                      src={card.t2_photo}
                      alt={card.t2_name}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={() => goToStatistics(card.match_id)}
                      className={styles.btn}
                    >
                      Match's Statistics
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
