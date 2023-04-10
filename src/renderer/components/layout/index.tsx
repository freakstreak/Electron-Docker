import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import SideNav from "./side-nav";
import TopNav from "./top-nav";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <Box height="100vh" overflow="hidden">
        <TopNav />
        <Flex height="100%">
          <SideNav />
          <Box p={5} flexGrow={1} overflowY={"scroll"} marginBottom={5}>
            {props?.children}
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default Layout;
