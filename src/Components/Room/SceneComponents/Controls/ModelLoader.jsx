import { Suspense, useEffect, useRef } from "react";
import { useLoader } from "react-three-fiber";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

export function ModelLoader({ url, uuid , filename}) {
  const modelRef = useRef();


  return (
    <Suspense>
      <primitive
        uuid={uuid}
        ref={modelRef}
        // object={gltf.scene}
        dispose={null}
      />
    </Suspense>
  );
}
