import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import env from '@/lib/env';
import { getSession } from '@/lib/session';

export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const session = await getSession(req, res);

    if (session) {
    
    const keyloackendSessionUrl = `${env.keycloak.issuer}/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(env.nextAuth.AuthUrl)}`;

    try {
        const resp = await fetch(keyloackendSessionUrl, { method: "GET" });

        return await res.status(200).json({keyloackendSessionUrl});
            
      } catch (error) {

        console.error(error);

        return await res.status(500);

      }
    }
   
    return await res.status(500);
  }