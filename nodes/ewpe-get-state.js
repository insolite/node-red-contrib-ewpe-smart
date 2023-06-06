const { DeviceManager } = require('../ewpe-smart');

module.exports = (RED) => {
  const deviceManager = new DeviceManager('192.168.24.255'); // FIXME: dynamic config

  function GetStateNode (config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', (msg) => {
      this.id = msg.payload.deviceId || config.id;
      if (!this.id) {
        return;
      }
      deviceManager.getDeviceStatus(this.id)
        .then((state) => {
          node.send(state);
        })
        .catch((err) => {
          console.error(err);
        });
      // msg.payload = msg.payload.toLowerCase();
      // node.send(msg);
    });
  };

  RED.nodes.registerType('ewpe-get-state', GetStateNode);
};
