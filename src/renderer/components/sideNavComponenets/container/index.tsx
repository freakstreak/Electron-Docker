import React, { useState, useEffect } from "react";
import { Box, Button, Checkbox, Flex, Input, Td, Text } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { DangerButtton } from "../../../components/buttons";
import { AiOutlineSearch } from "react-icons/ai";
import { BsThreeDotsVertical, BsFillStopFill } from "react-icons/bs";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { SiLinuxcontainers } from "react-icons/si";
import data from "../../../config/data.json";

const MainContainer = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [parentCheckBox, setParentCheckbox] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [qemuArg, setQemuArg] = useState("");

  useEffect(() => {
    const fetchedProjects = data.projects.map((project: any) => {
      project.checked = false;
      if (project.containers.length) {
        project.hasContainer = true;
        project.isCollapsed = false;
        project.containers = project.containers.map((container: any) => {
          container.checked = false;
          return container;
        });
      }
      return project;
    });
    setProjects(fetchedProjects);
    return;
  }, []);

  useEffect(() => {
    let checked = projects.filter((project: any) => project.checked);
    if (checked.length > 0) {
      setShowDelete(true);

      if (checked.length !== projects.length) {
        setParentCheckbox(false);
      }

      if (checked.length === projects.length) {
        setParentCheckbox(true);
      }
    } else {
      setShowDelete(false);
      setParentCheckbox(false);
    }
  }, [projects]);

  const getQemuLogs = () => {
    window.electron.ipcRenderer.once("qemu-trigger", (arg: any) => {
      setQemuArg(arg);
    });
    window.electron.ipcRenderer.sendMessage("qemu-trigger", ["ping"]);
  };

  const getQemuLogsProduction = () => {
    window.electron.ipcRenderer.on("qemu-logs", (arg: any) => {
      console.log(arg);
      window.alert(arg);
    });
    window.electron.ipcRenderer.sendMessage("qemu-logs", ["ping"]);
  };

  return (
    <Box>
      <Text fontSize={20}>Containers</Text>
      <Text fontSize="xs" py={2}>
        A container packages up code and its dependencies so the application
        runs quickly and reliably from one computing environment to another.
      </Text>
      {qemuArg && <Text>{qemuArg}</Text>}

      <Button
        onClick={() => {
          getQemuLogs();
        }}
      >
        Click Me
      </Button>

      <Button
        onClick={() => {
          getQemuLogsProduction();
        }}
      >
        Production
      </Button>

      <Flex my={8} justifyContent="space-between">
        <Box visibility={showDelete ? "visible" : "hidden"}>
          <DangerButtton />
        </Box>

        <Flex justifyContent="space-evenly" alignItems="center">
          <Flex
            border="1px solid #AEAEAE"
            borderRadius={4}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Box fontSize="25px" as={AiOutlineSearch} mx={2} />
            <Input
              placeholder="Search"
              height={8}
              border="none"
              focusBorderColor="transparent"
            />
          </Flex>
          <Box fontSize="25px" as={BsThreeDotsVertical} ml={4} />
        </Flex>
      </Flex>

      <TableContainer mt={20}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th pr={0}>
                <Checkbox
                  isChecked={parentCheckBox}
                  onChange={(e) => {
                    setParentCheckbox(e.target.checked);
                    setProjects((prev: any) => {
                      prev = prev.map((prev: any) => {
                        prev.checked = e.target.checked;
                        return prev;
                      });
                      return prev;
                    });
                  }}
                />
              </Th>
              <Th px={0}></Th>
              <Th pl={0} width={40}>
                Name
              </Th>
              <Th width={40}>Image</Th>
              <Th>Status</Th>
              <Th>Port(s)</Th>
              <Th>Started</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project: any) => {
              return (
                <>
                  <Tr key={project._id}>
                    <Td pr={0}>
                      <Checkbox
                        isChecked={project.checked}
                        onChange={(e) => {
                          setProjects((prev: any) => {
                            prev = prev.map((prev: any) => {
                              if (prev._id === project._id) {
                                prev.checked = e.target.checked;
                              }
                              return prev;
                            });
                            return prev;
                          });
                        }}
                      />
                    </Td>
                    <Td px={0}>
                      <Flex alignItems="center">
                        <Box
                          fontSize="16px"
                          as={
                            project.isCollapsed
                              ? MdKeyboardArrowDown
                              : MdKeyboardArrowRight
                          }
                          cursor="pointer"
                          onClick={() => {
                            setProjects((prev: any) => {
                              prev = prev.map((prev: any) => {
                                if (prev._id === project._id) {
                                  prev.isCollapsed = !prev.isCollapsed;
                                }
                                return prev;
                              });
                              return prev;
                            });
                          }}
                        ></Box>
                        <Box fontSize="20px" as={SiLinuxcontainers} />
                      </Flex>
                    </Td>
                    <Td pl={0}>{project.name}</Td>
                    <Td>-</Td>
                    <Td>Running(2/3)</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>
                      <Flex>
                        <Box fontSize="20px" as={BsFillStopFill} mr={3} />
                        <Box fontSize="20px" as={BsThreeDotsVertical} mr={2} />
                        <Box fontSize="20px" as={RxDividerVertical} mr={2} />

                        <Box
                          fontSize="25px"
                          as={MdDelete}
                          mr={3}
                          pr={2}
                          pb={1}
                          ml={2}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                  {project.hasContainer &&
                    project.isCollapsed &&
                    project.containers.map((container: any) => {
                      return (
                        <Tr key={container._id}>
                          <Td pr={0}>
                            <Checkbox />
                          </Td>
                          <Td px={0}>
                            <Flex>
                              <Box fontSize="16px" px={2}></Box>
                              <Box fontSize="20px" as={SiLinuxcontainers} />
                            </Flex>
                          </Td>
                          <Td pl={0} textDecoration="none">
                            {container.name}
                          </Td>
                          <Td>{container.image}</Td>
                          <Td>{container.status}</Td>
                          <Td>{container.ports}</Td>
                          <Td>{container.started}</Td>
                          <Td>
                            <Flex>
                              <Box fontSize="20px" as={BsFillStopFill} mr={3} />
                              <Box
                                fontSize="20px"
                                as={BsThreeDotsVertical}
                                mr={2}
                              />
                              <Box
                                fontSize="20px"
                                as={RxDividerVertical}
                                mr={2}
                              />

                              <Box
                                fontSize="25px"
                                as={MdDelete}
                                mr={3}
                                pr={2}
                                pb={1}
                                ml={2}
                              />
                            </Flex>
                          </Td>
                        </Tr>
                      );
                    })}
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MainContainer;
