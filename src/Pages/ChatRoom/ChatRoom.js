import React, { useEffect, useState } from "react";
import styles from "./ChatRoom.module.css";
import { Get, Post } from "../../Api/Protected";
import { toast } from "react-toastify";

const ChatRoom = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const fetchComments = async () => {
    try {
      const res = await Get("comments/");
      setComments(res);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const getRatings = async () => {
    try {
      const res = await Get("rating/");
      if (res && res.length > 0 && res[0].rate_value) setRating(res[0].rate_value);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
    getRatings();
  }, []);

  const addComment = async () => {
    try {
      const res = await Post("comments/", { comment: newComment });
      if (res && res.id) {
        toast.success("Comment added successfully!");
        setNewComment("");
        fetchComments();
      } else {
        toast.error("There was an error, please try again later!");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const rateApp = async () => {
    try {
      const res = await Post("rating/", { rate_value: rating });
      if (res && res.id) {
        toast.success("Your rating has been submitted successfully!");
      } else {
        toast.error("There was an error, please try again later!");
      }
    } catch (error) {
      console.error("Error rating the app:", error);
    }
  };

  return (
    <div className={styles.chatRoom}>
      <h2 className={styles.h2}>Chat Room</h2>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Add a Comment</h3>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button
            className={styles.button}
            type="button"
            onClick={addComment}
            disabled={newComment === ""}
          >
            Add Comment
          </button>
        </form>
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Comments</h3>
        <div className={styles.comments}>
          {comments.map((comment) => (
            <div key={comment.c_id} className={styles.comment}>
              <label className={styles.commentLabel}>
                {comment.F_name} {comment.L_name}
              </label>
              <p className={styles.commentP}>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Rate the App</h3>
        <div className={styles.rating}>
          <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              onClick={() => setRating(i + 1)}
              className={i < rating ? styles.filledStar : styles.emptyStar}
            >
              ★
            </button>
          ))}
          </div>
          <button
            onClick={rateApp}
            disabled={rating === 0}
            className={styles.submitButton}
          >
            Rate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
