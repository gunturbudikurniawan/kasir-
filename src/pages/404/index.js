import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import useStyles from "./styles";
export default function NotFound() {
  const styling = useStyles();
  return (
    <Container maxWidth="xs">
      <Paper className={styling.paper}>
        <Typography variant="subtitle1">Halaman Tidak ditemukan</Typography>
        <Typography variant="h3">404</Typography>
        <Typography component={Link} to="/">
          Kembali ke Beranda
        </Typography>
      </Paper>
    </Container>
  );
}
