import { Suspense, useEffect, useState } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import enginemodel from "../../../../assets/Models/car_engine.glb";
import tablemodel from "../../../../assets/Models/low_poly_table.glb";
import shoemodel from "../../../../assets/Models/puma_shoe_purple_3d_scan.glb";


export function Model({ type , uuid }, props) {
  const [model, setmodel] = useState();
  const [scene, setscene] = useState();

  useEffect(() => {
    switch (type) {
      case "engine":
       setmodel( enginemodel);
        break;

      case "table":
       setmodel( tablemodel);
        break;

      case "shoe":
       setmodel( shoemodel);
       break;
      default:
        setmodel();
        break;
    }
  }, []);
  

  useEffect(()=>{
     if(!model) return
     async function loadModel() {
         const loader = new GLTFLoader();
         const mod= await loader.loadAsync(model);
         console.log(mod.scene)
         setscene(mod.scene);
     }
    loadModel()
  
  },[model]);
 

 
  return (
    <>
      <Suspense>
        {scene && <primitive uuid={uuid} object={scene} {...props}></primitive>}
      </Suspense>
    </>
  );
}
