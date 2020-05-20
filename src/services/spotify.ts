import { clientId, secret } from "../../config.ts";

export interface Creds {
  username: string;
  password: string;
}

export interface AudioParams {
  id: string;
  auth?: string;
}

let token: string;

export const spotifyAuth = async (credentials: any) => {
  const { username, password } = credentials;

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
    const jsonData = await response.json();
    token = `Bearer ${jsonData.access_token}`;
    return jsonData;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const spotifyAudioAnlz = async (params: any) => {
  const { id }: AudioParams = params;

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?country=SE`,
      {
        method: "GET",
        headers: {
          "Authorization": token,
        },
      },
    );

    const trackData = await response.json();
    const trackArray = trackData.tracks;
    const responseData: Array<number> = trackArray.map((element: any) => {
      return element.duration_ms;
    });

    return { "trackDurations": responseData };
  } catch (err) {
    console.log(err);
    return err;
  }
};
