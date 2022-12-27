import { Avatar } from "./Avatar";

export function AvatarLoader() {
  const participantAvatars = [
    {
      name: "vishnu",
      position: [0, 0, 0],
      shirtColor: "0xff8732a8",
      isMale: true,
    },
    {
      name: "Kuttu",
      position: [1, 0, 2],
      shirtColor: "0xff8732a8",
      isMale: true,
    },
    {
      name: "Appu",
      position: [-1, 0, -2],
      shirtColor: "0xff8732a8",
      isMale: true,
    },
    {
      name: "Devu",
      position: [2, 0, 3],
      shirtColor: "0xff8732a8",
      isMale: false,
    },
  ];
  return (
    <group>
      {participantAvatars.map((data, index) => {
        console.log(data.name)
        return <Avatar
          key={index}
          name={data.name}
          position={[...data.position]}
          isMale={data.isMale}
          shirtColor={data.shirtColor}
        ></Avatar>;
      })}
    </group>
  );
}
