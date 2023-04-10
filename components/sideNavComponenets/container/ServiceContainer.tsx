import React from 'react';
import {
  Tr,
  Td,
} from '@chakra-ui/react'

const ServiceContainer = (props: any) => {
  return (
    <>
      <Tr>
        <Td>📦 {props.project.name}</Td>
        <Td>-</Td>
        <Td>Running(2/3)</Td>
        <Td></Td>
        <Td></Td>
        <Td>▶️</Td>
      </Tr>
      <Container containers={props.project.containers} />
    </>
  )
}

const Container = (props: any) => {
  return (
    <>
      {props.containers.map((container: any) => (
        <Tr key={container._id}>
          <Td>📂 {container.name}</Td>
          <Td>{container.image}</Td>
          <Td>{container.status}</Td>
          <Td>{container.ports}</Td>
          <Td>{container.started}</Td>
          <Td>▶️</Td>
        </Tr>
      ))}
    </>
  )
}

export default ServiceContainer
