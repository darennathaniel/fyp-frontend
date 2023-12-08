import { Separator } from "@/components/ui/separator";
import { ICompanyDetailsHeader } from "@/types/company/ICompanyDetailsHeader";

export default function CompanyDetailsHeader(props: ICompanyDetailsHeader) {
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
