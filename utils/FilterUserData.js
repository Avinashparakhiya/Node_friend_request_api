module.exports = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    friends: user.friends.map((friend) => ({
      id: friend._id,
      name:friend.name
    })),
  }
}
