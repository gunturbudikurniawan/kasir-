import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import useStyle from "./styles";
import { Link, Redirect } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { useFirebase } from "../../components/FirebaseProvider";
import AppLoading from "../../components/AppLoading";

function Registrasi() {
  const classes = useStyle();
  const [isSubmiting, setSubmiting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const { auth, user, loading } = useFirebase();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newError = { ...error };
    if (!form.email) {
      newError.email = "Email is empty";
    } else if (!isEmail(form.email)) {
      newError.email = "Emait no valid";
    }

    if (!form.password) {
      newError.password = "Password is empty";
    }
    if (!form.password2) {
      newError.password2 = "Confirm Password is empty";
    } else if (form.password2 !== form.password) {
      newError.password2 = "Confirm Password no matching your password";
    }
    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const findErrors = validate();

    if (Object.values(findErrors).some((err) => err !== "")) {
      setError(findErrors);
    } else {
      try {
        setSubmiting(true);
        await auth.createUserWithEmailAndPassword(form.email, form.password);
      } catch (e) {
        const newError = {};
        switch (e.code) {
          case "auth/email-already-in-use":
            newError.email = "Email already to use";
            break;
          case "auth/invalid-email":
            newError.email = "Email no valid";
            break;
          case "auth/weak-password":
            newError.password = "Password so weak";
            break;
          case "auth/operation-not-allowed":
            newError.email = "Method email and password not supported";
            break;
          default:
            newError.email = "An error occurred, please try again";
            break;
        }
        setError(newError);
        setSubmiting(false);
      }
    }
  };

  if (loading) {
    return <AppLoading />;
  }
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h1" className={classes.title}>
          Halaman Registrasi
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              id="email"
              name="email"
              type="email"
              margin="normal"
              label="Email Address"
              fullWidth
              required
              value={form.email}
              onChange={handleChange}
              helperText={error.email}
              error={error.email ? true : false}
              disabled={isSubmiting}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              margin="normal"
              label="Password"
              fullWidth
              required
              value={form.password}
              onChange={handleChange}
              helperText={error.password}
              error={error.password ? true : false}
              disabled={isSubmiting}
            />
            <TextField
              id="password2"
              name="password2"
              type="password"
              margin="normal"
              label="Comfirm Password"
              fullWidth
              required
              value={form.password2}
              onChange={handleChange}
              helperText={error.password2}
              error={error.password2 ? true : false}
              disabled={isSubmiting}
            />
            <Grid container className={classes.buttons}>
              <Grid item xs>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Register
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  size="large"
                  variant="contained"
                  // color="primary"
                  to="/login"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Registrasi;
