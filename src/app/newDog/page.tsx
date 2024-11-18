import Form from "next/form";
import "./newDog.css";
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
  )
  
  async function addNewDog(data : FormData) {
    "use server";
    const { error } = await supabase
    .from('dogs')
    .insert({ name: data.get('name'), breed: data.get('breed'), age: data.get('age'), description: data.get('description'), image: data.get('image') });
    console.log(error);
    if (!error) redirect("/");
  }

export default function NewDog() {
  return (
    <Form action={addNewDog}>
      <h2>Add a new dog...</h2>
      <input type="text" name="name" placeholder="Name" required />
      <input type="text" name="breed" placeholder="Breed" required />
      <input type="number" name="age" placeholder="Age" required />
      <input type="text" name="description" placeholder="Description" required />
      <input type="text" name="image" placeholder="Image URL" required />
      <button type="submit">Submit</button>
    </Form>
  );
}