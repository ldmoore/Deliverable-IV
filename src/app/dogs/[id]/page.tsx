'use client';
import Image from "next/image";
import { use } from "react";
import dogInfo from "../../dogInfo.json";

function adopt(): void {
    alert("Congratulations, you adopted a dog!");
}

export default function Dog({ params }: { params: { id: string } }) {
    //@ts-ignore
    const { id } = use(params);
    const dog : any = Object.values(dogInfo).find(d => d.id === id);
    if (!dog) return (<p>404</p>);
    else return ( <div className="dog-image">
        <h1>Say hi to {dog.name}!</h1>
        <p>Breed: {dog.breed}<br></br>{dog.description}</p>
        <img width="50%" src={dog.img} alt={dog.breed} />
        <button onClick={() => adopt()}>Adopt Now</button>
        <a href="/">Back to home</a>
        <br></br>
    </div>
     )
}