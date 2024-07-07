import {
  Node,
  NodeDef,
  NodeInitializer,
} from 'node-red';
import { nodePrefix } from '../constants';
import {
  DeviceId,
  DeviceState,
  SetStateNodeMessage,
  StateNodeMessage,
} from '../types';
import { getCurrentDeviceManager } from '../utils';

export interface SetStateConfig extends NodeDef {
  deviceId?: DeviceId;
  deviceManager?: string;
}

const nodeInit: NodeInitializer = (RED) => {
  function SetStateNode (config: SetStateConfig) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    const node: Node = this;

    node.on('input', (msg: SetStateNodeMessage) => {
      const deviceId = msg.payload?.deviceId || config.deviceId;
      const newState = msg.payload?.data || {};
      if (!deviceId) {
        node.error('Device ID is not set', msg);
        return;
      }
      const deviceManager = getCurrentDeviceManager(RED, config.deviceManager);
      if (!deviceManager) {
        node.error('Device Manager is not initialized', msg);
        return;
      }
      deviceManager.setDeviceState(deviceId, newState)
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

  RED.nodes.registerType(`${nodePrefix}set-state`, SetStateNode);
};

export default nodeInit;
