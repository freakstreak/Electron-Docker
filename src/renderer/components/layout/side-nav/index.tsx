import menu from "../../../config/menu";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const SideNav = () => {
  const { pathname } = useLocation();
  const [activeRoute, setActiveRoute] = useState<any>("");

  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  return (
    <Box bg="#F5F5F5" width={220} position="sticky" pt={4}>
      {menu.map((item, index) => {
        return (
          <div key={index + item.name}>
            <MenuItems
              filledIcon={item.filledIcon}
              Icon={item.icon}
              name={item.name}
              to={item.to}
              activeRoute={activeRoute}
            />
          </div>
        );
      })}
    </Box>
  );
};

interface Props {
  name: string;
  filledIcon: any;
  Icon: any;
  to: string;
  activeRoute: string;
}

const MenuItems = ({ name, filledIcon, Icon, to, activeRoute }: Props) => {
  const isRouteActive = () => {
    return activeRoute === to ? true : false;
  };

  return (
    <>
      <Link to={to}>
        <Box height="min-content">
          <Flex
            px={4}
            py={3}
            borderRadius="6px"
            align="center"
            cursor="pointer"
            fontWeight={isRouteActive() ? 600 : 400}
            _hover={{ background: "primary.100" }}
          >
            <Box
              fontSize="20px"
              as={false ? filledIcon : Icon}
              mr={3}
              color={isRouteActive() ? "primary.500" : "text.regular"}
            />
            <Text
              flex={1}
              color={isRouteActive() ? "primary.500" : "text.regular"}
              fontSize={"sm"}
            >
              {name}
            </Text>
          </Flex>
        </Box>
      </Link>
    </>
  );
};

export default SideNav;
