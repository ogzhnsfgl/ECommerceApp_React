import React from "react";
import {
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="400px"
      >
        <AlertIcon boxSize="80px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          404! Page Not Found!
        </AlertTitle>
        <AlertDescription maxWidth="sm" mt={4}>
          <Button colorScheme="red">
            <Link to="/">Back to Home</Link>
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Error404;
