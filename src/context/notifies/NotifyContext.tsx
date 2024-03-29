import SockJS from 'sockjs-client';
import {IMessage} from '@stomp/stompjs';
import notifee, {EventType, NotificationAndroid} from '@notifee/react-native';
import React, {createContext, useContext} from 'react';
import Toast from 'react-native-toast-message';

import {url, _stompClient} from '../../App';
import {AuthContext} from '../auth/AuthContext';
import {Notify} from '../../model/response/NotifyCookResponse';
import {NotifyCookRequest} from '../../model/request/NotifyCookRequest';
import {useNavigation} from '@react-navigation/native';
import {Vibration} from 'react-native';

type NotifyContextProps = {
  startNotifiesServices: () => void;
  publishMessage: (message: NotifyCookRequest) => void;
  showToastMessage: (success: boolean, text1: string, text2: string) => void;
};

const buildMessage = (notify: Notify): string => {
  const sep: string = ', ';
  const index: string = 'Plato: ';

  let body: string = index.concat(notify.food, sep, notify.quantity.toString(), sep).concat(notify.time);

  return body;
};

const sendNotify = (_body: string) => {
  const notify: Notify = JSON.parse(_body) as Notify;
  let body: string = buildMessage(notify);

  let id: string = notify.id + '';
  let name: string = 'Default Channel';
  let title: string = 'Mesa: ' + notify.board;

  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({id, name});
    const android: NotificationAndroid = {
      channelId,
      actions: [
        {
          title: 'gaaaa',
          icon: 'https://my-cdn.com/icons/snooze.png',
          pressAction: {
            id: 'gaaaa',
          },
        },
      ],
    };
    await notifee.displayNotification({title, body, android});
  }
  onDisplayNotification();
};

export const NotifyContext = createContext({} as NotifyContextProps);
export const NotifyProvider = ({children}: any) => {
  const navigation = useNavigation();
  const {myPersonalData} = useContext(AuthContext);

  const publishMessage = async (message: NotifyCookRequest) => {
    const body: string = JSON.stringify(message);
    const destination: string = '/app/food/' + myPersonalData.specialty;

    _stompClient.publish({destination, body});
  };

  notifee.onForegroundEvent(async ({type, detail}) => {
    if (type === EventType.ACTION_PRESS && detail?.pressAction?.id === 'gaaaa') {
      Vibration.vibrate(10 * 40);
      showToastMessage(true, '', '');
    }
  });

  const startNotifiesServices = () => {
    sendNotify('{"id":0, "speciality": "speciality", "food":"", "board":"board", "quantity": 4, "time": "jueves "}');
    const endpoint: string = '/notify/deliver/' + myPersonalData.specialty;

    _stompClient.activate();
    _stompClient.configure({
      brokerURL: url,
      reconnectDelay: 500,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      logRawCommunication: false,
      webSocketFactory: () => SockJS(url),

      onConnect: async () => {
        try {
          _stompClient.subscribe(endpoint, (e: IMessage) => sendNotify(e.body));
        } catch (error: any) {}
      },
    });
  };

  const showToastMessage = (success: boolean, text1: string, text2: string) => {
    const type: string = success ? 'success' : 'error';
    Toast.show({type, text2, text1});
  };

  return <NotifyContext.Provider value={{startNotifiesServices, publishMessage, showToastMessage}}>{children}</NotifyContext.Provider>;
};
