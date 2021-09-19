import PropTypes from "prop-types";
import { Button } from "./FeedbackOptions.styled";

function FeedbackOptions({ onLeaveFeedback, options }) {
  const keys = Object.keys(options);
  return (
    <div>
      {keys.map((key) => {
        return (
          <Button key={key} type="button" name={key} onClick={onLeaveFeedback}>
            {options[key]}
          </Button>
        );
      })}
    </div>
  );
}

FeedbackOptions.propTypes = {
  onLeaveFeedback: PropTypes.func,
  options: PropTypes.objectOf(PropTypes.string),
};

export default FeedbackOptions;
