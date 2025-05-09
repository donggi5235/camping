import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { getCampsiteById } from "~/lib/api";

export async function loader({ params }: LoaderFunctionArgs) {
  const campsite = await getCampsiteById(params.id);
  return json({ campsite });
}

export default function CampsiteDetail() {
  const { campsite } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={campsite.image_url} 
            alt={campsite.name}
            className="rounded-lg w-full h-64 object-cover mb-4"
          />
          <h1 className="text-3xl font-bold mb-4">{campsite.name}</h1>
          <p className="text-gray-600 mb-4">{campsite.location}</p>
          <p className="mb-6">{campsite.description}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">편의시설</h2>
            <p className="text-gray-600">{campsite.amenities}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>예약 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-4">₩{campsite.price_per_night.toLocaleString()} / 박</p>
            <p className="mb-4">최대 수용 인원: {campsite.capacity}명</p>
            <Link to={`/reserve/${campsite.id}`}>
              <Button className="w-full">예약하기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}