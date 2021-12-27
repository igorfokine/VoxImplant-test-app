// handles endpoint added
const onEndpointAdded = ({ endpoint }) => {
  endpoint.addEventListener(VoxImplant.EndpointEvents.RemoteMediaAdded, onRemoteMediaAdded);
  endpoint.addEventListener(VoxImplant.EndpointEvents.RemoteMediaRemoved, onRemoteMediaRemoved);
  endpoint.addEventListener(VoxImplant.EndpointEvents.Removed, onEndpointRemoved);
};

// handle remote media stream added
const onRemoteMediaAdded = ({ endpoint, mediaRenderer }) => {
  console.log("onRemoteMediaAdded is called");

  // render a video stream in the remote video holder
  const renderedVideo = document.createElement('div');
  document.getElementById('local-video-container').appendChild(renderedVideo);
  mediaRenderer.render(renderedVideo);
};

// handle the remote media removed
const onRemoteMediaRemoved = ({ endpoint, mediaRenderer }) => {
  console.log("onRemoteMediaRemoved is called");
};

// handle an endpoint removed
const onEndpointRemoved = ({ endpoint }) => {
  console.log("onEndpointRemoved is called");
};
