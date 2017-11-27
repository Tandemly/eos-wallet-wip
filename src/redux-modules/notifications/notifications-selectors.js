import { createSelector } from "reselect";

export const selectNotificationsState = state => state.notification || {};

// export const selectNotification = createSelector(
//   selectNotificationsState,
//   notifications => notifications.notification
// );