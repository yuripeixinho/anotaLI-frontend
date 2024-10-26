import * as Yup from "yup";

export const cadastroValidationSchema = Yup.object().shape({
  perfilConta: Yup.object().shape({
    nome: Yup.string().required("O nome é obrigatório"),
  }),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(
      /[@$!%*?&#]/,
      "A senha deve conter pelo menos um caractere especial"
    )
    .matches(/^\S*$/, "A senha não deve conter espaços em branco")
    .required("A senha é obrigatória"),
});
