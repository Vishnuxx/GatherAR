import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { APPCOLORS, APPGRADIENTS } from "../AppConstants";
import { Background } from "../GlobalComponents/Background";
import { Canvas, useLoader } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { uploadModel } from "../Utilities/db";
import { getUserData } from "../Utilities/localDataStorage";
import { showLoading } from "../State/appActions";

export function UploadModel({}) {
  const [selectedRoomID, setroomSelected] = useState();

  const location = useLocation();
  console.log(location.state);

  return (
    <Stack p={5} h={"95vh"} alignItems="center">
      <Background></Background>
      <Stack w={"100%"}>
        <Text fontSize={"2rem"} color={"white"}>
          Selet a room
        </Text>
      </Stack>

      <Select h={"50px"} color={"white"} placeholder="Select option">
        {location.state?.roomlist?.map((room, i) => {
          return (
            <option key={i} onChange={null} value={room.id}>
              {room.roomname}
            </option>
          );
        })}
      </Select>
      <Stack w={"100%"} h={"100%"}>
        {location.state?.roomlist?.map((room, i) => {
          return (
            <RoomTile
              key={i}
              title={room.roomname}
              roomid={room.id}
              onClick={() => setroomSelected(room.id)}
            ></RoomTile>
          );
        })}
      </Stack>

      <FileLoader></FileLoader>
    </Stack>
  );
}

function FileLoader({selectedroomid}) {
 
  const [file, setFile] = useState();
  const fileinputref = useRef();

  const onSelectFile = () => {
    fileinputref.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const confirm =  window.confirm("Are you sure to upload " + e.target.files[0].filename)
      showLoading(true)
      if(confirm){
        uploadModel(getUserData().uid, selectedroomid, e.target.files[0].filename , (snapshot)=>{
          showLoading(false)
        }, (e)=>{
          showLoading(false)
          console.log(e)
        });
      }
    }
    
  };
  return (
    <>
      <Button
        position={"absolute"}
        bottom={10}
        w={150}
        bg={APPGRADIENTS.primarybutton}
        onClick={onSelectFile}
      >
        Upload
      </Button>
      <Stack>
        <VisuallyHidden>
          <input
            ref={fileinputref}
            type="file"
            accept={[".glb"]}
            onChange={handleFileChange}
          />
        </VisuallyHidden>
        
      </Stack>
    </>
  );
}





















function ModelViewerDialogue({  onUpload, file }) {
   const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, settext] = useState("");

  useEffect(() => {
    settext(file?.name);
  }, [isOpen]);

  const onModelUpload = () => {
    onClose();
    if ([null, undefined, ""].includes(text)) alert("filename must be entered");
    onUpload();
  };

  const onTextChange = (e) => {
    console.log(file);
    settext(e.target.value);
  };
  // console.log(currentfile)
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal size="l" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalCloseButton
          alignSelf={"flex-start"}
          bg={"grey"}
          color={"white"}
        ></ModalCloseButton>
        <ModalContent>
          <Stack h={"80vh"} w={"100%"} alignItems="center">
            <Canvas h={"100vh"} style={{ background: "black" }}>
              <Gltfscene file={file} onClose={onClose}></Gltfscene>
              <mesh>
                <boxGeometry></boxGeometry>
                <meshStandardMaterial></meshStandardMaterial>
              </mesh>
              <ambientLight></ambientLight>
              <OrbitControls></OrbitControls>
            </Canvas>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              position={"absolute"}
              bottom={10}
            >
              <Input
                color={"white"}
                placeholder={"enter the name "}
                type="text"
                bg={"none"}
                onChange={onTextChange}
              ></Input>
              <Button
                w={150}
                bg={APPGRADIENTS.primarybutton}
                onClick={onModelUpload}
              >
                Upload
              </Button>
            </Stack>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
}

function Gltfscene({ file, onClose }) {
  const reader = useRef(new FileReader());
  useEffect(() => {
    reader.current.readAsArrayBuffer(file);
  }, [file]);

  const [scene, setscene] = useState();

  useEffect(() => {
    reader.current.onload = function (buffer) {
      var loader = new GLTFLoader();
      loader.parse(
        buffer,
        null,
        (gltf) => {
          console.log(gltf);
          setscene(gltf.scene);
        },
        (e) => {
          console.error(e);
          alert("file failed to load" + e.toString());
          onClose();
        }
      );
    };
  }, [reader]);

  return scene && <primitive object={scene}></primitive>;
}

function RoomTile({ title, roomid, onClick }) {
  return (
    <Stack
      onClick={onClick}
      borderRadius={5}
      p={5}
      bg={APPCOLORS.card}
      color={"white"}
      w={"100%"}
    >
      <Text color={"white"}>{title}</Text>
    </Stack>
  );
}
