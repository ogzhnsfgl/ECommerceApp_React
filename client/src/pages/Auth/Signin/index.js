import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";

import { useFormik } from "formik";

import validationSchema from "./validation";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../context/AuthContext";

const SignIn = ({ history }) => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        console.log(loginResponse);
        login(loginResponse);
        history.push("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex
        align="center"
        width="full"
        justifyContent="center"
        flexDirection="column"
      >
        <Box pt={10}>
          <Heading>Sign In</Heading>
        </Box>

        <Box my={5}>
          {formik.errors.general && (
            <Alert status="error">{formik.errors.general}</Alert>
          )}
        </Box>

        <Box my={5} textAlign="left">
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && formik.errors.email}
              ></Input>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={formik.touched.password && formik.errors.password}
              ></Input>
            </FormControl>

            <Button mt="4" width="full" type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Flex>
    </div>
  );
};

export default SignIn;
