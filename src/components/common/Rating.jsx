import React from "react";
import { number, string } from "prop-types";
import "./common.css";

const Rating = props => {
  const rate = props.rate;
  let rateRounded = 0;
  if (rate > 4.5 && rate <= 5) {
    rateRounded = 5;
  } else if (rate > 4 && rate <= 4.5) {
    rateRounded = 4.5;
  } else if (rate > 3.5 && rate <= 4) {
    rateRounded = 4;
  } else if (rate > 3 && rate <= 3.5) {
    rateRounded = 3.5;
  } else if (rate > 2.5 && rate <= 3) {
    rateRounded = 3;
  } else if (rate > 2 && rate <= 2.5) {
    rateRounded = 2.5;
  } else if (rate > 1.5 && rate <= 2) {
    rateRounded = 2;
  } else if (rate > 1 && rate <= 1.5) {
    rateRounded = 1.5;
  } else if (rate > 0.5 && rate <= 1) {
    rateRounded = 1;
  } else {
    rateRounded = 0.5;
  }
  console.log(rate)
  console.log(rateRounded)
  return (
    <div class="rating">
      <input type="radio" id="star5" name={`rating_${props.name}`} value={5} checked={rateRounded === 5} />
      <label class = "full" for="star5" ></label>

      <input type="radio" id="star4half" name={`rating_${props.name}`} value={4.5} checked={rateRounded === 4.5} />
      <label class="half" for="star4half"></label>

      <input type="radio" id="star4" name={`rating_${props.name}`} value={4} checked={rateRounded === 4} />
      <label class = "full" for="star4"></label>

      <input type="radio" id="star3half" name={`rating_${props.name}`} value={3.5} checked={rateRounded === 3.5} />
      <label class="half" for="star3half"></label>

      <input type="radio" id="star3" name={`rating_${props.name}`} value={3} checked={rateRounded === 3} />
      <label class = "full" for="star3"></label>

      <input type="radio" id="star2half" name={`rating_${props.name}`} value={2.5} checked={rateRounded === 2.5} />
      <label class="half" for="star2half"></label>

      <input type="radio" id="star2" name={`rating_${props.name}`} value={2} checked={rateRounded === 2} />
      <label class = "full" for="star2"></label>

      <input type="radio" id="star1half" name={`rating_${props.name}`} value={1} checked={rateRounded === 1.5} />
      <label class="half" for="star1half"></label>

      <input type="radio" id="star1" name={`rating_${props.name}`} value={1} checked={rateRounded === 1} />
      <label class = "full" for="star1"></label>

      <input type="radio" id="starhalf" name={`rating_${props.name}`} value={0.5} checked={rateRounded === 0.5} />
      <label class="half" for="starhalf"></label>
    </div>
  );
};

Rating.defaultProps = {
  rate: 0,
};

Rating.propTypes = {
  rate: number,
  name: string.isRequired,
};

export default Rating;
