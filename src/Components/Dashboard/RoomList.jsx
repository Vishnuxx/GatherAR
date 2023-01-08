import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { RoomListItem } from "./RoomListItem";

export function RoomList({ roomlist, ...props }) {
  return (
    <Stack {...props}>
      {roomlist?.map((room, i) => {
        return (
          <RoomListItem
            key={i}
            title={room.roomname}
            roomid={room.id}
          />
        );
      })}

      {!roomlist || roomlist == [] ? <EmptyList></EmptyList> : ""}
    </Stack>
  );
}

function EmptyList() {
  return (
    <Center w={"100%"} h={"100%"}>
      <Stack color="grey">
        <Text align={"center"}>You haven't created any rooms yet.</Text>
        <Text align={"center"}>Click the Create Button to create new room</Text>
      </Stack>
    </Center>
  );
}
