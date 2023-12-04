import { Separator } from "@/components/ui/separator";
import { IProfileHeader } from "@/types/profile/IProfileHeader";

export default function ProfileHeader(props: IProfileHeader) {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium">{props.title}</h3>
        <p className="text-sm text-zinc-400">{props.subtitle}</p>
      </div>
      <Separator className="bg-white" />
    </>
  );
}
