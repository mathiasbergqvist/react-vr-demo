import React from "react";
import { asset, Sphere, Model, Cylinder, Box } from "react-vr";

export const getLavaPlanet = () => {
  return (
    <Sphere
      radius={0.5}
      heightSegments={10}
      widthSegments={10}
      texture={"http://i.imgur.com/3FAR9Kf.jpg"}
      style={{
        transform: [{ translate: [-4.5, 3.5, 6] }]
      }}
    />
  );
};

export const getAeroplane = () => (
  <Model
    source={{ obj: asset("plane.obj") }}
    wireframe={true}
    style={{
      color: "#333d84",
      transform: [{ translate: [-8, 5, -9] }, { rotate: 20 }]
    }}
  />
);

export const getSkull = () => {
  return (
    <Model
      wireframe={true}
      source={{ obj: asset("skull.obj") }}
      style={{
        color: "#ffffff",
        transform: [{ translate: [0, 4, -9] }, { rotate: 25 }]
      }}
    />
  );
};

export const getBarrel = () => {
  return (
    <Cylinder
      dimHeight={1.5}
      radiusBottom={0.5}
      radiusTop={0.5}
      segments={15}
      style={{
        color: "#664908",
        transform: [{ translate: [7, -2, 4] }]
      }}
    />
  );
};

export const getBox = () => (
  <Box
    dimWidth={0.5}
    dimHeight={0.5}
    dimDepth={0.5}
    texture={"http://i.imgur.com/SHgHAyC.jpg"}
    style={{
      transform: [
        { translate: [-0.5, 2.5, -3] },
        { translateY: 1 },
        { translateX: -0.5 },
        { rotateY: 45 },
        { rotateZ: 45 }
      ]
    }}
  />
);
