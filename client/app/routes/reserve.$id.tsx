import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Calendar } from "~/components/ui/calendar";
import { getCampsiteById } from "~/lib/api";
import { createReservation } from "~/lib/api";
import { format } from "date-fns";

export async function loader({ params }: LoaderFunctionArgs) {
  const campsite = await getCampsiteById(params.id);
  return json({ campsite });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = {
    campsite_id: params.id as string,
    user_name: formData.get("user_name") as string,
    user_phone: formData.get("user_phone") as string,
    user_email: formData.get("user_email") as string,
    start_date: formData.get("start_date") as string,
    end_date: formData.get("end_date") as string,
    guests: parseInt(formData.get("guests") as string),
  };

  try {
    await createReservation(data);
    return redirect(`/campsites/${params.id}?reservation=success`);
  } catch (error) {
    return json({ error: "예약 중 오류가 발생했습니다." }, { status: 400 });
  }
}

export default function ReservationPage() {
  const { campsite } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">{campsite.name} 예약</h1>
      
      {actionData?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {actionData.error}
        </div>
      )}

      <Form method="post" className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="user_name">이름</Label>
          <Input 
            id="user_name" 
            name="user_name" 
            placeholder="이름을 입력하세요" 
            required 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="user_phone">전화번호</Label>
          <Input 
            id="user_phone" 
            name="user_phone" 
            placeholder="전화번호를 입력하세요" 
            required 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="user_email">이메일</Label>
          <Input 
            id="user_email" 
            name="user_email" 
            type="email" 
            placeholder="이메일을 입력하세요" 
            required 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>체크인</Label>
            <input type="hidden" name="start_date" id="start_date" />
            <Calendar 
              mode="single" 
              className="rounded-md border p-2"
              onSelect={(date) => {
                if (date) {
                  document.getElementById('start_date')!.value = format(date, 'yyyy-MM-dd');
                }
              }}
            />
          </div>

          <div className="grid gap-2">
            <Label>체크아웃</Label>
            <input type="hidden" name="end_date" id="end_date" />
            <Calendar 
              mode="single" 
              className="rounded-md border p-2"
              onSelect={(date) => {
                if (date) {
                  document.getElementById('end_date')!.value = format(date, 'yyyy-MM-dd');
                }
              }}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="guests">인원 수</Label>
          <Input 
            id="guests" 
            name="guests" 
            type="number" 
            min="1" 
            max={campsite.capacity} 
            defaultValue="2" 
            required 
          />
        </div>

        <Button type="submit" className="w-full">
          예약하기
        </Button>
      </Form>
    </div>
  );
}