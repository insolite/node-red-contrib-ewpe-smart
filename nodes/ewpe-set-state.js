const DeviceManager = require('ewpe-smart-mqtt/app/device_manager');

module.exports = (RED) => {
  const deviceManager = new DeviceManager('192.168.24.255'); // FIXME: dynamic config

  function GetStateNode (config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', (msg) => {
      const deviceId = msg.payload.deviceId || config.deviceId;
      const newState = msg.payload.data;
      if (!deviceId) {
        return;
      }
      deviceManager.setDeviceState(deviceId, newState)
        .then((state) => {
          node.send(state);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  RED.nodes.registerType('ewpe-set-state', GetStateNode);
};
