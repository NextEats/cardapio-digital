import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Image from "next/image";
import NextEatsLogo from "@/src/assets/nexteats_logo_orange.png";
import { supabase } from "@/src/server/api";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getRestaurantBySlugFetch } from "@/src/fetch/restaurant/getRestaurantBySlug";

interface iFormData {
  login: string;
  password: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: userDetails } = await supabase
    .from("user_details")
    .select("id, user_id, restaurant_id, restaurants (id, slug)");

  return {
    props: {
      data: {
        userDetails: JSON.parse(JSON.stringify(userDetails)),
      },
    },
  };
};

export default function LoginForm({ data }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iFormData>();

  const userDetails = data.userDetails;

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<iFormData> = (data) => {
    supabase.auth
      .signUp({
        email: data.login,
        password: data.password,
      })
      .then((res) => {
        if (res.data.user) {
          var result = userDetails.find(
            (item: any) => item.user_id === res.data.user?.id
          );

          router.push(`/${result.restaurants.slug}/admin`);
        } else {
          return;
        }
      });
  };

  const inputTextClasses =
    "text-md py-2 focus:outline-none border w-full pl-3 rounded-sm";

  return (
    <div className="w-[99vw] flex justify-center h-[50%] mt-32 overflow-hidden">
      <form
        className="flex flex-col w-full max-w-[400px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Image src={NextEatsLogo} alt="NextEatsLogo" />

        <input
          type="text"
          className={inputTextClasses}
          placeholder="E-mail"
          {...register("login")}
        />
        {errors.login?.message && <p>{errors.login.message}</p>}

        <div className="w-full mt-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className={inputTextClasses}
            {...register("password")}
          />

          <button
            type="button"
            className="absolute -ml-9 text-[20px] h-10 w-9 text-center"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <button
          className="mt-6 rounded-md w-full bg-[#FF6D00] py-2 text-md font-semibold text-[white] uppercase"
          type="submit"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
