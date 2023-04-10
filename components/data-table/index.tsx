import React from "react";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Styles from "./index.module.scss";

interface IDataTable {
  headers: Array<string | React.ReactNode>;
  children: React.ReactNode;
  dataArrayLength: number;
}

export default function DataTable({
  headers,
  children,
  dataArrayLength,
}: IDataTable) {
  return (
    <div className={Styles.Container}>
      <TableContainer className={Styles.dataGridTable}>
        <Table variant="simple" className={Styles.table}>
          <Thead>
            <Tr>
              {headers.map(
                (header: string | React.ReactNode, index: number) => (
                  <Th key={index} borderRight="1px solid #ebebeb">
                    <Text
                      width="max-content"
                      fontWeight="700"
                      fontFamily="heading"
                      fontSize="14px"
                      color="primary.500"
                      py="10px"
                    >
                      {header}
                    </Text>
                  </Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody>
            {dataArrayLength == 0 ? (
              <Tr key="no-data">
                <Td colSpan={headers.length}>
                  <Box p={4}>
                    <Text color="gray.400" textAlign="center">
                      No record found....
                    </Text>
                  </Box>
                </Td>
              </Tr>
            ) : (
              children
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
