import { clientId, secret } from "../../config.ts";

export interface Creds {
  username: string;
  password: string;
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
