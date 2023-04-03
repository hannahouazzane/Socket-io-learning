function socketsInRoom(room, io) {
  const roomSize = io.sockets.adapter.rooms.get(room);
  return roomSize ? roomSize.size : 0;
}

function addRoomToList(room, roomList) {
  let roomInfo = {
    [room]: { game: ["NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA"] },
  };

  roomList.push(roomInfo);
}

module.exports = { addRoomToList, socketsInRoom };
