import { listHaplogroupProfiles } from '@/core';
import LineageProfileRouteClient from '@/components/lineage-explorer/LineageProfileRouteClient';

export function generateStaticParams() {
  return listHaplogroupProfiles().map((p) => ({ id: p.id }));
}

export default function LineageProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <LineageProfileRouteClient params={params} />;
}
