import { useState } from "react";
import Section from "components/Section";
import FeedbackOptions from "components/FeedbackOptions";
import Statistics from "components/Statistics";
import Notification from "components/Notification";

const optionsText = {
  good: "Good",
  neutral: "Neutral",
  bad: "Bad",
};

export default function App() {
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  const feedbackCount = {
    good: goodCount,
    neutral: neutralCount,
    bad: badCount,
  };

  function handleFeedback(e) {
    switch (e.target.name) {
      case "good":
        setGoodCount((prev) => prev + 1);
        break;

      case "neutral":
        setNeutralCount((prev) => prev + 1);
        break;

      case "bad":
        setBadCount((prev) => prev + 1);
        break;

      default:
        return;
    }
  }

  function countTotalFeedback() {
    let total = 0;
    for (const key in feedbackCount) {
      total += feedbackCount[key];
    }
    return total;
  }

  function countPositiveFeedbackPercentage() {
    return Math.round((goodCount / countTotalFeedback()) * 100);
  }
  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={handleFeedback}
          options={optionsText}
        />
      </Section>
      {countTotalFeedback() ? (
        <Section title="Statistics">
          <Statistics
            options={optionsText}
            feedbackCount={feedbackCount}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Notification message={"No feedback given"} />
      )}
    </div>
  );
}
