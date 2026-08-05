import { redirect } from "next/navigation";

export default function CatchAllPage({ params }: { params: { categoria: string } }) {
  redirect(`/busca?q=${params.categoria}`);
}
