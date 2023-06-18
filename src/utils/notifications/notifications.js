import { createNotification } from './createNotification.js'
import { notificationRegistred, notificationNewEmailBox, notificationEmailExpired, notificationSessionExpired } from './notificationOptions.js'

export async function requestNotificationPermission() {
  return Notification.requestPermission().then(() => {
    if (getStatePermissionNotification()) {
      createNotification(notificationRegistred)
    }
  })
}

export function getStatePermissionNotification() {
  return Notification.permission !== 'granted' ? false : true
}

export function newEmailOnInbox(newEmailOnInbox) { 
  createNotification({
    ...notificationNewEmailBox,
    body: `${notificationNewEmailBox.body} (${newEmailOnInbox})`
  }) 
}

export function emailExpired(newEmail) { 
  createNotification({
    ...notificationEmailExpired,
    body: `${notificationEmailExpired.body} - ${newEmail} has been created`
  }) 
}

export function sessionExpired() { createNotification(notificationSessionExpired) }