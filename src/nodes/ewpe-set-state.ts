export default (RED) => {
  function SetStateNode (config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    const node = this;

    node.on('input', (msg) => {
      const deviceId = msg.payload.deviceId || config.deviceId;
      const newState = msg.payload.data;
      if (!deviceId) {
        return;
      }
      const deviceManagerNode = RED.nodes.getNode(config.deviceManager);
      if (!deviceManagerNode) {
        return;
      }
      const deviceManager = deviceManagerNode.deviceManager;
      deviceManager.setDeviceState(deviceId, newState)
        .then((state) => {
          node.send({
            ...msg,
            payload: {
              ...msg.payload,
              state,
            },
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  RED.nodes.registerType('ewpe-set-state', SetStateNode);
};
