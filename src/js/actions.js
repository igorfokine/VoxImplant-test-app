// button to start a call
const createCallButton = document.getElementById('call-btn');

// pop-up after starting a call
const callDiv = document.getElementById('call-div');
const callStatus = document.getElementById('call-status');

// switches to manage the call
const microSwitchButton = document.getElementById('micro-switch-btn');
let microTurnedOn = false;

const callSwitchButton = document.getElementById('call-switch-btn');
let isCallOn = false;

// a button to close the pop-up
const callCloseButton = document.getElementById('call-close-btn');


const videoSwitchButton = document.getElementById('video-switch-btn');
let videoTurnedOn = false;
const localVideoContainer = document.getElementById('local-video-container');
const remoteVideoContainer = document.getElementById('remote-video-container');


// add listeners to access functionality
const accessFunctionality = () => {
  createCallButton.onclick = createCall;
  callSwitchButton.onclick = callSwitchButtonOnClick;
  callCloseButton.onclick = hangupOrDecline;

  microSwitchButton.onclick = microSwitchButtonOnClick;
  videoSwitchButton.onclick = videoSwitchButtonOnClick;
};