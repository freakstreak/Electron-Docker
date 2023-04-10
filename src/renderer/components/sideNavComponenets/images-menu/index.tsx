import React, { useEffect, useState } from "react";
import "../index.css";
import {
  Box,
  Checkbox,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import data from "../../../config/data.json";
import { BsFillPlayFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { DangerButtton } from "../../buttons";
import { VscListSelection } from "react-icons/vsc";

const ImagesMenu = () => {
  const [images, setImages] = useState<any[]>([]);
  const [parentCheckBox, setParentCheckbox] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Fetching the images
  useEffect(() => {
    let fetchedImages = data.images;
    fetchedImages = fetchedImages.map((image: any) => {
      image.checked = false;
      return image;
    });
    setImages(fetchedImages);
  }, []);

  // Toggling the checkboxes and the delete button
  useEffect(() => {
    let checked = images.filter((image: any) => image.checked);
    if (checked.length > 0) {
      setShowDelete(true);

      if (checked.length !== images.length) {
        setParentCheckbox(false);
      }

      if (checked.length === images.length) {
        setParentCheckbox(true);
      }
    } else {
      setShowDelete(false);
      setParentCheckbox(false);
    }
  }, [images]);

  return (
    <Box>
      <Text fontSize="xl">Images</Text>
      <Text fontSize="xs" py={2}>
        An image is a read-only template with instructions for creating a Docker
        container.
      </Text>

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
          <Box fontSize="25px" as={VscListSelection} mx={8} />
          <Box fontSize="25px" as={BsThreeDotsVertical} />
        </Flex>
      </Flex>

      <Box overflow="auto" minHeight="300px" maxHeight="500px">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr className="tableHead">
                <Th>
                  <Checkbox
                    isChecked={parentCheckBox}
                    onChange={(e) => {
                      setParentCheckbox(e.target.checked);
                      setImages((prev: any) => {
                        prev = prev.map((prev: any) => {
                          prev.checked = e.target.checked;
                          return prev;
                        });
                        return prev;
                      });
                    }}
                  />
                </Th>
                <Th>Name</Th>
                <Th>Tag</Th>
                <Th>Status</Th>
                <Th>Created</Th>
                <Th>Size</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {images.map((image: any) => {
                return (
                  <Tr key={image._id}>
                    <Td>
                      <Checkbox
                        isChecked={image.checked}
                        onChange={(e) => {
                          setImages((prev: any) => {
                            prev = prev.map((prev: any) => {
                              if (prev._id === image._id) {
                                prev.checked = e.target.checked;
                              }
                              return prev;
                            });
                            return prev;
                          });
                        }}
                      />
                    </Td>
                    <Td>{image.name}</Td>
                    <Td>{image.tag}</Td>
                    <Td>{image.status}</Td>
                    <Td>{image.created}</Td>
                    <Td>{image.size}</Td>
                    <Td>
                      <Flex>
                        <Box fontSize="20px" as={BsFillPlayFill} mr={3} />
                        <Box
                          fontSize="20px"
                          as={BsThreeDotsVertical}
                          mr={3}
                          pr={2}
                        />
                        <Box
                          fontSize="24px"
                          as={MdDelete}
                          mr={3}
                          pr={2}
                          pb={1}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ImagesMenu;
