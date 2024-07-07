import { NodeMessage } from 'node-red';

export type DeviceId = string;

export type DeviceState = Record<string, unknown>;

export interface PayloadDefaults {
  deviceId?: DeviceId;
}

export type GetStatePayload = PayloadDefaults;
export interface SetStatePayload extends PayloadDefaults {
  data: Partial<DeviceState>;
}
export interface StatePayload extends PayloadDefaults {
  state: DeviceState;
}

export interface EwpeNodeMessage<TPayload> extends NodeMessage {
  payload?: TPayload;
}

export type GetStateNodeMessage = EwpeNodeMessage<GetStatePayload>;
export type SetStateNodeMessage = EwpeNodeMessage<SetStatePayload>;
export type StateNodeMessage = EwpeNodeMessage<StatePayload>;
