"use server";
import { createClient } from '@supabase/supabase-js'
import AdoptButton from './AdoptButton';

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
)

async function adoptDB(id: string) {
    "use server";
    const { data, error } = await supabase
    .from('dogs')
    .delete()
    .eq('id', id);
}

export async function generateStaticParams() {
    let storedDogs = [];
    const { data, error } = await supabase
    .from('dogs')
    .select();
    if (error || !data) return [];

    //@ts-ignore
    for (let i : number = 0; i < data.length; i++) {
        const dog = data[i];
        storedDogs.push({
            id: dog.id,
            name: dog.name,
            breed: dog.breed,
            img: dog.image,
            description: dog.description
        });
    }

    return storedDogs.map(dog => ({
        params: { id: dog.id }
    }));
}

export default async function Dog({ params }: { params: { id: string } }) {
    const resolvedParams = await (params);
    const { data } = await supabase
    .from('dogs')
    .select()
    .eq('id', resolvedParams.id);
    if (!data) return (<p>404</p>);
    //@ts-ignore
    const dog = data[0];
    dog.img = dog.image;

    if (!dog) return (<p>404</p>);
    else return ( <div className="dog-image">
        <h1>Say hi to {dog.name}!</h1>
        <p>Breed: {dog.breed}<br></br>{dog.description}</p>
        <img width="50%" src={dog.img} alt={dog.breed} />
        <AdoptButton id={dog.id} name={dog.name} adoptDB={adoptDB}/>
        <a href="/">Back to home</a>
        <br></br>
    </div>
     )
}