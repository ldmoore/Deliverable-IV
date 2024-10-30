import "./dogcard.css";

export default function DogCard({ dog } : { dog: { id: string, breed: string, name : string, img : string, description: string } }) {
    return (
        <div className="dog-card">
            <img src={dog.img}></img>
            <h2><a href={`/dogs/${dog.id}`}>{dog.name}</a></h2>
        </div>
    );
}