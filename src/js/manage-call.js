const handleIncomingCall = ({ call }) => {
  console.log("An incoming call from: " + call.number());

  if (currentCall) {
    call.reject();
    console.log("The incoming call was rejected because the user is already on a call");
  }

  currentCall = call;
  toIncomingCall();

  currentCall.on(VoxImplant.CallEvents.Disconnected, () => {
    console.log("The created call was finished by interlocutor");

    currentCall = null;
    closeCall();
  });
};

const createCall = () => {
  console.log("Making a call to ", interlocutor);

  if (currentCall) {
    console.log("The created call was cancelled because the user is already on a call");
    return;
  }

  currentCall = sdk.call({
    number: interlocutor,
    video: { receiveVideo: true, sendVideo: false },
  });

  toAwaitingCall();

  currentCall.on(VoxImplant.CallEvents.Connected, () => {
    console.log("The created call was accepted");

    toAcceptedCall();

    currentCall.addEventListener(VoxImplant.CallEvents.EndpointAdded, onEndpointAdded);
  });

  currentCall.on(VoxImplant.CallEvents.Failed, () => {
    console.log("The created call was declined");

    currentCall = null;
    closeCall();
  });

  currentCall.on(VoxImplant.CallEvents.Disconnected, () => {
    console.log("The created call was finished by interlocutor");

    currentCall = null;
    closeCall();
  });
};

const acceptCall = () => {
  currentCall.answer(null, {}, { receiveVideo: true });
  console.log("The incoming call was answered");

  toAcceptedCall();

  currentCall.addEventListener(VoxImplant.CallEvents.EndpointAdded, onEndpointAdded);

  currentCall.on(VoxImplant.CallEvents.Disconnected, () => {
    console.log("The incoming call was finished by interlocutor");

    currentCall = null;
    closeCall();
  });
};

const declineCall = () => {
  currentCall.decline();
  console.log("The incoming call was declined");

  callDiv.hidden = true;
  currentCall = null;
};

const hangup = () => {
  currentCall.hangup();
  console.log("The created call was finished by owner");

  callDiv.hidden = true;
  // will trigger the CallEvents.Disconnected event for both users
};

// wait untill the interlocutor accepts/declines the call
const toAwaitingCall = () => {
  callDiv.hidden = false;
  callStatus.textContent = "Calling...";
  callSwitchButtonOn();
};

const toIncomingCall = () => {
  callDiv.hidden = false;
  callStatus.textContent = "Incoming call";
  callSwitchButtonOff();
};

const toAcceptedCall = () => {
  callDiv.hidden = false;
  callStatus.textContent = "The time tracker is here";
  callSwitchButtonOn();
};

const closeCall = () => {
  callDiv.hidden = true;
};

const hangupOrDecline = () => {
  if (currentCall) {
    if (isCallOn) {
      currentCall.hangup();
    } else {
      currentCall.decline();
    }
  }
};

const callSwitchButtonOn = () => {
  callSwitchButton.textContent = "Hangup";
  isCallOn = true;
}

const callSwitchButtonOff = () => {
  callSwitchButton.textContent = "Accept";
  isCallOn = false;
}

const callSwitchButtonOnClick = () => {
  if (isCallOn) {
    hangup();
  } else {
    acceptCall();
  }
}
