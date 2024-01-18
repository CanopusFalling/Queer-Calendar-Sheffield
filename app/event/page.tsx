import { redirect } from "next/navigation";

export default async function EventPage(req: any, res: any) {
  // Check if can be redirected to a specific event on the `event/[id]` path.
  const specificEvent =
    Object.keys(req.searchParams).length === 1 &&
    req.searchParams.eventId !== undefined;

  if (specificEvent) {
    redirect(`event/${req.searchParams.eventId}`);
  } else {
    redirect(`/`);
  }
}
