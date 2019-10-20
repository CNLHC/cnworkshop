import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            background: theme.palette.grey[800],
        },
        CardContent: {
            padding: "1rem"
        }
    }),
);

export default useStyles;


