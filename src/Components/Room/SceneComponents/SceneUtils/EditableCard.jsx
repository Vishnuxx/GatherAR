import { Textarea } from "@chakra-ui/react";
import { Html } from "@react-three/drei";
import { useState } from "react";

export function EditableCard({initialText}) {
    const [text, setText] = useState(initialText);
    const [color, setcolor] = useState("");

    const handleColor = (e)=>{
        setcolor(e.target.value)
    }
    let handleInputChange = (e) => {
      let inputValue = e.target.value;
      setcolor(inputValue);
    };
    return (
      <mesh>

        <Html>
          <input type="color" value={color} onChange={handleColor}/>
          <Textarea
          textColor={color}
            value={text}
            onChange={handleInputChange}
            placeholder="Type Here"
            
          />
        </Html>
      </mesh>
    );
}