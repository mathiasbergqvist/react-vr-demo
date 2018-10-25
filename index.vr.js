import React from "react";
import { AppRegistry, asset, Pano, Text, View } from "react-vr";
import { getImages, getBackgrounds } from "./api/api";
require('dotenv').config();

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

  render() {
    return (
      <View>
        <Pano source={{ uri: this.state.background }} />
        <Text
          style={{
            backgroundColor: "#777879",
            fontSize: 0.8,
            fontWeight: "400",
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: "center",
            textAlignVertical: "center",
            transform: [{ translate: [0, 0, -3] }]
          }}
        >
          hello
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent("react_vr_demo", () => react_vr_demo);
