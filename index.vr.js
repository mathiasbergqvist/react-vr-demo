import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  StyleSheet,
  Sphere,
  Model,
  Cylinder,
  Box
} from "react-vr";
import { getImages, getBackgrounds } from "./api/api";

export default class react_vr_demo extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDestinationId: 0,
      destinations: [
        {
          id: 0,
          photoId: 33099817083,
          background:
            "https://farm2.staticflickr.com/1763/41116404980_d4a20da144_b.jpg",
          description: "Mountain top"
        },
        {
          id: 1,
          photoId: 35999118900,
          background: null,
          description: "Town overview"
        },
        {
          id: 2,
          photoId: 33410679990,
          background: null,
          description: "Spooky castle"
        },
        {
          id: 3,
          photoId: 2362395095,
          background: null,
          description: "The beach"
        },
        {
          id: 4,
          photoId: 14156959605,
          background: null,
          description: "The dance floor"
        }
      ]
    };
  }

  componentWillMount() {
    getBackgrounds(this.state.destinations).then(
      destinationsWithBackgroundImage => {
        this.setState({
          background: destinationsWithBackgroundImage[0].background,
          currentDestination: 0,
          destinations: destinationsWithBackgroundImage
        });
      }
    );
  }

  travelToDestination(id) {
    this.setState({
      currentDestinationId: id
    });
  }

  getCurrentDestinationById(id) {
    return this.state.destinations.find(destination => destination.id === id);
  }

  get3dShape() {
    switch (this.state.currentDestinationId) {
      case 0:
      return (
        <Sphere
          radius={0.5}
          heightSegments={10}
          widthSegments={10}
          texture={'http://i.imgur.com/3FAR9Kf.jpg'}
          style={{
            transform: [{ translate: [-4.5, 3.5, 6] }]
          }}
        />
      );
      case 1: 
      return (
        <Model 
          source={{obj: asset('plane.obj')}}
          wireframe={true}
          style={{
            color: "#333d84",
            transform: [
              {translate: [-8, 5, -9]},
              {rotate: 20}
            ]
          }}
        />
      );
      case 2:
      return (
        <Model 
          wireframe={true}
          source={{obj: asset("skull.obj")}}
          style={{
            color: "#ffffff",
            transform: [
              {translate: [0, 4, -9]},
              {rotate: 25}
            ]
          }}
        />
      );
      case 3:
      return (
        <Cylinder
          dimHeight={1.5}
          radiusBottom={0.5}
          radiusTop={0.5}
          segments={15}
          style={{
            color: "#664908",
            transform: [
              { translate: [7, -2, 4] },
            ]
          }}
        />
      );
      case 4:
      return (
        <Box
          dimWidth={0.5}
          dimHeight={0.5}
          dimDepth={0.5}
          texture={'http://i.imgur.com/SHgHAyC.jpg'}
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
      default:
      return null;
    }
  }

  render() {
    return (
      <View>
        <Pano
          source={{
            uri: this.getCurrentDestinationById(this.state.currentDestinationId)
              .background
          }}
        />
        <Text style={styles.welcomePanel}>React VR adventure traveller</Text>
        <View style={styles.menuWrapper}>
          {this.state.destinations.map(destination => {
            return (
              <View
                style={styles.menuItem}
                key={destination.id}
                onEnter={() => {
                  this.travelToDestination(destination.id);
                }}
              >
                <Text style={styles.menuItemText}>
                  {destination.description}
                </Text>
              </View>
            );
          })}
        </View>
        {this.get3dShape()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomePanel: {
    backgroundColor: "#ef5350",
    fontSize: 0.8,
    fontWeight: "400",
    layoutOrigin: [0.5, 0.5],
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: "center",
    textAlignVertical: "center",
    transform: [{ translate: [0, 2, -5] }]
  },
  menuWrapper: {
    width: 10,
    height: 1.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    transform: [{ translate: [-5, 0, -7.5] }]
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 2,
    height: 2,
    borderRadius: 2,
    borderWidth: 0.08,
    borderColor: "#fff",
    backgroundColor: "#ef5350"
  },
  menuItemText: {
    fontSize: 0.4,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  }
});

AppRegistry.registerComponent("react_vr_demo", () => react_vr_demo);
