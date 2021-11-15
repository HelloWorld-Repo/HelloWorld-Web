import React, { Fragment } from "react";
import {
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const Home = () => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();

  const gridParams = {
    xs: 12,
    sm: 4,
    md: 3,
    item: true,
  };
  const gridContainerParams = {
    display: "flex",
    spacing: theme.spacing(2),
    flexDirection: "row",
    container: true,
    padding: theme.spacing(2, 0),
  };

  const content = [
    {
      title: "Usuários",
      id: 1,
      content: [
        { title: "Turmas", link: "/class", id: 1 },
        { title: "Usuários", link: "/user", id: 2 },
      ],
    },
    {
      title: "Jornada",
      id: 2,
      content: [
        { title: "Módulos", link: "/module", id: 1 },
        { title: "Capítulos", link: "/chapter", id: 2 },
        { title: "Questões", link: "/question", id: 3 },
      ],
    },
    {
      title: "Resultados",
      id: 3,
      content: [{ title: "Análise de Dados", link: "/analytic", id: 1 }],
    },
  ];

  return (
    <Box p={theme.spacing(5)}>
      {content.map((module) => (
        <Fragment key={module.id}>
          <Box backgroundColor={theme.palette.grey[200]}>
            <Typography
              variant="h2"
              fontFamily="Text Me One"
              fontSize={18}
              fontWeight="bold"
              padding={theme.spacing(2)}
            >
              {module.title.toUpperCase()}
            </Typography>
          </Box>
          <Grid container {...gridContainerParams}>
            {module.content.map((item) => (
              <Grid {...gridParams} key={item.id}>
                <Card>
                  <ButtonBase
                    onClick={() => navigate(item.link)}
                    className={classes.buttonBase}
                  >
                    <CardContent>
                      <Typography textAlign="center">{item.title}</Typography>
                    </CardContent>
                  </ButtonBase>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Fragment>
      ))}
    </Box>
  );
};

export default Home;
