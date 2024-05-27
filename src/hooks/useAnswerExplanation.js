import { useState } from "react";

export default function useAnswerExplanation() {
  const [showAnswerExplanation, setShowAnswerExplanation] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [explanationContent, setExplanationContent] = useState(null);

  return {
    showAnswerExplanation,
    setShowAnswerExplanation,
    isCorrectAnswer,
    setIsCorrectAnswer,
    explanationContent,
    setExplanationContent,
  };
}
