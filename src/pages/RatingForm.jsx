
import React from "react";
import RatingFormContainer from "../components/RatingForm/RatingFormContainer";

export default function RatingFormPage({ onSubmit, onClose }) {
  return <RatingFormContainer onSubmit={onSubmit} onClose={onClose} />;
}