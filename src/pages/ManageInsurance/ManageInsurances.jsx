import { useNavigate, useParams } from "react-router-dom";
import { AddNewsContainer } from "./ManageInsurancesStyled";
import { newsSchema } from "../../schemas/newsSchema";
import {
  createNews,
  deleteNews,
  editNews,
  getNewsById,
} from "../../services/postsServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useEffect } from "react";

export function ManageInsurances() {
  const { action, id } = useParams();
  const navigate = useNavigate();

  const {
    register: registerNews,
    handleSubmit: handleRegisterNews,
    formState: { errors: errorsRegisterNews },
    setValue,
  } = useForm({ resolver: zodResolver(newsSchema) });

  async function registerNewsSubmit(data) {
    try {
      await createNews(data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function editNewsSubmit(data) {
    try {
      await editNews(data, id);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function findNewsById(id) {
    try {
      const { data } = await getNewsById(id);
      setValue("title", data.title);
      setValue("banner", data.banner);
      setValue("text", data.text);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNewsSubmit() {
    try {
      await deleteNews(id);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (action === "edit" || action === "delete") {
      findNewsById(id);
    }
  }, []);

  return (
    <AddNewsContainer>
      <h2>
        {action === "add"
          ? "Adicionar"
          : action === "edit"
          ? "Atualizar"
          : "Apagar"}{" "}
        Seguro
      </h2>
      <form
        onSubmit={
          action == "add"
            ? handleRegisterNews(registerNewsSubmit)
            : action === "edit"
            ? handleRegisterNews(editNewsSubmit)
            : handleRegisterNews(deleteNewsSubmit)
        }
      >
  {/* policyNumber: { type: String, required: true },
  type: { type: String, required: true },
  coverage: String,
  premium: Number,
  insuredAmount: Number,
  insurer: String, */}
        <Input
          type="text"
          placeholder="Número da Apólice"
          name="policyNumber"
          register={registerNews}
          disabled={action === "delete"}
        />
        {errorsRegisterNews.policyNumber && (
          <ErrorSpan>{errorsRegisterNews.policyNumber.message}</ErrorSpan>
        )}
        <select name="type">
          <option value="">Tipo</option>
          <option value="0">Auto</option>
          <option value="1">Vida</option>
        </select>
        {errorsRegisterNews.text && (
          <ErrorSpan>{errorsRegisterNews.text.message}</ErrorSpan>
        )}
        <Input
          type="text"
          placeholder="Texto"
          name="text"
          register={registerNews}
          disabled={action === "delete"}
        />

        <Button
          type="submit"
          text={
            action === "add"
              ? "Adicionar"
              : action === "edit"
              ? "Atualizar"
              : "Apagar"
          }
        />
      </form>
    </AddNewsContainer>
  );
}
