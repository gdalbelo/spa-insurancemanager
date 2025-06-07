import { useNavigate, useParams } from "react-router-dom";
import { AddNewsContainer } from "./ManageInsurerStyled";
import { newsSchema } from "../../schemas/newsSchema";
import {
  createInsurances,
  deleteInsurances,
  ediInsurances,
  getInsurancesById,
} from "../../services/insuranceServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useEffect } from "react";

export function ManageInsurers() {
  const { action, id } = useParams();
  const navigate = useNavigate();

  const {
    register: registerInsurers,
    handleSubmit: handleRegisterInsurers,
    formState: { errors: errorsRegisterInsurers },
    setValue,
  } = useForm({ resolver: zodResolver(newsSchema) });

  async function registerInsurersSubmit(data) {
    try {
      await createInsurers(data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function editInsurersSubmit(data) {
    try {
      await editInsurers(data, id);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function findInsurersById(id) {
    try {
      const { data } = await getInsurersById(id);
      setValue("title", data.title);
      setValue("banner", data.banner);
      setValue("text", data.text);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteInsurersSubmit() {
    try {
      await deleteInsurances(id);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (action === "edit" || action === "delete") {
      findInsurersById(id);
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
        Seguradora
      </h2>
      <form
        onSubmit={
          action == "add"
            ? handleRegisterInsurers(registerInsurersSubmit)
            : action === "edit"
            ? handleRegisterInsurers(editInsurersSubmit)
            : handleRegisterInsurers(deleteInsurersSubmit)
        }
      >
        <Input
          type="text"
          placeholder="Nome"
          name="name"
          register={registerInsurers}
          disabled={action === "delete"}
        />
        {/* {errorsRegisterInsurers.title && (
          <ErrorSpan>{errorsRegisterInsurers.title.message}</ErrorSpan>
        )} */}
        <Input
          type="text"
          placeholder="Endereço"
          name="address"
          register={registerInsurers}
          disabled={action === "delete"}
        />
        {/* {errorsRegisterInsurers.banner && (
          <ErrorSpan>{errorsRegisterInsurers.banner.message}</ErrorSpan>
        )} */}
        <Input
          type="text"
          placeholder="Informação de contato"
          name="contactInfo"
          register={registerInsurers}
          isInput={false}
          disabled={action === "delete"}
        />
        {/* {errorsRegisterInsurers.text && (
          <ErrorSpan>{errorsRegisterInsurers.text.message}</ErrorSpan>
        )} */}

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
