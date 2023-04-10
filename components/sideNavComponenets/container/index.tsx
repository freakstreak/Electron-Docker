import React, { useState, useEffect } from 'react';
import { Box, Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react'
import ServiceContainer from "./ServiceContainer";

const MainContainer = () => {
  const [jsonData, setJsonData] = useState<any>({});

  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => setJsonData(data))
  }, []);
  return (
    <Box>
      <Text fontSize={"xl"} fontWeight={'bold'}>Containers</Text>
      <Text fontSize='xs'>A container packages up code and its dependencies so the application runs quickly and reliably from one computing environment to another.</Text>

      <TableContainer mt={20}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Image</Th>
              <Th>Status</Th>
              <Th>Port(s)</Th>
              <Th>Started</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              jsonData.projects?.map((project: any) => (
                <ServiceContainer key={project._id} project={project} />
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MainContainer;
