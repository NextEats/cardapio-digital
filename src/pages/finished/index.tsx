import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "../../server/api";
import Header from "../../components/home/Header";

import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { TbLock } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { IRestaurant } from "../../types/home";
import { FaRegEnvelope } from "react-icons/fa";

interface IFinishedProps {
  restaurant: IRestaurant;
}

const newUserFormValidationSchema = zod.object({
  name: zod.string().min(1, "Informe a tarefa").optional(),
  email: zod.string(),
  password: zod.string().min(8, "Sua senha deve ter no minimo 8 caracteres"),
});

type NewUserFormData = zod.infer<typeof newUserFormValidationSchema>;

export default function Finished({ restaurant }: IFinishedProps) {
  const [account, setAccount] = useState<"login" | "register" | "">("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm<NewUserFormData>({
    resolver: zodResolver(newUserFormValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function handleCreateNewUser(data: NewUserFormData) {
    console.log(data);
    reset();
  }

  function handleLogin(data: NewUserFormData) {
    console.log(data);
    reset();
  }

  return (
    <>
      {/* //   Modal    */}
      {account !== "" ? (
        <div className="w-screen h-screen flex items-center justify-center fixed inset-0 z-20 ">
          <div className="w-screen h-screen flex items-center justify-center bg-black opacity-40 blur-lg fixed inset-0 z-10 "></div>
          <div
            className={`w-[280px] ${
              account === "register" ? "h-[540px]" : "h-[490px]"
            } bg-white z-20 rounded shadow-2xl px-4  py-4`}
          >
            <div className="w-full flex justify-end">
              <AiOutlineClose
                className="cursor-pointer w-5"
                onClick={() => setAccount("")}
              />
            </div>

            {/*  Logo  */}
            <Image
              className="mt-6 mb-2"
              src={"https://i.ibb.co/FgPk06Q/Next-Eats-1000-500-px-1-1.png"}
              alt="Logo da NextEats"
              width={236}
              height={55}
            />

            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-11 h-[1.2px] bg-gray-500"></div>
              <span className="font-extrabold text-base text-gray-600">
                {account === "register"
                  ? "Criar uma conta"
                  : "Acesse sua conta"}
              </span>
              <div className="w-11 h-[1.2px] bg-gray-500"></div>
            </div>

            <form
              onSubmit={
                account === "register"
                  ? handleSubmit(handleCreateNewUser)
                  : handleSubmit(handleLogin)
              }
            >
              {account === "register" ? (
                <div className="flex products-center gap-2 mb-4 p-2 border rounded-md bg-white items-center">
                  <AiOutlineUser className="w-6 h-6 text-gray-500" />
                  <input
                    type="text"
                    className="w-full outline-none px-2 rounded placeholder:italic text-base font-normal"
                    placeholder="Seu nome"
                    {...register("name")}
                  />
                </div>
              ) : null}
              <div className="flex products-center gap-2 mb-4 p-2 border rounded-md bg-white items-center">
                <FaRegEnvelope className="w-6 h-6 text-gray-500" />
                <input
                  type="email"
                  className="w-full outline-none px-2 rounded placeholder:italic text-base font-normal"
                  placeholder="E-mail..."
                  {...register("email")}
                />
              </div>
              <div className="flex products-center gap-2 my-4 p-2 border rounded-md bg-white items-center">
                <TbLock className="w-6 h-6 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full outline-none px-2 rounded placeholder:italic text-base font-normal"
                  placeholder="Senha..."
                  {...register("password")}
                />
                {showPassword ? (
                  <AiOutlineEye
                    className="w-6 h-6 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="w-6 h-6 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              <span className="text-[9.8px] leading-[10px] text-gray-500 font-medium">
                Ao criar sua conta, você concorda com os nossos&nbsp;
                <Link href="#" className="text-blue-500">
                  Termos de Privacidade
                </Link>
              </span>
              <button
                type="submit"
                className="w-full h-10 flex items-center justify-center gap-2 mb-6 border bg-red-500 rounded text-sm uppercase text-white font-medium"
              >
                {" "}
                {account === "register" ? "cadastrar" : "Entrar"}
              </button>
            </form>

            {/* // Social medias */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-[1.2px] bg-gray-500"></div>
              <span className="font-light w-[170px] text-[11px] italic text-gray-600">
                Ou faça login com suas redes sociais
              </span>
              <div className="w-8 h-[1.2px] bg-gray-500"></div>
            </div>
            <div className="flex item-center justify-center gap-3">
              <BsFacebook className="text-blue-600 w-8 h-8 cursor-pointer" />
              <FcGoogle className=" w-8 h-8 cursor-pointer" />
            </div>
          </div>
        </div>
      ) : null}

      <div>
        <Header restaurant={restaurant} withStars={false} />
        <div className="flex flex-col gap-3 px-4 mt-7">
          <h2 className="font-extrabold text-2xl text-yellow-500">
            Opaa! Pedido confirmado
          </h2>
          <span className="font-medium text-sm text-gray-400">
            Agora é só aguardar a entrega{" "}
          </span>
          <span className="font-light text-xs text-gray-400">
            O status do seu pedido será informado gradualmente através do seu
            WhasApp
          </span>
        </div>
        <div className="w-full absolute bottom-0 left-0 px-4 pb-8 pt-4 bg-white ">
          <p className="text-base font-light text-black mb-3">
            Acompanhe o seu pedido.
          </p>
          <button
            onClick={() => setAccount("register")}
            className="w-full h-10 flex items-center justify-center gap-2 mb-3 bg-gray-700 rounded-md text-sm uppercase text-white-300 font-medium"
          >
            Criar minha conta
          </button>
          <button
            onClick={() => setAccount("login")}
            className="w-full h-10 flex items-center justify-center gap-2 border border-black rounded text-sm uppercase text-gray-600 font-medium"
          >
            Fazer login
          </button>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const restaurant = await api.get("restaurants/2");
  return {
    props: {
      restaurant: restaurant.data,
    },
  };
};
