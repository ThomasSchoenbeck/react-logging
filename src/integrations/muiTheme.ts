import { createTheme } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"]
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    white?: PaletteOptions["primary"]
  }
}

export const palette = {
  primary: "#ffa500",
  // secondary: "#F7F7F7",
  secondary: "#6F909F",
  warning: "#FF3300",
  background: "#282c34",
  action: "#00979E",
  disabledBg: "#CBCFD2",
  disabledFg: "#788C94",
  inputsBorder: "#CBCFD2",
  iconButtonFg: "#788C94",
  tableHeaderBg: "#CBCFD2",
}

const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
    },
    secondary: {
      main: palette.secondary,
    },
    error: {
      main: palette.warning,
    },
    background: {
      default: palette.background,
    },
    white: {
      main: "#ffffff",
    },
  },
  typography: {
    // fontFamily: "ARSMaquette",
    h1: {
      fontSize: "10rem",
    },
    h2: {
      fontSize: "6rem",
    },
    h6: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.sideNavButton": {
            padding: "16px",
            borderRadius: "10px",
            backgroundColor: "#181a1f",
            "&:hover": {
              backgroundColor: palette.background,
            },
            "&.Mui-selected": {
              backgroundColor: "#ffa500cc", //rgba(255,165,0,0.8)
            },
            // child element
            "& .MuiSvgIcon-root": {
              background: "#181a1f",
              color: "white",
              padding: "5px",
              borderRadius: "10px",
              boxSizing: "content-box",
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(255,165,0,0.3)",
          },
          "&.Mui-selected": {
            backgroundColor: "#ffa500cc", //rgba(255,165,0,0.8)
            "&:hover": {
              backgroundColor: "rgba(255,165,0,0.3)",
            },
          },
        },
      },
    },
  },
})

export default theme
