import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import userStyle from "./styles";

function AppLoading() {
  const classes = userStyle();
  return (
    <Container maxWidth="xs">
      <div className={classes.loadingBox}>
        <Typography className={classes.title} variant="h6" component="h2">
          Mohon Bersabar ini ujian 99%
        </Typography>
        <LinearProgress />
      </div>
    </Container>
  );
}
export default AppLoading;
