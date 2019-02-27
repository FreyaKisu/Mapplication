import React from "react";
import { MapView } from "expo";
import { TextInput, View, StyleSheet, Button, Text } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        lat: 60.200692,
        lng: 24.934302
      },
      searchLocation: " ",
      marker: {
        latitude: 60.200692,
        longitude: 24.934302
      }
    };
  }

  fetchLocation = () => {
    const url = `http://open.mapquestapi.com/geocoding/v1/address?key=LLWa6DrHLGfpKmB8JHNqrq0lQAV2Gid8&location=${
      this.state.searchLocation
    }`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          region: responseJson.results[0].locations[0].latLng
        });
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.region.lat,
            longitude: this.state.region.lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0322
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.region.lat,
              longitude: this.state.region.lng
            }}
          />
        </MapView>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={searchLocation => this.setState({ searchLocation })}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            style={styles.button}
            onPress={() => {
              this.fetchLocation();
            }}
            title="Search"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  inputView: {
    backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    bottom: 50,
    left: 5,
    right: 5
  },

  buttonView: {
    borderRadius: 0.3,
    position: "absolute",
    bottom: 10
  },
  button: {
    borderRadius: 10
  },

  input: {
    height: 40,
    padding: 5,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#48BBEC",
    backgroundColor: "white",
    opacity: 0.7
  }
});
