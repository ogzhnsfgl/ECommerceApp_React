import React from "react";
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import { useQuery } from "react-query";
import {
  Flex,
  Spinner,
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
import validationSchema from "./validations";

import { message } from "antd";

const ProductDetail = () => {
  const { product_id } = useParams();
  const { isLoading, error, data } = useQuery(
    ["admin-product", product_id],
    () => fetchProduct(product_id)
  );
  if (isLoading)
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="4px"
          speed=".65s"
          emptyColor="gray.200"
          size="xl"
          color="pink.500"
        ></Spinner>
      </Flex>
    );

  if (error) return "An error has occurred: " + error.message;

  const handleSubmit = async (values, bag) => {
    message.loading({
      content: "Loading...",
      key: "product_update",
      duration: 2,
    });

    try {
      await updateProduct(values, product_id);
      message.success({
        content: "Product updated successfully!",
        key: "product_update",
        duration: 2,
      });
    } catch (error) {
      console.log(error);
      message.error({
        content: "An error occured!",
        key: "product_update",
        duration: 2,
      });
    }
  };

  console.log(data);
  return (
    <Flex
      justifyContent="center"
      alignContent="center"
      flexDirection="column"
      width="100%"
      textAlign="center"
    >
      <Text fontSize="22">
        Product Detail <small> id: {data._id}</small>
      </Text>

      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
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
            <Box>
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
                    Update Product
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Flex>
  );
};

export default ProductDetail;
