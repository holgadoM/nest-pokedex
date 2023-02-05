import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  
  constructor(
    
    private readonly axios:AxiosAdapter,
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){
  }

  async executeSeed() {
    await this.pokemonModel.deleteMany();
    const data = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=600&offset=0');
    var listPokemons = [];
    data.results.forEach(({name, url})=>{
      var segments = url.split('/');
      const id = +segments[segments.length-2];
      
      listPokemons.push({ no:id, name: name })
    });

    const inserts = await this.pokemonModel.insertMany(listPokemons);

    return inserts;
  }

}
