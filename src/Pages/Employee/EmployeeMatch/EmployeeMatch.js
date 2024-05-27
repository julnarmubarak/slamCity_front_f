import React, { useEffect, useState } from "react";
import styles from "./EmployeeMatch.module.css";
import { Get, Post } from "../../../Api/Unprotected";
import { toast } from "react-toastify";

const EmployeeMatchNew = () => {
  const [leagues, setLeagues] = useState([]);
  const [teamsLeagues1, setTeamsLeagues1] = useState([]);
  const [teamsLeagues2, setTeamsLeagues2] = useState([]);
  const [match_locations, setMatchLocations] = useState([]);

  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeamLeague1, setSelectedTeamLeague1] = useState("");
  const [selectedTeamLeague2, setSelectedTeamLeague2] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedMatch_location, setSelectedMatch_location] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [finished, setFinished] = useState(false);
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");

  useEffect(() => {
    const fetchLeagues = async () => {
      const res = await Get("leagues/");
      setLeagues(res);
    };
    const getLocations = async () => {
      const res = await Get("match_location/");
      setMatchLocations(res);
    };
    getLocations();
    fetchLeagues();
  }, []);

  const getTeamsOfLeague = async (league_id) => {
    if (league_id && league_id > 0) {
      const res = await Post("teams_leagues/getTeamsOfLeague", {
        league_id: league_id,
      });
      setTeamsLeagues1(res);
      setTeamsLeagues2(res);
    } else {
      setTeamsLeagues1([]);
      setTeamsLeagues2([]);
    }
  };

  useEffect(() => {
    console.log("selectedTeamLeague1: ", selectedTeamLeague1);

    setTeamsLeagues2((e) =>
      e.filter((ele) => ele.team_league_id !== selectedTeamLeague1)
    );
  }, [selectedTeamLeague1]);

  useEffect(() => {
    console.log("setteam league2: ", selectedTeamLeague2);
    setTeamsLeagues1((e) =>
      e.filter((ele) => ele.team_league_id !== selectedTeamLeague2)
    );
  }, [selectedTeamLeague2]);

  useEffect(() => {
    if (!finished) {
      setScore1("");
      setScore2("");
    }
  }, [finished]);

  useEffect(() => {
    if (selectedLeague) {
      getTeamsOfLeague(selectedLeague);
    }
  }, [selectedLeague]);

  const saveMatch = async () => {
    if (
      !selectedLeague ||
      !selectedTeamLeague1 ||
      !selectedTeamLeague2 ||
      !date ||
      !time ||
      !selectedMatch_location ||
      !liveLink
    )
      return;
    const body = {
      league_id: selectedLeague,
      match_location_id: selectedMatch_location,
      time: time,
      team_league_id_1: selectedTeamLeague1,
      team_league_id_2: selectedTeamLeague2,
      team1_score: score1,
      team2_score: score2,
      date,
      finished,
      link: liveLink,
    };
    const res = await Post("match_details", body);

    if (res && res.id) {
      toast.success("Match submitted successfully!");
    } else {
      toast.error("There was error, please try again later!");
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        League:
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
      </label>

      <label className={styles.checkboxLabel}>
        Match is finished:
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={finished}
          onChange={() => setFinished((prev) => !prev)}
        />
      </label>

      <div className={styles.teamsContainer}>
        <label className={styles.label}>
          Team 1:
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
        </label>
        <label className={styles.label}>
          Team 2:
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
        </label>
      </div>

      {finished && (
        <div className={styles.scoresContainer}>
          <label className={styles.scoreLabel}>
            Team 1 score:
            <input
              className={styles.input}
              type="number"
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
              required
            />
          </label>
          <label className={styles.scoreLabel}>
            Team 2 score:
            <input
              className={styles.input}
              type="number"
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
              required
            />
          </label>
        </div>
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

      <button
        className={styles.button}
        onClick={saveMatch}
        disabled={
          !selectedLeague ||
          !selectedTeamLeague1 ||
          !selectedTeamLeague2 ||
          selectedTeamLeague1 == selectedTeamLeague2 ||
          !date ||
          !time ||
          !selectedMatch_location ||
          !liveLink
        }
      >
        Save
      </button>
    </div>
  );
};

export default EmployeeMatchNew;
