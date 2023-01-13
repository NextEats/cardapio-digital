import { Card } from "../../components/admin/Card";
import NewRequests from "../../components/admin/NewRequests";
import AdminWrapper from "../../components/AdminWrapper";


export default function AdminHomepage() {
  return (
    <AdminWrapper>
      <div className="flex flex-col gap-8">
        <div className="lg:grid lg:grid-cols-4 gap-3">
          <Card color="red-500" name="Faturamento" value={"R$ 115,00"} />
          <Card color="green-500" name="Pedidos" value={"16"} />
          <Card color="yellow-500" name="Produtos no Cardápio" value={"54"} />
          <Card color="blue-500" name="Ingredientes em Falta" value={"2"} />
        </div>

        <NewRequests />
        
      </div>
    </AdminWrapper>
  );
}
