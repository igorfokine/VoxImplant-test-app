const account_name = "igorfokin";
const application_name = "videochat";
const username = document.getElementById('username').textContent;
const password = document.getElementById('password').textContent;
const interlocutor = document.getElementById('interlocutor').textContent;


const login = () => {
  try {
    sdk.init({
      micRequired: true, // force microphone/camera access request
      videoSupport: true, // enable video support
      progressTone: true, // play progress tone
      localVideoContainerId: "localVideo",
      remoteVideoContainerId: "remoteVideo"
    });
  } catch (e) {
    console.log(e);
  }

  sdk.on(VoxImplant.Events.SDKReady, () => {
    sdk.connect();
    console.log("Connected to VoxImplant");
  });

  sdk.on(VoxImplant.Events.ConnectionEstablished, () => {
    const login_info = username + "@" + application_name + "." + account_name + ".voximplant.com";
    sdk.login(login_info, password);
    console.log("Logged in as ", login_info);
  });

  sdk.on(VoxImplant.Events.AuthResult, (e) => {
    if (e.result) {
      console.log("Successful authorization");
    } else {
      console.log("Failed authorization");
    }
  });
}
