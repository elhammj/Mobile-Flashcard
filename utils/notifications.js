import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import { AsyncStorage } from 'react-native';
import { NOTIFICATION_KEY } from './helpers'

/* 
  This is to remind people to 
  take quiz every day at eight pm
  This code has been created using "Local Notification" lesson in React Nanodegree
  It has three main functions, crate, set and cancel
*/

// This is the first function: return object which represnts a notification
const createNotification = () => {
  return {
    title: 'Remmber to Take A Quiz!',
    body: 'Gentel Reminder, You have not taken a quiz today!',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

/* 
This is the second function: to remove the notification key cancel all 
notification when the quiz is already taken by removing emove the notification key 
*/
export const clearLocalNotification =  () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

/*
 This is the third function: to set the local notification 
 if it has not yet and if the permisison is already granted
*/
export const setLocalNotification =  () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              //At eight colck
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day', //repeat daily
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}