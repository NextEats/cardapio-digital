import { useState } from "react";
import { MdLocationOn, MdExpandMore } from "react-icons/md";
import { FaClock } from "react-icons/fa";

import Link from "next/link";

import axios from "axios";

interface LocationInterface {
  address: string;
  googleMapsLink: string;
}

async function getAddressDistanceMapLink(
  cep: string
): Promise<LocationInterface> {
  //Função para buscar os detalhes do endereço a partir do CEP
  function getAddress(cep: string): Promise<string> {
    //Faz uma requisição GET para a API viacep, passando o CEP como parâmetro
    //A resposta é um objeto JSON com as informações do endereço
    return axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        const { logradouro, bairro, localidade, uf } = response.data;
        //Retorna o endereço formatado como string
        return `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
      });
  }

  //Função para gerar o link do Google Maps para o endereço
  function generateMapLink(address: string): string {
    //Codifica o endereço para ser incluído na URL
    const encodedAddress = encodeURIComponent(address);
    //Retorna o link do Google Maps com o endereço codificado como parâmetro de busca
    return `https://www.google.com/maps?q=${encodedAddress}`;
  }

  try {
    //Fetch address details
    const address = await getAddress(cep);
    //Generate Google Maps link
    const googleMapsLink = generateMapLink(address);
    //Return object with address details, distance and map link
    return { address, googleMapsLink };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export default function RestaurantLocation() {
  const [location, setLocation] = useState<LocationInterface>({
    address: "carregando...",
    googleMapsLink: "#",
  });

  getAddressDistanceMapLink("04945285").then(({ address, googleMapsLink }) => {
    setLocation({ address, googleMapsLink });
  });

  return (
    <Link href={location.googleMapsLink} target="_blank">
      <div className="flex flex-row">
        <div className="mr-1 flex items-center bg-gray-800 px-7 py-2 rounded-sm cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600">
          <MdLocationOn className="inline text-white w-6 h-6 mr-2" />
          <span className="text-white text-xs">{location.address}</span>
        </div>
        {/* <div className="flex items-center bg-gray-800 px-5 py-1 rounded-sm cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600">
        <FaClock className="inline text-white w-5 h-5 mr-3" />
        <span className="text-white text-xs">Aberto até 23h</span>
        <MdExpandMore className="inline text-white w-6 h-6 ml-2" />
      </div> */}
      </div>
    </Link>
  );
}
