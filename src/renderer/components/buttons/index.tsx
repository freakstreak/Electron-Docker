import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";

const DangerButtton = () => {
  return (
    <Button colorScheme="red" py={1} height={8}>
      <Text fontSize={12} pr={2}>
        Delete
      </Text>
      <MdDelete />
    </Button>
  );
};

export { DangerButtton };
