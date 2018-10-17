import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';
import { getImages } from './api/api';

export default class react_vr_demo extends React.Component {

  constructor() {
    super();

    this.state = {
      background: 'https://farm2.staticflickr.com/1763/41116404980_d4a20da144_b.jpg'
    };
  }

  componentDidMount() {
    getImages(34506405094)
    .then(data => {
      this.setState({
        background: data
      })
      .catch(err => console.error(err));
    });
  }

  render() {

    return (
      <View>
        <Pano source={{uri: this.state.background}}/>
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('react_vr_demo', () => react_vr_demo);
