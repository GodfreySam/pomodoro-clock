import React from "react";
import "./App.css";
import SetTimer from "./components/SetTimer";

const audio = document.getElementById("beep");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
  }
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: "Session",
    isPlaying: false,
  };

  handlePlayPause = () => {
    const { isPlaying } = this.state;

    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false,
      });
    } else {
      this.loop = setInterval(() => {
        const {
          clockCount,
          breakCount,
          currentTimer,
          sessionCount,
        } = this.state;

        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === "Session" ? "Break" : "Session",
            clockCount:
              currentTimer === "Session" ? (breakCount * 60) : (sessionCount * 60)
          });
          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 1000);
      this.setState({
        isPlaying: true
      });
    }
  };

  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: "Session",
      isPlaying: false,
    });

    clearInterval(this.loop);
    audio.pause();
    audio.currentTimer = 0;
  };

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  convertToTime(count) {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? ("0"+minutes) : minutes; 
    seconds = seconds < 10 ? ("0"+seconds) : seconds;

    return `${minutes}:${seconds}`;
  }

  handleLengthChange = (count, timerType) => {
    const {
       sessionCount,
       breakCount,
       isPlaying,
       currentTimer,
       } = this.state;

       let newCount;

       if (timerType === "session") {
         newCount = sessionCount + count;
       } else {
         newCount = breakCount + count;
       }

     if (newCount > 0 && newCount < 61 && !isPlaying) {
        this.setState({
          [`${timerType}Count`]: newCount
        });

        if (currentTimer.toLowerCase() === timerType) {
          this.setState({
            clockCount: newCount * 60
          })
        }
     }
  }

  render() {
    const { breakCount, sessionCount, clockCount, currentTimer } = this.state;

    const breakProps = {
      title: "Break",
      count: breakCount,
      handleDecrease: ()=> this.handleLengthChange(-1, 'break'),
      handleIncrease: ()=> this.handleLengthChange(1, 'break')
    };

    const sessionProps = {
      title: "Session",
      count: sessionCount,
      handleDecrease: () => this.handleLengthChange(-1, "session"),
      handleIncrease: () => this.handleLengthChange(1, "session")
    };

    return (
      <main>
        <div className="flex">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        <div id="timer-label" className="clock-container">
          <h2>{currentTimer}</h2>
          <span className="timer" id="time-left">
            {this.convertToTime(clockCount)}
          </span>
        </div>
        <div className="flex">
          <div className="timer-actions">
            <button id="start_stop" onClick={this.handlePlayPause}>
              <i
                className={`fa fa-2x fa-${
                  this.state.isPlaying ? "pause" : "play"
                }`}
              />
            </button>
            <button id="reset" onClick={this.handleReset}>
              <i className="fa fa-2x fa-refresh" />
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
