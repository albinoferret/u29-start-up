import { StyleSheet } from 'react-native';

export function generateStyles(theme) {
  return StyleSheet.create({
    menu: {
      height: 500,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    menuRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: 'center'
    },
    menuColumn: {
      flexBasis: "33%",
      justifyContent: 'space-between',
      alignItems: "center",
      height: 100,
    },
    menuIcon: {
      fontSize: 60,
      color: theme.BODY_ICON_COLOR
    },
    menuText: {
      fontSize: 18,
    },
    menuIconInvalid: {
      fontSize: 60,
      color: '#BFBFBF'
    },
    menuTextInvalid: {
      fontSize: 18,
      color: '#BFBFBF'
    },
  })
}