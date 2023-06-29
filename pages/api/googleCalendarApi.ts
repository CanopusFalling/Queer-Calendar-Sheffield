import axios, { AxiosRequestConfig } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const googleApiUrl = 'https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events';

    const googleApiKey = process.env.GOOGLE_API_KEY; // Access the environment variable

    if (!googleApiKey) {
      throw new Error('Google API key not found');
    }

    const config: AxiosRequestConfig = {
      method: req.method as AxiosRequestConfig['method'],
      url: googleApiUrl,
      params: {
        ...req.query,
        key: googleApiKey,
      },
    };

    const response = await axios(config);

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}