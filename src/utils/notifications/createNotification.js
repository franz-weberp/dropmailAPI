export function createNotification(notificationRegistred) {
  new Notification(notificationRegistred.title, {
    body: notificationRegistred.body,
    data: notificationRegistred.data,
    icon: notificationRegistred.icon,
    tag: notificationRegistred.tag,
  })
}