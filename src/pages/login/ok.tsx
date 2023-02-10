import React from "react";

export default function LoginForm() {
  return (
    <div className="w-[99vw] flex justify-center h-[50%] mt-32 overflow-hidden">
      <div className="flex flex-col w-full max-w-[600px] px-5">
        <h1 className="text-5xl font-bold text-[#e68641]">Parabéns</h1>
        <h3 className="my-4 text-xl font-xl text-[#292929]">
          Seu login foi efetuado com sucesso!!
        </h3>
        <p className="italic text-[#858585]">
          Sua conta na nossa plataforma está sendo configurada para que você
          tenha acesso a todas as nossas funcionalidades. Aguarde até o dia
          <span className="font-bold italic"> 13/02/2023</span> para que seu
          acesso seja completamente liberado.
        </p>
      </div>
    </div>
  );
}
