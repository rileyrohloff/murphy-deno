class SwapiClient {
  constructor() {
  }
  static swapiURL = "https://swapi.dev/api/";
  static shipSpeeds = async (): Promise<object> => {
    try {
      const response = await (await fetch(SwapiClient.swapiURL + "/starships"))
        .json();
      const ships: Array<object> = await response.results.map(
        (ship: any) => {
          return ship.max_atmosphering_speed;
        },
      );
      return { "data": ships };
    } catch (err) {
      console.log(`ERROR: ${err}`);
      return err;
    }
  };
  static getData = async (object: string): Promise<object> => {
    try {
      const response: Response = await fetch(
        SwapiClient.swapiURL + `${object}`,
      );
      const data: Promise<JSON> = await response.json();
      return { "data": [data] };
    } catch (err) {
      console.log(err);
      return { "error": err };
    }
  };
}

export default SwapiClient;
