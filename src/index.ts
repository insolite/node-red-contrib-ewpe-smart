import DeviceManager from './nodes/ewpe-device-manager';
import GetState from './nodes/ewpe-get-state';
import SetState from './nodes/ewpe-set-state';

export default (RED) => {
  DeviceManager(RED);
  GetState(RED);
  SetState(RED);
};
