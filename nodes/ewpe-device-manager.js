const DeviceManager = require('ewpe-smart-mqtt/app/device_manager');

module.exports = (RED) => {
  function DeviceManagerNode(config) {
    RED.nodes.createNode(this, config);

    this.networkAddress = config.networkAddress;

    const deviceManager = new DeviceManager(this.networkAddress);

    const node = this;

    node.deviceManager = deviceManager;
  }

  RED.nodes.registerType('ewpe-device-manager', DeviceManagerNode);
};
