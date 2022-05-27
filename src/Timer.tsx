import { Component } from "react";
import { useEffect } from "react";
const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 45,
};

class Timer extends Component {
  state = initialState;

  componentWillUnmount() {
    this.clearTimerInterval();
  }

  // @ts-ignore
  clearTimerInterval = () => clearInterval(this.intervalId);

  onDecreaseTimerLimitInMinutes = () => {
    const { timerLimitInMinutes } = this.state;

    if (timerLimitInMinutes > 1) {
      this.setState((prevState) => ({
        // @ts-ignore
        timerLimitInMinutes: prevState.timerLimitInMinutes - 5,
      }));
    }
  };

  onIncreaseTimerLimitInMinutes = () =>
    this.setState((prevState) => ({
      // @ts-ignore
      timerLimitInMinutes: prevState.timerLimitInMinutes + 5,
    }));

  renderTimerLimitController = () => {
    const { timerLimitInMinutes, timeElapsedInSeconds } = this.state;
    const isButtonsDisabled = timeElapsedInSeconds > 0;
  };

  onResetTimer = () => {
    this.clearTimerInterval();
    this.setState(initialState);
  };

  incrementTimeElapsedInSeconds = () => {
    const { timerLimitInMinutes, timeElapsedInSeconds } = this.state;
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;

    if (isTimerCompleted) {
      this.clearTimerInterval();
      this.setState({ isTimerRunning: false });
    } else {
      this.setState((prevState) => ({
        // @ts-ignore
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }));
    }
  };

  onStartOrPauseTimer = () => {
    const { isTimerRunning, timeElapsedInSeconds, timerLimitInMinutes } =
      this.state;
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;

    if (isTimerCompleted) {
      this.setState({ timeElapsedInSeconds: 0 });
    }
    if (isTimerRunning) {
      this.clearTimerInterval();
    } else {
      // @ts-ignore
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000);
    }
    this.setState((prevState) => ({
      // @ts-ignore
      isTimerRunning: !prevState.isTimerRunning,
    }));
  };

  renderTimerController = () => {


    const { isTimerRunning } = this.state;
    const startOrPauseImageUrl = isTimerRunning
    ? <span>&#9208;</span>
    : <span>&#9654;</span>; 
    const startOrPauseAltText = isTimerRunning ? "pause icon" : "play icon";

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <div className="timer-controller-icon">
            {startOrPauseImageUrl}
          </div>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <div id="reset" className="timer-controller-icon">
           	 	&#11119;
          </div>
        </button>
      </div>
    );
  };

  getElapsedSecondsInTimeFormat = () => {
    const { timerLimitInMinutes, timeElapsedInSeconds } = this.state;
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds;
    const minutes = Math.floor(totalRemainingSeconds / 60);
    const seconds = Math.floor(totalRemainingSeconds % 60);
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${stringifiedMinutes}:${stringifiedSeconds}`;
  };

  render() {

    return (
      <div className="app-container">
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div
              className="elapsed-time-container"
            >
              <h1 className="elapsed-time">
                <button
                  id="left"
                  className="limit-controller-button"
                  onClick={this.onDecreaseTimerLimitInMinutes}
                  type="button"
                  style={{fontWeight:"600", fontSize:"20px"}}
                  
                >
                  <span className="limit-controller-img">&#10134;</span>
                </button>
                {this.getElapsedSecondsInTimeFormat()}
                <button
                  id="right"
                  className="limit-controller-button"
                  onClick={this.onIncreaseTimerLimitInMinutes}
                  type="button"
                  style={{fontWeight:"600", fontSize:"20px"}}
                >
                <span className="limit-controller-img">&#10133;</span>
                </button>
              </h1> 
            </div>
          </div>

           {/* @ts-ignore */}
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;


