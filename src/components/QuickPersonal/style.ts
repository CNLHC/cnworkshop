import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((_theme?: Theme) =>
    createStyles({
        avatar: {
            padding: "2rem 0",
        },
        imgContainer: {
            width: "5.5rem",
            height: "5.5rem",
            borderRadius: "10rem",
            overflow: "hidden",
            margin: "0 auto",
        }
    }),
);

export default useStyles;
