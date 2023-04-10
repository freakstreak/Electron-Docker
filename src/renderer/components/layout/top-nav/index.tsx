import { Box, Text } from "@chakra-ui/react";
import React from "react";

const TopNav = () => {
  return (
    <Box
      bg="#0D9488"
      p={1}
      textAlign="center"
      userSelect="none"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Text fontSize={16} my={0} color="#ffffff">
        Electron Docker
      </Text>
    </Box>
  );
};

export default TopNav;
