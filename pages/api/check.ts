// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string;
  key: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY || '' , key: process.env.STRIPE_SECRET_KEY || ''})
}
