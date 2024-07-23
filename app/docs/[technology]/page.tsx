import EasyDocs from "@/components/EasyDocs";

export default function TechnologyPage({
  params,
}: {
  params: { technology: string };
}) {
  return <EasyDocs initialTechnology={params.technology} />;
}
