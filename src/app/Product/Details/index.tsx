import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();
  return <div>Product Details {id}</div>;
}
