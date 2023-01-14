import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Html, PivotControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { APPGRADIENTS } from "../../../../AppConstants";
import { isDeletable } from "../../../../State/SceneState";

export function PaintBoard({ uuid }) {
  const canvasref = useRef();
  const [color, setcolor] = useState();
  const isDrawing = useRef(false)

  const focus = () => {
    isDeletable.value = true;
    isDeletable.uuid = uuid;
  };

  const unfocus = () => {
    isDeletable.value = true;
    isDeletable.uuid = uuid;
  };


  function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX, //- rect.left,
      y: evt.pageY - rect.top,
    };
  }

  function mouseMove(evt) {
    let mousePos = getMousePos(canvasref.current, evt);
 const ctx = canvasref.current.getContext('2d')
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
   
  }


  const onDown = (e) => {
    let mousePos = getMousePos(canvasref.current, e);
    const ctx = canvasref.current.getContext("2d");
    isDrawing.current = true
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    e.preventDefault();
  }

  const onMove = (e) => {
    if(isDrawing.current) mouseMove(e);
   
  }

  const onUp = (e) => {
    isDrawing.current = false
  }

  useEffect(() => {
    if (canvasref.current) {
      const canvas = canvasref.current;
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 2
      ctx.strokeStyle = "#000000"
      canvas.width = "500";
       canvas.height = "480";
    }
  }, [canvasref]);

  return (
    <PivotControls
      offset={[0, 4, 0]}
      activeAxes={[true, true, false]}
      visible
      //   depthTest={false}
      fixed
      scale={200}
    >
      <mesh onPointerMissed={unfocus}>
        <Html transform>
          <Box w={"500px"} h={"300px"} borderRadius={5} overflow={"hidden"}>
            <Flex
              color={"white"}
              bg={APPGRADIENTS.primarybutton}
              w={"100%"}
              p={4}
              onClick={focus}
              justifyContent={"space-between"}
            >
              <Text fontWeight={"bold"}>Sketch</Text>
              <Flex>
                <div>
                  <label htmlFor="pen-size">Size</label>
                  <input type="range" id="pen-size" min="1" max="50" />
                </div>
                <div>
                  <label htmlFor="pen-color">Color</label>
                  <input
                    type="color"
                    id="pen-color"
                    value="#000"
                    onChange={() => {}}
                  />
                </div>
                <Box>
                  <Button id="reset-canvas">Reset</Button>
                  <Button id="save-canvas">Save</Button>
                </Box>
              </Flex>
            </Flex>
            <Box bg={"white"} id="canvas-wrapper">
              <canvas
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                style={{ width: "500px", height: "100%" }}
                ref={canvasref}
              ></canvas>
            </Box>
          </Box>
        </Html>
      </mesh>
    </PivotControls>
  );
}
