import React, { Fragment } from "react";
import { ButtonBase, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();

  useTitle("Dashboard");

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
        { title: "Turmas", link: "/classes", id: 1 },
        { title: "Usuários", link: "/users", id: 2 },
      ],
    },
    {
      title: "Jornada",
      id: 2,
      content: [
        { title: "Módulos", link: "/modules", id: 1 },
        { title: "Capítulos", link: "/chapters", id: 2 },
        { title: "Questões", link: "/questions", id: 3 },
      ],
    },
    {
      title: "Resultados",
      id: 3,
      content: [{ title: "Resumo e Feedbacks", link: "/analytic", id: 1 }],
    },
  ];

  return (
    <Box p={theme.spacing(5)}>
      <Typography
        variant="h1"
        fontFamily="Londrina Solid"
        color={theme.palette.secondary.contrastText}
        textAlign="center"
        fontSize={60}
        marginTop={0}
      >
        HelloWorld
      </Typography>
      {content.map((module) => (
        <Fragment key={module.id}>
          <Box>
            <Typography
              variant="h2"
              fontFamily="Text Me One"
              fontSize={18}
              fontWeight="bold"
              padding={theme.spacing(2)}
              borderBottom="solid 3px #ddd;"
              margin={theme.spacing(4, 0, 0, 0)}
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
