module.exports = (RED) => {
  function GetStateNode (config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    const node = this;

    node.on('input', (msg) => {
      const deviceId = msg.payload.deviceId || config.deviceId;
      if (!deviceId) {
        return;
      }
      const deviceManagerNode = RED.nodes.getNode(config.deviceManager);
      if (!deviceManagerNode) {
        return;
      }
      const deviceManager = deviceManagerNode.deviceManager;
      deviceManager.getDeviceStatus(deviceId)
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

  RED.nodes.registerType('ewpe-get-state', GetStateNode);
};
