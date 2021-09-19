import { useState, useReducer } from "react";
import Section from "components/Section";
import FeedbackOptions from "components/FeedbackOptions";
import Statistics from "components/Statistics";
import Notification from "components/Notification";

const optionsText = {
  good: "Good",
  neutral: "Neutral",
  bad: "Bad",
};

function countReducer(state, actions) {
  switch (actions.type) {
    case "good":
      return { ...state, good: state.good + actions.payload };

    case "neutral":
      return { ...state, neutral: state.neutral + actions.payload };

    case "bad":
      return { ...state, bad: state.bad + actions.payload };

    default:
      return;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(countReducer, {
    good: 0,
    neutral: 0,
    bad: 0,
  });

  function handleFeedback(e) {
    dispatch({ type: e.target.name, payload: 1 });
  }

  function countTotalFeedback() {
    let total = 0;
    for (const key in state) {
      total += state[key];
    }
    return total;
  }

  function countPositiveFeedbackPercentage() {
    return Math.round((state.good / countTotalFeedback()) * 100);
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
            feedbackCount={state}
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
