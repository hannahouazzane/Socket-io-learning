function socketsInRoom(room, io) {
  const roomSize = io.sockets.adapter.rooms.get(room);
  return roomSize ? roomSize.size : 0;
}

function addRoomToList(room, playerID, roomList) {
  let roomInfo = {
    room: room,
    playerX: playerID,
    playerO: "none",
    game: ["NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA"],
  };

  roomList.push(roomInfo);
}

function addSecondPlayer(room, playerID, roomList) {
  console.log(roomList);
  let roomIndex = "";
  roomList.forEach((element) => {
    if (element["room"] == room) {
      roomIndex = roomList.indexOf(element);
      element["playerO"] = playerID;
    }
  });
}

module.exports = { addRoomToList, socketsInRoom, addSecondPlayer };
