import {
  Node,
  NodeDef,
  NodeInitializer,
} from 'node-red';
import { nodePrefix } from '../constants';
import {
  DeviceId,
  DeviceState,
  GetStateNodeMessage,
  StateNodeMessage,
} from '../types';
import { getCurrentDeviceManager } from '../utils';

export interface GetStateConfig extends NodeDef {
  deviceId?: DeviceId;
  deviceManager?: string;
}

const nodeInit: NodeInitializer = (RED) => {
  function GetStateNode (config: GetStateConfig) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    const node: Node = this;

    node.on('input', (msg: GetStateNodeMessage) => {
      const deviceId = msg.payload?.deviceId || config.deviceId;
      if (!deviceId) {
        node.error('Device ID is not set', msg);
        return;
      }
      const deviceManager = getCurrentDeviceManager(RED, config.deviceManager);
      if (!deviceManager) {
        node.error('Device Manager is not initialized', msg);
        return;
      }
      deviceManager.getDeviceStatus(deviceId)
        .then((state: DeviceState) => {
          const stateMsg: StateNodeMessage = {
            ...msg,
            payload: {
              ...msg.payload,
              deviceId,
              state,
            },
          };
          node.send(stateMsg);
        })
        .catch((error) => {
          node.error(`Error setting device state: ${error}`, msg);
        });
    });
  }

  RED.nodes.registerType(`${nodePrefix}get-state`, GetStateNode);
};

export default nodeInit;
