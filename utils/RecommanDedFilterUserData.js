module.exports = (user) => {
    return {
        id: user.id,
        friends: user.friends.map((friend) => ({
        id: friend._id,
        name:friend.name
      })),
    }
  }
  