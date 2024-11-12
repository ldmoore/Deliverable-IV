import { breeds } from "../../dogInfo.json";

export async function generateStaticParams() {
    let storedDogs = [];

    for (let i : number = 0; i < breeds.length; i++) {
        const breed = breeds[i];
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await response.json();

        storedDogs.push({
            id: i.toString(),
            name: "Dog",
            breed: breed,
            img: data.message,
            description: "A cute dog!"
        });
        console.log(storedDogs);
    }

    return storedDogs.map(dog => ({
        params: { id: dog.breed }
    }));
}

export default async function Dog({ params }: { params: { id: string } }) {

    const response = await fetch(`https://dog.ceo/api/breed/${params.id}/images/random`);
    const dogResp = await response.json();
    const dog = {
        "id": 0,
        "name": "Dog",
        "breed": params.id,
        "img": dogResp.message,
        "description": "A cute dog!"
    };

    if (!dog) return (<p>404</p>);
    else return ( <div className="dog-image">
        <h1>Say hi to this dog!</h1>
        <p>Breed: {dog.breed}<br></br>{dog.description}</p>
        <img width="50%" src={dog.img} alt={dog.breed} />
        <a href="/">Back to home</a>
        <br></br>
    </div>
     )
}