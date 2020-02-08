import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            background: theme.palette.grey[800],
        },
        CardContent: {
            padding: "1rem"
        },
        CardActionArea: {
            display: "flex",
            justifyContent: "space-between",
            "@media (max-width: 600px)": {
                display: "none"
            },
        },
        ActionItem: {
            display: "flex",
            alignItems: "center"
        }
    }),
);

export default useStyles;


