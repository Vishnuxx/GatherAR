import {
  AmbientLight,
  BoxGeometry,
  CapsuleGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  DirectionalLight,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  SphereGeometry,
  SpotLight,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";

export function Primitive({type , uuid ,ref}) {
  var geometry, material, object;
console.log(type)
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

    default:
      object = new Mesh(new BoxGeometry(), new MeshPhysicalMaterial());
      object.name = "Box";
      break;
  }

  return <primitive object={object} ref={ref} uuid={uuid}></primitive>
}
