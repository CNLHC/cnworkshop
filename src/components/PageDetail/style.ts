
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageContent: {
        },
        returnButton: {
            position: 'fixed',
            bottom: '3em',
            marginLeft: '15px',
            color: 'white',
            "a": {
                textDecoration: 'none',
            },
            "a:visited": {
                color: 'white',
            }
        },
        content: {
            color: theme.palette.text.primary
        },
        toc: {

            borderLeft: '1px solid #ebedf0',
            marginLeft: '15px',
            position: 'fixed',
            color: '#FFF',
            textDecoration: 'none',
            ul: {
                listStyle: 'none',
                lineHeight: '1',
            }
        }

    }),
);

export default useStyles;


