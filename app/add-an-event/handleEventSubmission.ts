"use server";

export default async function HandleEventSubmission(
  event: React.FormEvent<HTMLFormElement>,
) {
  console.log(event);
}
