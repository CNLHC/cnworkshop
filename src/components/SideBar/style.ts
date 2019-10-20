import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const drawerWidth = 200;
const useStyles = makeStyles((theme?: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            background: theme.palette.grey[800]
        },
        navMenu: {
            color: theme.palette.text.primary,
        },
        navItem: {
            textAlign: 'center',
            '& :hover': {
                color: theme.palette.primary[400]
            }
        }

    }),
);

export default useStyles;
