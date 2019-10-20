
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme?: Theme) =>
    createStyles({
        paginator: {
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            marginTop: "1rem"
        }
    }),
);

export default useStyles;
