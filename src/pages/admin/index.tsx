import AdminWrapper from "../../components/AdminWrapper";

export default function AdminHomepage() {
  return (
    <AdminWrapper>
      <div className="lg:grid lg:grid-cols-4 gap-3">
        <div className="w-auto h-[160px] shadow-xl p-8 border-b-8 border-b-red-500 border rounded-lg  ">
          <span className="block text-3xl font-semibold before:content-['R$']">
            &nbsp;115,00
          </span>
          <span className="block mt-1 text-red-500 font-bold text-2xl">
            Faturamento
          </span>
        </div>
        <div className="w-[400px] h-[160px] shadow-2xl p-8 border-b-8 border-b-teal-500 border rounded-lg  ">
          <span className="block text-3xl font-semibold">16</span>
          <span className="block mt-1 text-teal-500 font-bold text-2xl">
            Pedidos
          </span>
        </div>
        <div className="w-[400px] h-[160px] shadow-2xl p-8 border-b-8 border-b-yellow-400 border rounded-lg  ">
          <span className="block text-3xl font-semibold">54</span>
          <span className="block mt-1 text-yellow-400 font-bold text-2xl">
            Produtos no Cardápio
          </span>
        </div>
        <div className="w-[400px] h-[160px] shadow-2xl p-8 border-b-8 border-b-blue-500 border rounded-lg  ">
          <span className="block text-3xl font-semibold">2</span>
          <span className="block mt-1 text-blue-500 font-bold text-2xl">
            Ingredientes em Falta
          </span>
        </div>
      </div>
    </AdminWrapper>
  );
}
