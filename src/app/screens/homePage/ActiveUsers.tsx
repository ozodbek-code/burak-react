
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider } from "@mui/joy/styles";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR */

const topUsersRetriever = createSelector(
   retrieveTopUsers,
   (topUsers) => ({ topUsers })
);

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member) => {
                 const imagePath = `${serverApi}/${member.memberImage}`
                return (
                  <Card
                    key={member._id}
                    variant="outlined"
                    className="card"
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img
                          src={member.memberImage}
                          alt={member.memberNick}
                        />
                      </AspectRatio>
                    </CardOverflow>

                    <Typography className="member-nickname">
                      {member.memberNick}
                    </Typography>
                  </Card>
                );
              })
              ) : (
                <Box className="no-data">
                  No Active Users!
                </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
