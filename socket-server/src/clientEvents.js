import axios from 'axios';

import { success } from './lib/log';
import {
  serverInitialState,
  serverChanged,
  serverLeave,
  serverRun,
  serverMessage
} from './serverEvents';

/**
 *
 *  Client emissions (server listeners)
 *
 *  more on socket emissions:
 *  @url {https://socket.io/docs/emit-cheatsheet/}
 *
 *  @param room is an ES6 Map, containing { id, state }
 *  @url {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
 *
 */
const clientReady = ({ io, client, room }, payload) => {
  console.log('payload in clientReady', payload);
  success('client ready heard');
  serverInitialState({ io, client, room }, payload);
};

const clientUpdate = ({ io, client, room }, payload) => {
  const { text, email } = payload;
  console.log('payload in clientUpdate', payload);
  success('client update heard. payload.text = ', payload);
  room.set('text', text);
  room.set('email', email);
  serverChanged({ io, client, room });
};

const clientDisconnect = ({ io, room }) => {
  success('client disconnected');
  serverLeave({ io, room });
};

const clientRun = async ({ io, room }, payload) => {
  success('running code from client. room.get("text") = ', room.get('text'));
  const { text, email, test } = payload;
  const url = process.env.CODERUNNER_SERVICE_URL;

  try {
    const { data } = await axios.post(`${url}/submit-code`, {
      code: text + test
    });
    const stdout = data;
    serverRun({ io, room }, { stdout, email });
  } catch (e) {
    success('error posting to coderunner service from socket server. e = ', e);
  }
};

const clientMessage = async ({ io, room }, payload) => {
  success('client message heard');
  const url = process.env.REST_SERVER_URL;
  try {
    const { data } = await axios.post(`${url}/messages/`, payload);
    serverMessage({ io, room }, data);
  } catch (e) {
    success('error saving message to the database. e = ', e);
  }
};

const clientRecordHistory = async ({ io, room }, payload) => {
  //success console log?
  const { challenge_id, winner, loser } = payload;
  const time = Date.now();
  const url = process.env.REST_SERVER_URL;
  try {
    const winnerId = await axios.get(`${url}/api/users/fetchUserByEmail`, {
      params: { email: winner }
    });
    const loserId = await axios.get(`${url}/api/users/fetchUserByEmail`, {
      params: { email: loser }
    });
    const winnerPayload = {
      outcome: 1,
      time: time,
      clout: 1,
      user_id: winnerId.data.id,
      challenger_id: loserId.data.id,
      challenge_id
    };
    const loserPayload = {
      outcome: 0,
      time: time,
      clout: 0,
      user_id: loserId.data.id,
      challenger_id: winnerId.data.id,
      challenge_id
    };

    const winnerData = await axios.post(
      `${url}/api/history/addHistory`,
      winnerPayload
    );
    const loserData = await axios.post(
      `${url}/api/history/addHistory`,
      loserPayload
    );
    serverLeave({ io, room });
  } catch (err) {
    console.log(err);
  }
};

const clientEmitters = {
  'client.ready': clientReady,
  'client.update': clientUpdate,
  'client.disconnect': clientDisconnect,
  'client.run': clientRun,
  'client.message': clientMessage,
  'client.recordHistory': clientRecordHistory
};

export default clientEmitters;
