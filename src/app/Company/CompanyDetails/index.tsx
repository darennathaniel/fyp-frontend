import { useParams } from "react-router";

export default function CompanyDetails() {
  const { owner } = useParams();
  return <div>Company Details {owner}</div>;
}
