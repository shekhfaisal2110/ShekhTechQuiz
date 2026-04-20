// components/RatingForm/RatingFormContainer.jsx
import React, { useState } from "react";
import ModalWrapper from "./ModelWrapper";
import RatingHeader from "./RatingHeader";
import StarRating from "./StarRating";
import FeedbackTextarea from "./FeedbackTextarea";
import ActionButtons from "./ActionButtons";
import NotificationToast from "../NotificationToast";

export default function RatingFormContainer({ onSubmit, onClose }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const handleRatingSubmit = async () => {
    if (rating === 0) return;
    setIsSubmittingRating(true);

    try {
      const scriptURL =import.meta.env.VITE_SCRIPT_URL;
      const url = new URL(scriptURL);
      url.searchParams.append("rating", rating);
      url.searchParams.append("feedback", feedback);
      url.searchParams.append("userAgent", navigator.userAgent);

      const response = await fetch(url.toString(), {
        method: "GET",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "success") {
        setNotification({
          show: true,
          type: "success",
          message: "🌟 Thank you! Your rating has been submitted successfully.",
        });

        setTimeout(
          () => setNotification({ show: false, type: "success", message: "" }),
          2500
        );

        if (onSubmit) onSubmit(rating, feedback);

        setTimeout(() => onClose(), 1200);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      setNotification({
        show: true,
        type: "error",
        message: "❌ Oops! Failed to submit. Please try again.",
      });
      setTimeout(
        () => setNotification({ show: false, type: "error", message: "" }),
        3000
      );
    } finally {
      setIsSubmittingRating(false);
    }
  };

  return (
    <>
      <NotificationToast notification={notification} />
      <ModalWrapper onClose={onClose}>
        <RatingHeader />
        <StarRating
          rating={rating}
          hoverRating={hoverRating}
          setRating={setRating}
          setHoverRating={setHoverRating}
        />
        <FeedbackTextarea feedback={feedback} setFeedback={setFeedback} />
        <ActionButtons
          onClose={onClose}
          onSubmit={handleRatingSubmit}
          rating={rating}
          isSubmitting={isSubmittingRating}
        />
      </ModalWrapper>
    </>
  );
}