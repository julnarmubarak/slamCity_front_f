import React, { useState, useEffect } from "react";
import styles from "./Poll.module.css";
import { Post, Get } from "../../Api/Protected";
import { toast } from "react-toastify";

const Poll = () => {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await Get("candidate/");
        setCandidates(res);
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = (candidateName) => {
    setSelectedPlayer(candidateName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setSuccess("")
    if (!selectedPlayer) {
      alert("Please select an MVP before submitting.");
      return;
    }
    
    try {
      const res = await Post("voting/", { p_id: selectedPlayer });
      if (res && res.id) {
        toast.success("Your vote has been submitted successfully!");
        setSuccess("Your vote has been submitted successfully!");
      } else {
        if (res && res.response && res.response.data.message) {
          toast.error(res.response.data.message);
          setError(res.response.data.message);
        } else {
          throw error;
        }
      }
    } catch (error) {
      toast.error(error.response || "There was an error, please try again later!");
      setError(error.response || "Failed to submit your vote. Please try again.");
    }
  };

  return (
    <div className={styles.imageBackground}>
      <div className={styles.poll}>
        <h2 className={styles.h2}>Who is the MVP?</h2>
        <form onSubmit={handleSubmit}>
          {candidates.length > 0 ? (
            <select
              className={styles.select}
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            >
              <option value="">Please select a player</option>
              {candidates.map((candidate, idx) => (
                <option key={idx} value={candidate.player_id}>
                  {candidate.player_name}
                </option>
              ))}
            </select>
          ) : (
            <p>Loading candidates...</p>
          )}
          <button type="submit" className={styles.button} disabled={!selectedPlayer}>
            Submit
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </div>
    </div>
  );
};

export default Poll;
