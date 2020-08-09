import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(8),
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(6),
    marginTop: theme.spacing(8),
  },
  buttons: {
    marginTop: theme.spacing(6),
  },
  forgotPassword: {
    marginTop: theme.spacing(4),
  },
}));

export default useStyle;
