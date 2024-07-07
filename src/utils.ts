import { NodeAPI } from '@node-red/registry';
import DeviceManager from 'ewpe-smart-mqtt/app/device_manager';

interface DeviceManagerNode extends Node {
  deviceManager?: DeviceManager;
}

export const getCurrentDeviceManager = (
  RED: NodeAPI,
  deviceManagerId?: string,
): typeof DeviceManager | undefined => {
  if (!deviceManagerId) {
    return;
  }
  const deviceManagerNode = RED.nodes.getNode(deviceManagerId) as DeviceManagerNode;
  if (!deviceManagerNode) {
    return;
  }
  return deviceManagerNode.deviceManager;
};
