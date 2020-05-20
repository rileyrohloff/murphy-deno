class SwapiClient {
  constructor() {
  }
  static shipSpeeds = async (url: string): Promise<object> => {
    try {
      const response = await (await fetch(url + "/starships")).json();
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
}

export default SwapiClient;
