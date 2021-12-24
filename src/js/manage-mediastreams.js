const microSwitchButtonOnClick = () => {
  if (currentCall) {
    if (microTurnedOn) {
      currentCall.muteMicrophone();
      microTurnedOn = false;
      microSwitchButton.textContent = "Off";
    } else {
      currentCall.unmuteMicrophone();
      microTurnedOn = true;
      microSwitchButton.textContent = "On";
    }
  }
};

const videoSwitchButtonOnClick = () => {
  if (currentCall) {
    console.log("sendVideo is called");
    currentCall
      .sendVideo(videoTurnedOn)
      .then(() => {
        console.log(`Resolved sendVideo(${videoTurnedOn})`);
      })
      .catch((e) => {
        console.log(`ERROR Reject sendVideo(${videoTurnedOn})`);
      });
    videoTurnedOn = !videoTurnedOn;
    videoSwitchButton.textContent = videoTurnedOn ? "On" : "Off";
  }
};