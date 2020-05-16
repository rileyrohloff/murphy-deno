export interface JsonData {
    data: object,
    versions: Array<string>

}


const data = await fetch('https://rileyrohloff.my.workfront.com/attask/api/info');

const json: JsonData = await data.json()

console.log(json);
