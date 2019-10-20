
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        BlogPaginator: {
            color: theme.palette.text.primary,
            display: "flex",
            justifyContent: "flex-between",
            alignItems: "center"
        },

        NumArrayArea: {
            display: "flex",
            justifyContent: "flex-around",
            color: theme.palette.text.primary,
            margin : "0 1rem"


        },
        PaginatorArray: {

            color: theme.palette.text.primary
        },
        PaginatorNumber: {
            color: theme.palette.text.primary

        },

        QuickJumperArea: {
            color: theme.palette.text.primary
        },
        QuickJumperInput: {
            background: theme.palette.grey[800],
            minWidth: '2rem',
            maxWidth: '4rem',
            marginRight: '1rem'
        }





    }),
);

export default useStyles;


