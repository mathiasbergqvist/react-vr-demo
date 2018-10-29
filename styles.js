import { StyleSheet } from "react-vr";

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

export default styles;
