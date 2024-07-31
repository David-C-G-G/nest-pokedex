import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// import axios, {AxiosInstance} from 'axios';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adatper';

@Injectable()
export class SeedService {
  
  // private readonly axios: AxiosInstance  = axios;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    //inyectando el provider de axios adapter
    private readonly http: AxiosAdapter,
  ){}


  // async executeSeed() {
  //   const { data } =  await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    
  //   data.results.forEach( async ({ name, url }) => {
  //     const segments = url.split('/');
  //     const no: number = +segments[segments.length - 2];
  //     const pokemon = await this.pokemonModel.create({ name, no });
  //   })


    
  //   return 'Seed executed';
  // }

  //realización de inserciones simultaneas en la BD con Promesas
  // async executeSeed() {

  //   await this.pokemonModel.deleteMany({});

  //   const { data } =  await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

  //   const insertPromisesArray = [];
    
  //   data.results.forEach(({ name, url }) => {
  //     const segments = url.split('/');
  //     const no: number = +segments[segments.length - 2];
  //     insertPromisesArray.push(
  //       this.pokemonModel.create({ name, no })
  //     );
  //   });

  //   await Promise.all( insertPromisesArray );


    
  //   return 'Seed executed';
  // }


  //código correcto_1 pero con el axios aquí mismo
  // async executeSeed() {

  //   await this.pokemonModel.deleteMany({});

  //   const { data } =  await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

  //   const pokemonToInsert: { name: string, no: number}[] = [];
    
  //   data.results.forEach(({ name, url }) => {
  //     const segments = url.split('/');
  //     const no: number = +segments[segments.length - 2];
  //     // const pokemon = await this.pokemonModel.create({ name, no });
  //     pokemonToInsert.push(({ name, no }));
  //   });

  //   this.pokemonModel.insertMany(pokemonToInsert);

    
  //   return 'Seed executed';
  // }

  //código correcto_2 pero con axios inyectado de axios adapter
  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data =  await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string, no: number}[] = [];
    
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      // const pokemon = await this.pokemonModel.create({ name, no });
      pokemonToInsert.push(({ name, no }));
    });

    this.pokemonModel.insertMany(pokemonToInsert);

    
    return 'Seed executed';
  }
}
