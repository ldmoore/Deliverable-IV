"use client";
import { redirect } from "next/navigation";

async function adopt(id: string, adoptDB: Function) {
    adoptDB(id);
    alert(`Congratulations! You have adopted a dog!`);
    redirect("/");
}

export default function AdoptButton({ id, name, adoptDB } : { id: string, name: string, adoptDB: Function }) {
    return (<button onClick={() => adopt(id, adoptDB)}>Adopt {name}</button>)
}