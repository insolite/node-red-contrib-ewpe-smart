import DeviceManager from 'ewpe-smart-mqtt/app/device_manager';

export default (RED) => {
  function DeviceManagerNode(config) {
    // console.log(asd);
    RED.nodes.createNode(this, config);

    this.networkAddress = config.networkAddress;

    const deviceManager = new DeviceManager(this.networkAddress);

    const node = this;

    node.deviceManager = deviceManager;
  }

  RED.nodes.registerType('ewpe-device-manager', DeviceManagerNode);
};
