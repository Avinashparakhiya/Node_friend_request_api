const router = require('express').Router()
const {
  me,
  fetchUserById,
  fetchRecommendedUsers: fetchRecommendedUsers,
  fetchSendedFriendRequest,
  fetchIncommingFriendRequest,
} = require('../controllers/User/FetchUser')

const {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelSendedFriendRequest,
} = require('../controllers/User/UserAction')

const authRequired = require('../middleware/AuthRequired')

router.get('/me', authRequired, me)
router.get('/recommended_users', authRequired, fetchRecommendedUsers)
router.get('/friend_request/sended', authRequired, fetchSendedFriendRequest)
router.get(
  '/friend_request/received',
  authRequired,
  fetchIncommingFriendRequest,
)

router.get('/friend_request/:userId/send', authRequired, sendFriendRequest)
router.get(
  '/friend_request/:requestId/accept',
  authRequired,
  acceptFriendRequest,
)
router.get(
  '/friend_request/:requestId/decline',
  authRequired,
  declineFriendRequest,
)
router.get(
  '/friend_request/:requestId/cancel',
  authRequired,
  cancelSendedFriendRequest,
)
router.get('/:user_id', authRequired, fetchUserById)

module.exports = router
