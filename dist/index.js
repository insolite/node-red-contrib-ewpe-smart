'use strict';

var DeviceManager = require('ewpe-smart-mqtt/app/device_manager');

const nodePrefix = "ewpe-";

const nodeInit$2 = (RED) => {
  function DeviceManagerNode(config) {
    RED.nodes.createNode(this, config);
    this.networkAddress = config.networkAddress;
    const node = this;
    node.deviceManager = new DeviceManager(node.networkAddress);
    const scanInterval = setInterval(() => {
      node.deviceManager.connection.scan(node.networkAddress);
    }, 1e3 * 60 * 2);
    node.on("close", () => {
      clearInterval(scanInterval);
    });
  }
  RED.nodes.registerType(`${nodePrefix}device-manager`, DeviceManagerNode);
};

const getCurrentDeviceManager = (RED, deviceManagerId) => {
  if (!deviceManagerId) {
    return;
  }
  const deviceManagerNode = RED.nodes.getNode(deviceManagerId);
  if (!deviceManagerNode) {
    return;
  }
  return deviceManagerNode.deviceManager;
};

const nodeInit$1 = (RED) => {
  function GetStateNode(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    const node = this;
    node.on("input", (msg) => {
      const deviceId = msg.payload?.deviceId || config.deviceId;
      if (!deviceId) {
        node.error("Device ID is not set", msg);
        return;
      }
      const deviceManager = getCurrentDeviceManager(RED, config.deviceManager);
      if (!deviceManager) {
        node.error("Device Manager is not initialized", msg);
        return;
      }
      deviceManager.getDeviceStatus(deviceId).then((state) => {
        const stateMsg = {
          ...msg,
          payload: {
            ...msg.payload,
            deviceId,
            state
          }
        };
        node.send(stateMsg);
      }).catch((error) => {
        node.error(`Error setting device state: ${error}`, msg);
      });
    });
  }
  RED.nodes.registerType(`${nodePrefix}get-state`, GetStateNode);
};

const nodeInit = (RED) => {
  function SetStateNode(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    const node = this;
    node.on("input", (msg) => {
      const deviceId = msg.payload?.deviceId || config.deviceId;
      const newState = msg.payload?.data || {};
      if (!deviceId) {
        node.error("Device ID is not set", msg);
        return;
      }
      const deviceManager = getCurrentDeviceManager(RED, config.deviceManager);
      if (!deviceManager) {
        node.error("Device Manager is not initialized", msg);
        return;
      }
      deviceManager.setDeviceState(deviceId, newState).then((state) => {
        const stateMsg = {
          ...msg,
          payload: {
            ...msg.payload,
            deviceId,
            state
          }
        };
        node.send(stateMsg);
      }).catch((error) => {
        node.error(`Error setting device state: ${error}`, msg);
      });
    });
  }
  RED.nodes.registerType(`${nodePrefix}set-state`, SetStateNode);
};

var index = (RED) => {
  nodeInit$2(RED);
  nodeInit$1(RED);
  nodeInit(RED);
};

module.exports = index;
