import DeviceManager from './nodes/ewpe-device-manager.ts';
import GetState from './nodes/ewpe-get-state.ts';
import SetState from './nodes/ewpe-set-state.ts';

export default (RED) => {
  DeviceManager(RED);
  GetState(RED);
  SetState(RED);
};
