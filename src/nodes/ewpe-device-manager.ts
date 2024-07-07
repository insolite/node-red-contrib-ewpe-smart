import {
  Node,
  NodeDef,
  NodeInitializer,
} from 'node-red';
import DeviceManager from 'ewpe-smart-mqtt/app/device_manager';
import { nodePrefix } from '../constants';

export interface DeviceManagerNode extends Node {
  networkAddress?: string;
  deviceManager: typeof DeviceManager;
}

export interface DeviceManagerConfig extends NodeDef {
  networkAddress?: string;
}

const nodeInit: NodeInitializer = (RED) => {
  function DeviceManagerNode(config: DeviceManagerConfig) {
    RED.nodes.createNode(this, config);
    this.networkAddress = config.networkAddress;
    const node: DeviceManagerNode = this;

    node.deviceManager = new DeviceManager(node.networkAddress);
  }

  RED.nodes.registerType(`${nodePrefix}device-manager`, DeviceManagerNode);
};

export default nodeInit;
