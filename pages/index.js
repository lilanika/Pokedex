import Head from "next/Head";
import Layout from "../components/Layout";
import Link from "next/Link";
import Image from "next/image";

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((pokemon, index) => {
      //Url > ../pokedex/full/0003.png
      const paddedId = ("00" + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;

      /*here we want to return a new object with the pokemon and image */
      return { ...pokemon, image };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}

export default function Home({ pokemon }) {
  console.log("pokemons", pokemon);
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center ">The Nextjs Pokedex</h1>

      <ul>
  
        {pokemon.map((pokemon, index) => (
          <li key={pokemon + index}>
             <Link href={`/pokemon?id=${index + 1}`}>
                            <a className="border p-4 border-grey my-2 hover:shadow-md capitalize flex items-center text-lg bg-gray-200 rounded-md">

                              <div  className="w-20 h-20 mr-3"> <Image
                                    src={pokemon.image}
                                    alt={pokemon.name}  
                                    width={100}    
                                    height={100} 
                                    objectFit="cover" 
                                

                                /></div>
                               
                                <span className="mr-2 font-bold">
                                    {index + 1}.
                                </span>
                                {pokemon.name}
                            </a>
                        </Link>
            
           </li>
        ))}
      </ul>
    </Layout>
  );
}
