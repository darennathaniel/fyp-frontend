import { IPageHeader } from "@/types/header/IPageHeader";

export default function PageHeader(props: IPageHeader) {
  return (
    <div className="py-2 px-4">
      <div className="text-2xl font-semibold">{props.title}</div>
      <div className="font-medium text-sm text-zinc-400">
        {props.description}
      </div>
    </div>
  );
}
