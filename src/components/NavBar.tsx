import { Box, Button, Flex, Heading, Text, Spacer } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Button colorScheme="teal" mr={2}>
            login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button colorScheme="teal">register</Button>
        </NextLink>
      </>
    );

    // user is logged in
  } else {
    body = (
      <Flex>
        <Box mt="2" mr={3}>
          <Text fontSize="md">{data.me.username}</Text>
        </Box>
        <Button colorScheme="teal">logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tan" p={3} ml={"auto"}>
      <Box p="2">
        <Heading size="md">My App</Heading>
      </Box>
      <Spacer />
      <Box>{body}</Box>
    </Flex>
  );
};
