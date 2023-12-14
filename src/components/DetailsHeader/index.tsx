import { Separator } from "@/components/ui/separator";
import { IDetailsHeader } from "@/types/header/IDetailsHeader";

export default function DetailsHeader(props: IDetailsHeader) {
  return (
    <div className="flex w-full items-center space-x-6 justify-center">
      <Separator className="bg-white w-5/12" />
      <div className="text-center w-2/12 font-semibold text-xl">
        {props.title}
      </div>
      <Separator className="bg-white w-5/12" />
    </div>
  );
}
