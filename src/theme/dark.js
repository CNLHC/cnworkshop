import createMuiTheme, { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

const Dark = {
    palette: {
        text: {
            primary: "rgba(255,255,255,1)",
            secondary: "rgba(255, 255, 255, 0.7)",
            disabled: "rgba(255, 255, 255, 0.5)",
            hint: "rgba(255, 255, 255, 0.5)",
            icon: "rgba(255, 255, 255, 0.5)",
        },
        primary: {
            50: "#fcfaff",
            100: "#f6edfa",
            200: "#f1defa",
            300: "#d9bae8",
            400: "#b17acc",
            500: "#8a4baf",
            600: "#663399",
            700: "#542c85",
            800: "#452475",
            900: "#362066",
        },
        background: {
            paper: "#424242",
            default: "#303030"
        }



    }




}
export default createMuiTheme(Dark)
