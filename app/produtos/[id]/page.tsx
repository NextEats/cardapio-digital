export default function ProductPage({ params }: { params: { id: string } }) {
  return <h1>{params.id}</h1>;
}
