'use strict';

var DeviceManager$1 = require('ewpe-smart-mqtt/app/device_manager');

var DeviceManager = (RED) => {
  function DeviceManagerNode(config) {
    RED.nodes.createNode(this, config);
    this.networkAddress = config.networkAddress;
    const deviceManager = new DeviceManager$1(this.networkAddress);
    const node = this;
    node.deviceManager = deviceManager;
  }
  RED.nodes.registerType("ewpe-device-manager", DeviceManagerNode);
};

var GetState = (RED) => {
  function GetStateNode(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    const node = this;
    node.on("input", (msg) => {
      const deviceId = msg.payload.deviceId || config.deviceId;
      if (!deviceId) {
        return;
      }
      const deviceManagerNode = RED.nodes.getNode(config.deviceManager);
      if (!deviceManagerNode) {
        return;
      }
      const deviceManager = deviceManagerNode.deviceManager;
      deviceManager.getDeviceStatus(deviceId).then((state) => {
        node.send({
          ...msg,
          payload: {
            ...msg.payload,
            state
          }
        });
      }).catch((err) => {
        console.error(err);
      });
    });
  }
  RED.nodes.registerType("ewpe-get-state", GetStateNode);
};

var SetState = (RED) => {
  function SetStateNode(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    const node = this;
    node.on("input", (msg) => {
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
      deviceManager.setDeviceState(deviceId, newState).then((state) => {
        node.send({
          ...msg,
          payload: {
            ...msg.payload,
            state
          }
        });
      }).catch((err) => {
        console.error(err);
      });
    });
  }
  RED.nodes.registerType("ewpe-set-state", SetStateNode);
};

var index = (RED) => {
  DeviceManager(RED);
  GetState(RED);
  SetState(RED);
};

module.exports = index;
