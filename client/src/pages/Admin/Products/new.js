import React from "react";
import {
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Badge,
} from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import validationSchema from "./validation";
import { postProduct } from "../../../api";
import { useMutation, useQueryClient } from "react-query";

import { message } from "antd";

const NewProduct = ({ history }) => {
  const queryClient = useQueryClient();

  const newProductMutation = useMutation(postProduct, {
    onSuccess: async () =>
      await queryClient.invalidateQueries("products", {
        refetchActive: true,
        refetchInactive: true,
      }),
  });

  const handleSubmit = async (values, bag) => {
    console.log(values);
    message.loading({ content: "Loading...", key: "new_product" });

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };
    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        message.success({
          content: "Product added successfully!...",
          key: "new_product",
        });
        history.push("/");
      },
    });
  };

  return (
    <Flex
      justifyContent="center"
      alignContent="center"
      flexDirection="column"
      width="100%"
      textAlign="center"
    >
      <Text fontSize="22">Add New Product</Text>

      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box my="5" textAlign="left">
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    disabled={isSubmitting}
                    isInvalid={touched.title && errors.title}
                    width="2xl"
                    display="block"
                  ></Input>
                  {touched.title && errors.title && (
                    <Badge colorScheme="red">{errors.title}</Badge>
                  )}
                </FormControl>
                <FormControl mt="3">
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    disabled={isSubmitting}
                    rows="5"
                    isInvalid={touched.description && errors.description}
                  ></Textarea>
                  {touched.description && errors.description && (
                    <Badge colorScheme="red">{errors.description}</Badge>
                  )}
                </FormControl>
                <FormControl mt="3">
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    disabled={isSubmitting}
                    isInvalid={touched.price && errors.price}
                  ></Input>
                  {touched.price && errors.price && (
                    <Badge colorScheme="red">{errors.price}</Badge>
                  )}
                </FormControl>
                <FormControl mt="3">
                  <FormLabel>Photos</FormLabel>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <div>
                        {values.photos &&
                          values.photos.map((photo, index) => (
                            <div key={index}>
                              <Input
                                mt="2"
                                name={`photos.${index}`}
                                value={photo}
                                disabled={isSubmitting}
                                onChange={handleChange}
                                width="2xl"
                              />
                              <Button
                                size="xs"
                                colorScheme="red"
                                ml="3"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                X
                              </Button>
                            </div>
                          ))}
                        <Button mt="5" onClick={() => arrayHelpers.push("")}>
                          Add a photo
                        </Button>
                      </div>
                    )}
                  ></FieldArray>
                </FormControl>
                <Button
                  mt="4"
                  width="full"
                  colorScheme="orange"
                  variant="outline"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
              </form>
            </Box>
          </>
        )}
      </Formik>
    </Flex>
  );
};

export default NewProduct;
