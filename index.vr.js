import React from "react";
import { AppRegistry, asset, Pano, Text, View, StyleSheet } from "react-vr";
import { getImages, getBackgrounds } from "./api/api";

export default class react_vr_demo extends React.Component {
  constructor() {
    super();
    this.state = {
      background:
        "https://farm2.staticflickr.com/1763/41116404980_d4a20da144_b.jpg",
      backgroundImages: [],
      currentDestination: 0
    };
  }

  componentDidMount() {
    getBackgrounds().then(backgroundImages => {
      this.setState({
        background: backgroundImages[0],
        backgroundImages,
        currentDestination: 0
      });
    });
  }

  travelToDestination(index) {
    console.log("travelToDestination", index);
  }

  render() {
    const destinationDescriptions = ["Flood", "City by night"];

    return (
      <View>
        <Pano source={{ uri: this.state.background }} />
        <Text style={styles.welcomePanel}>React VR adventure traveller</Text>
        <View style={styles.menuWrapper}>
          {this.state.backgroundImages.map((destination, index) => {
            return (
              <View
                style={styles.menuItem}
                key={index}
                onEnter={() => {
                  this.travelToDestination(index);
                }}
              >
                <Text style={styles.menuItemText}>
                  {destinationDescriptions[index]}
                </Text>
              </View>
            );
          })}
        </View>
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
    width: 5,
    height: 1.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    transform: [{ translate: [-2, 0, -7.5] }]
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 2,
    height: 2,
    borderRadius: 2,
    borderWidth: 0.04,
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
