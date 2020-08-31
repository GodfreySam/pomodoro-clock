import React from "react";

const SetTimer = (props) => {
  const id = props.title.toLowerCase();
return (
  <div className="timer-container">
    <h4 id={`${id}-label`}>{props.title} Length</h4>
    <div className="flex actions-wrapper">
      <button id={`${id}-decrement`} onClick={props.handleDecrease}>
        <i className="fa fa-minus" />
      </button>
      <span className="break_session" id={`${id}-length`}>{props.count}</span>
      <button id={`${id}-increment`} onClick={props.handleIncrease}>
        <i className="fa fa-plus" />
      </button>
    </div>
  </div>
);
} 

export default SetTimer;