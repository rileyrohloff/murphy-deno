import { clientId, secret } from "../../config.ts";

export interface Creds {
  username: string;
  password: string;
}

export interface AudioParams {
  artistId: string;
  auth: string;
}

export const spotifyAuth = async (credentials: any) => {
  const { username, password }: Creds = credentials;
  const encodedSecret: string = btoa(
    clientId! + ":" + secret,
  );
  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token?grant_type=client_credentials",
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${encodedSecret}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    console.log(await response.json());

    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const spotifyAudioAnlz = async (params: any) => {
  const { artistId, auth }: AudioParams = params;
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${auth}`,
        },
      },
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
