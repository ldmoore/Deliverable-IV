import { createClient } from '@supabase/supabase-js'
import DogCard from "./DogCard";

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
)

export default async function Home() {
  let storedDogs: object[] = [];
  
  const { data, error } = await supabase
    .from('dogs')
    .select();

    //@ts-ignore
    for (let i : number = 0; i < data.length; i++) {
      //@ts-ignore
        const dog = data[i];
        storedDogs.push({
            id: dog.id,
            name: dog.name,
            breed: dog.breed,
            img: dog.image,
            description: dog.description
        });
    }

  return (
    <div>
      <h1>Dog Adoption Arena</h1>
      <p>Click on a dog to adopt or <a href="newDog">add a new dog for adoption</a>!</p>
      <div>
      {storedDogs.length > 0 && (
          <div className="dog-list">
          {storedDogs.map((dog : any) => (
            <DogCard dog={dog} key={dog.id} />
          ))}
          </div>
        )}
    </div>
    </div>
  );
}

