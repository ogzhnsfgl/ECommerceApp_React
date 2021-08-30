import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../context/AuthContext";

function Profile({ history }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout(() => {
      history.push("/");
    });
  };

  return (
    <div>
      <Box>
        <Heading>Profile</Heading>
      </Box>

      <Box mt={2}>
        <Text color="gray.500" isTruncated fontSize="2xl">
          Kullanıcı ID: <span>{user._id}</span>
        </Text>
      </Box>
      <Box mt={2}>
        <Text color="blackAlpha.2000" isTruncated fontSize="2xl">
          Kullanıcı türü: <span>{user.role}</span>
        </Text>
      </Box>
      <Box mt={2}>
        <Text color="blackAlpha.2000" isTruncated fontSize="2xl">
          Email <span>{user.email}</span>
        </Text>
      </Box>
      <Button
        onClick={handleLogout}
        colorScheme="pink"
        variant="outline"
        mt={3}
      >
        Logout
      </Button>
    </div>
  );
}

export default Profile;
