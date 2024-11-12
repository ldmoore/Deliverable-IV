import Image from "next/image";
import DogCard from "./DogCard";
const { breeds } = require("./dogInfo.json");

let storedDogs: object[] = [];

export async function generateStaticParams() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  const breeds = Object.keys(data.message);

  for (let i : number = 0; i < 5; i++) {
    const breed = breeds[Math.floor(Math.random() * breeds.length)];
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();

    storedDogs.push({
      "id": i,
      "name": "Dog",
      "breed": breed,
      "img": data.message,
      "description": "A cute dog!"
    });
  }

  return storedDogs;
}

export default function Home() {
  return (
    <div>
      <h1>Dog Adoption Arena</h1>
      <p>Click on a dog to adopt!</p>
      <div>
        {breeds.length > 0 && (
          <div className="dog-list">
          {breeds.map((dog : string) => (
            <p><a href={`/dogs/${dog}`}>{dog}</a></p>
          ))}
          </div>
        )}
    </div>
    </div>
  );
}
