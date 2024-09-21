import type { APIRoute } from "astro";
import indicadores from  'db.json';

export const POST: APIRoute = ({ params, request }) => {
    return new Response(
      JSON.stringify({
        data:indicadores,
      })
    )
  }