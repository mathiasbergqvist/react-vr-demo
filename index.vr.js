import React from "react";
import {
  AppRegistry,
  Pano,
  Text,
  View
} from "react-vr";
import { getBackgrounds } from "./api/api";
import { getLavaPlanet, getAeroplane, getSkull, getBarrel, getBox } from "./models/models";
import styles from "./styles";

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

AppRegistry.registerComponent("react_vr_demo", () => react_vr_demo);
