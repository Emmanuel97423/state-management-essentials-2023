import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import {
  useGetNotificationsQuery,
  allNotificationsRead,
  selectMetadataEntities,
} from './notificationsSlice'
import { selectAllUsers } from '../users/usersSlice'

export const NotificationsList = () => {
  const dispatch = useDispatch()
  const { data: notifications = [] } = useGetNotificationsQuery()
  const notificationsMetadata = useSelector(selectMetadataEntities)
  const users = useSelector(selectAllUsers)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotification = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknow user',
    }

    const metadata = notificationsMetadata[notification.id]

    const notificationClassname = classnames('notification', {
      new: metadata.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotification}
    </section>
  )
}
