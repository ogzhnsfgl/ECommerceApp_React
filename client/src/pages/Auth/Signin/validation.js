import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email girin!")
    .required("Zorunlu alan!"),
  password: yup
    .string()
    .min(5, "Parolanız en az 5 karakterden oluşmalıdır!")
    .required(),
});

export default validationSchema;
