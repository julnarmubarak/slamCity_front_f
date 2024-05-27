import React, { useEffect, useState } from "react";
import styles from "./EmployeeMatch.module.css";
import { Get, Post } from "../../../Api/Unprotected";
import { toast } from "react-toastify";

const EmployeeMatchNew = () => {
  const [roles, setRoles] = useState([]);
  
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  

  useEffect(() => {
    const getRoles = async () => {
      const res = await Get("role/");
      setRoles(res);
    };

    getRoles();
  }, []);

  const saveUser = async () => {
    let uri = "";
    uri = "user/createEmployee"
    // const body = {
    //     r_id: role,
    //     password,
    //     F_name,
    //     L_name,
    //     email,
    //     gender,
    //     age,

    // }



    // if (
    //   !selectedLeague ||
    //   !selectedTeamLeague1 ||
    //   !selectedTeamLeague2 ||
    //   !date ||
    //   !time ||
    //   !selectedMatch_location ||
    //   !liveLink
    // )
    //   return;
    // const body = {
    //   league_id: selectedLeague,
    //   match_location_id: selectedMatch_location,
    //   time: time,
    //   team_league_id_1: selectedTeamLeague1,
    //   team_league_id_2: selectedTeamLeague2,
    //   team1_score: score1,
    //   team2_score: score2,
    //   date,
    //   finished,
    //   link: liveLink,
    // };
    // const res = await Post("match_details", body);

    // console.log("res: ", res);
    // if (res && res.id) {
    //   toast.success("Match submitted successfully!");
    // } else {
    //   toast.error("There was error, please try again later!");
    // }
    // console.log(res);
  };

  return (
    <div className={styles.div}>
      {/* <div className={styles.container}>
        <select
          className={styles.select}
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
        >
          <option value="">Select League</option>
          {leagues.map((league) => (
            <option key={league.league_id} value={league.league_id}>
              {league.name}
            </option>
          ))}
        </select>

        {teamsLeagues1 && teamsLeagues2 ? (
          <>
            <select
              className={styles.select}
              value={selectedTeamLeague1}
              onChange={(e) => setSelectedTeamLeague1(e.target.value)}
            >
              <option value="">Select Team 1</option>
              {teamsLeagues1.map((teamLeague) => (
                <option
                  key={teamLeague.team_league_id}
                  value={teamLeague.team_league_id}
                >
                  {teamLeague.name}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={selectedTeamLeague2}
              onChange={(e) => setSelectedTeamLeague2(e.target.value)}
            >
              <option value="">Select Team 2</option>
              {teamsLeagues2.map((teamLeague) => (
                <option
                  key={teamLeague.team_league_id}
                  value={teamLeague.team_league_id}
                >
                  {teamLeague.name}
                </option>
              ))}
            </select>
          </>
        ) : (
          ""
        )}
        <label className={styles.label}>
          Date:
          <input
            className={styles.input}
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Time:
          <input
            className={styles.input}
            type="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Location:
          <select
            className={styles.select}
            value={selectedMatch_location}
            onChange={(e) => setSelectedMatch_location(e.target.value)}
            name="location"
          >
            <option value="">Select Location</option>
            {match_locations.map((ele) => (
              <option key={ele.match_location_id} value={ele.match_location_id}>
                {ele.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Live Link:
          <input
            className={styles.input}
            type="url"
            name="liveLink"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Match is finished:
          <input
            className={styles.input}
            type="checkbox"
            checked={finished}
            onChange={() => setFinished((la) => !la)}
            required
          />
        </label>

        {finished ? (
          <div className={styles.scores}>
            <div className={styles.score}>
              <label className={styles.label}>
                Team 1 score :
                <input
                  className={styles.input}
                  type="number"
                  value={score1}
                  onChange={(e) => setScore1(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className={styles.score}>
              <label className={styles.label}>
                Team 2 score :
                <input
                  className={styles.input}
                  type="number"
                  value={score2}
                  onChange={(e) => setScore2(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
        ) : (
          ""
        )}

        <button
          className={styles.button}
          onClick={saveMatch}
          disabled={
            !selectedLeague ||
            !selectedTeamLeague1 ||
            !selectedTeamLeague2 ||
            !date ||
            !time ||
            !selectedMatch_location ||
            !liveLink
          }
        >
          Save
        </button>
      </div> */}
    </div>
  );
};

export default EmployeeMatchNew;
