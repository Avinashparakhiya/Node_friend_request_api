const User = require('../../models/User')
const FriendRequest = require('../../models/FriendRequest')
const FilterUserData = require('../../utils/FilterUserData')
const RecommanDedFilterUserData = require ('../../utils/RecommanDedFilterUserData')

exports.fetchUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).populate('friends')
    const userData = FilterUserData(user)
    res.status(200).json({ user: userData })
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}

exports.fetchRecommendedUsers = async (req, res) => {
  try {
    // const users = await User.find()
    //   .where('_id')
    //   .ne(req.userId)
    //   .populate('friends')
    // const usersData = users.friends.map((user) => {
    //   return RecommanDedFilterUserData(user)
    // })
    const user = await User.findById(req.userId).populate('friends')
    const friends = user.friends.map((friend) => {
      return {
        ...RecommanDedFilterUserData(friend),
      }
    })
    console.log("hello123",friends);
    if(friends.length==0){
      res.status(200).json({ users: "No Recommended Friend" })  
    }else{
    res.status(200).json({ users: friends })}
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('friends')
    if (!user) {
      return res.status(404).json({ error: 'user not found' })
    }
    const userData = FilterUserData(user)
    const friends = user.friends.map((friend) => {
      return {
        ...FilterUserData(friend),
      }
    })
    console.log("friends",friends);
    userData.friends = friends
    res.status(200).json({ user: userData})
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}

exports.fetchIncommingFriendRequest = async (req, res) => {
  try {
    const friends = await FriendRequest.find({
      $and: [{ isAccepted: false }, { receiver: req.userId }],
    }).populate('sender', '_id name')

    const friendsData = friends.map((friend) => {
      return {
        id: friend.id,
        user:friend.sender,
      }
    })

    res.status(200).json({ friends: friendsData })
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}

exports.fetchSendedFriendRequest = async (req, res) => {
  try {
    const friends = await FriendRequest.find({
      $and: [{ isAccepted: false }, { sender: req.userId }],
    }).populate('receiver')
    const friendsData = friends.map((friend) => {
      return {
        id: friend.id,
        user: FilterUserData(friend.receiver),
      }
    })

    res.status(200).json({ friends: friendsData })
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}

