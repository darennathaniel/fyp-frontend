import { useParams } from "react-router";

export default function SupplyDetails() {
  const { id } = useParams();
  return <div>Supply Details {id}</div>;
}
