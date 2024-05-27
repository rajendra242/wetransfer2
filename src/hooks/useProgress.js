import { useEffect, useState } from "react";

const getProgress = (questions, answers) => {
  let progress = {};
  let score = 0;

  // go through questions
  questions.forEach((question, index) => {
    // if there's an answer
    if (answers && answers[index]) {
      const isMultipleChoice = () => {
        let nr = 0;

        // check if there's more than one right answer
        questions[index].answers.forEach((element) => {
          if (element.isRight) {
            nr += 1;
          }
        });

        return nr > 1;
      };
      const isRightAnswer = () => {
        // get submitted answers
        const submittedAnswer = answers[index];
        const possibleAnswers = questions[index].answers;

        // If simple radio buttons, check if the answer is right
        if (!isMultipleChoice()) {
          return Boolean(possibleAnswers[submittedAnswer].isRight);
        }

        // if checkboxes get all right answers
        let rightAnswers = [];
        possibleAnswers.forEach((elem, index) => {
          if (elem.isRight) {
            rightAnswers.push(index.toString());
          }
        });

        // if user has the same amount of answers as the right answers
        if (rightAnswers.length === submittedAnswer.length) {
          // go through the submitted answers and filter them from possible answers
          submittedAnswer.forEach((elem) => {
            rightAnswers = rightAnswers.filter((right) => {
              return right !== elem;
            });
          });

          // if user got all right answers return true
          return rightAnswers.length === 0;
        }

        return false;
      };
     
      if (isRightAnswer()) {
        progress[index] = "right";
        score += 1;
      } else {
        progress[index] = "wrong";
      }
    } else {
      progress[index] = null;
    }
  });

  return { progress, score };
};

export default function useProgress(answers = [], questions = []) {
  // get initial score and progress
  const { progress: initialProgress, score: initialScore } = getProgress(
    questions,
    answers
  );

  const [progress, setProgress] = useState(initialProgress);
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    // on answers and questions change recalculate score and progress
    const { progress, score } = getProgress(questions, answers);

    setScore(score);
    setProgress(progress);
  }, [setScore, setProgress, answers, questions]);

  return { score, progress, max: Object.keys(progress).length };
}
