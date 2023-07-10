import { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'edge';

const googleApiKey = process.env.GOOGLE_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!googleApiKey) {
    throw new Error('Google API key is not defined.');
  }

  const parameters = {
    key: googleApiKey,
    timeMin: new Date().toISOString(),
    showDeleted: "False",
    singleEvents: "True"
  };

  const queryString = new URLSearchParams(parameters).toString();

  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events?${queryString}`);
  const eventData = await response.json();

  return new Response(
    JSON.stringify(eventData),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}