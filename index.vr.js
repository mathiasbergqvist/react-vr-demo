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
import { getLavaPlanet, getAeroplane, getSkull, getBarrel, getBox } from "./models/models";

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
        return getLavaPlanet();
      case 1:
        return getAeroplane();
      case 2:
        return getSkull();
      case 3:
        return getBarrel();
      case 4:
        return getBox();
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
