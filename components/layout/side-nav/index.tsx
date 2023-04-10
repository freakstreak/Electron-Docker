import menu from "@/config/menu";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SideNav = () => {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    setActiveRoute(router?.route);
  }, [router?.route]);

  return (
    <Box bg="#F5F5F5" width={220} position="sticky">
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
      <Link href={to}>
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
          {/* <Flex px={10} justifyContent="space-between">
            <Text mr={16} fontSize="20" height={10}>
              <Box />
              <Icon
                style={{
                  margin: 0,
                }}
              />
            </Text>
            <Text flex={1} color="#3D3C42" fontSize="20">
              {name}
            </Text>
          </Flex> */}
        </Box>
      </Link>
    </>
  );
};

export default SideNav;
