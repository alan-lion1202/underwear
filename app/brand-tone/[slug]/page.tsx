import { redirect } from "next/navigation";

type BrandToneRedirectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BrandToneRedirectPage({ params }: BrandToneRedirectPageProps) {
  const { slug } = await params;
  redirect(`/brand-database/${slug}`);
}
