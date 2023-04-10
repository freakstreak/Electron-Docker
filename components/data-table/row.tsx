import React from "react";
import { Td, Tr } from "@chakra-ui/react";

interface IDataRow {
  data: Array<string | React.ReactNode>;
}

export default function DataTableRow({ data }: IDataRow) {
  return (
    <Tr>
      {data.map((res: string | React.ReactNode, index: number) => (
        <Td
          key={index}
          style={{ fontSize: "14px" }}
          borderRight="1px solid #ebebeb"
        >
          {res}
        </Td>
      ))}
    </Tr>
  );
}
