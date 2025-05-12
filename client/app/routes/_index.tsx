import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { getCampsites } from "~/lib/api";
import { useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
      <p className="text-lg mb-2">Failed to load campsites data.</p>
      <p className="text-sm text-gray-600">
        {error instanceof Error ? error.message : "Unknown error occurred"}
      </p>
      <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">
        Refresh page
      </a>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const campsites = await getCampsites();
  return json({ campsites });
}

export default function Index() {
  const { campsites } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">캠핑장 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campsites.map((campsite: any) => (
          <Card key={campsite.id}>
            <CardHeader>
              <CardTitle>{campsite.name}</CardTitle>
              <CardDescription>{campsite.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{campsite.description}</p>
              <p className="font-medium">₩{campsite.price_per_night.toLocaleString()} / 박</p>
              <a 
                href={`/campsites/${campsite.id}`}
                className="inline-block mt-4 text-sm font-medium text-primary hover:underline"
              >
                상세 보기
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}