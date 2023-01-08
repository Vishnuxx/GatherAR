import { useGLTF } from "@react-three/drei";
import { AmbientLight, BoxGeometry, CapsuleGeometry, CatmullRomCurve3, CylinderGeometry, DirectionalLight, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, OrthographicCamera, PerspectiveCamera, PlaneGeometry, PointLight, SphereGeometry, SpotLight, TorusGeometry, TubeGeometry, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export const getPrimitiveObject = (type, uuid) => {
    var object , geometry , material
  switch (type) {
    case "plane":
      geometry = new PlaneGeometry(50, 50, 100, 100);
      material = new MeshStandardMaterial();
      object = new Mesh(geometry, material);
      object.name = "Plane";
      
      break;

    case "box":
      object = new Mesh(new BoxGeometry(), new MeshPhysicalMaterial());
      object.name = "Box";

      break;

    case "capsule":
      geometry = new CapsuleGeometry(1, 1, 4, 8);
      material = new MeshStandardMaterial();
      object = new Mesh(geometry, material);
      object.name = "Capsule";
      break;

    case "cylinder":
      geometry = new CylinderGeometry(1, 1, 1, 8, 1, false, 0, Math.PI * 2);
      object = new Mesh(geometry, new MeshStandardMaterial());
      object.name = "Cylinder";

      break;

    case "sphere":
      geometry = new SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI);
      object = new Mesh(geometry, new MeshStandardMaterial());
      object.name = "Sphere";

      break;

    case "torus":
      geometry = new TorusGeometry(1, 0.4, 8, 6, Math.PI * 2);
      object = new Mesh(geometry, new MeshStandardMaterial());
      object.name = "Torus";
      geometry.computeVertexNormals();

      break;

    case "tube":
      var path = new CatmullRomCurve3([
        new Vector3(2, 2, -2),
        new Vector3(2, -2, -0.6666666666666667),
        new Vector3(-2, -2, 0.6666666666666667),
        new Vector3(-2, 2, 2),
      ]);

      geometry = new TubeGeometry(path, 64, 1, 8, false);
      object = new Mesh(geometry, new MeshStandardMaterial());
      object.name = "Tube";

      break;

    case "ambientlight":
      var color = 0x222222;

      object = new AmbientLight(color);
      object.name = "AmbientLight";

      break;

    case "spotlight":
      object = new SpotLight(0xffffff);
      object.position.set(1, 1, 1);
      break;

    case "pointlight":
      var color = 0xffffff;
      var intensity = 1;
      var distance = 10;

      object = new PointLight(color, intensity, distance);
      object.name = "PointLight";

      break;

    case "directionalLight":
      var color = 0xffffff;
      var intensity = 1;

      object = new DirectionalLight(color, intensity);
      object.name = "DirectionalLight";
      object.target.name = "DirectionalLight Target";

      object.position.set(5, 10, 7.5);

      break;

    case "perspectiveCamera":
      object = new PerspectiveCamera();
      object.name = "PerspectiveCamera";

      break;

    case "orthographicCamera":
      //var aspect = editor.camera.aspect;
      object = new OrthographicCamera(-1, 1);
      object.name = "OrthographicCamera";

      break;

   

    default:
       object = new Mesh(new BoxGeometry(), new MeshPhysicalMaterial());
       object.name = "Box";
      break;
  }

  object.uuid = uuid;
  return Object.assign(object)
};


