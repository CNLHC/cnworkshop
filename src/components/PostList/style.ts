import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        CardContainer: {
            display:"flex",
            flexDirection:"column",
        },
        CardWrapper:{
            marginTop: "2rem",
        }
    }),
);

export default useStyles;


