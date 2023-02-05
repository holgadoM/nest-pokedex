import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios,{ AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axis:AxiosInstance = axios;

  constructor(

    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){
  }

  async executeSeed() {
    await this.pokemonModel.deleteMany();
    const {data} = await this.axis.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650&offset=0');
    var listPokemons = []
    data.results.forEach(({name, url})=>{
      var segments = url.split('/');
      const id = +segments[segments.length-2];
      
      listPokemons.push({ no:id, name: name })
    });

    const inserts = await this.pokemonModel.insertMany(listPokemons);

    return inserts;
  }

}
