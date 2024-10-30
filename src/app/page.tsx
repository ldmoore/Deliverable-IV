import Image from "next/image";
import DogCard from "./DogCard";
const dogs = require("./dogInfo.json");

export default function Home() {
  return (
    <div>
      <h1>Dog Adoption Arena</h1>
      <p>Click on a dog to adopt!</p>
      <div>
        {Object.keys(dogs).length > 0 && (
          <div className="dog-list">
          {Object.keys(dogs).map((dog : any) => (
            <DogCard dog={dogs[dog]} key={dogs[dog].breed} />
          ))}
          </div>
        )}
    </div>
    </div>
  );
}
