let currentCall;

const sdk = VoxImplant.getInstance();

document.addEventListener('DOMContentLoaded', () => {
  login(); // initialize, connect, login to Voximplant Cloud
  accessFunctionality(); // add event listeners to interactive elements ('./js/actions.js')
});

sdk.on(VoxImplant.Events.IncomingCall, (e) => {
  handleIncomingCall(e);
});
