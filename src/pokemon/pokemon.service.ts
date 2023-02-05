import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(

    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }  catch (error) {
      this.handleExceptions(error);
    } 
  }

  async findAll() {
    const pokemons = await this.pokemonModel.find();
    return pokemons;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if( !isNaN(+term) ){
      pokemon = await this.pokemonModel.findOne({no: +term})
    } else if( isValidObjectId(term) ){
      pokemon = await this.pokemonModel.findById(term);
    } else{
      pokemon = await this.pokemonModel.findOne({name: term});
    }

    if( !pokemon ) throw new NotFoundException(`Pokemon with id, name or no '${term}' not found `)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      var pokemon = await this.findOne(term);

      if( updatePokemonDto.name ) updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      
      await pokemon.updateOne(updatePokemonDto,{new: true});
      return updatePokemonDto;
    
    } catch (error){
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    var { deletedCount } = await this.pokemonModel.deleteOne({_id: id});

    if( deletedCount == 0 ) throw new NotFoundException(`Pokemon with id '${id}' not found `)

    return;
  }

  private handleExceptions(error:any){

    if( error.code == 11000 ){
      throw new ConflictException(`Pokemon exist in db - ${ JSON.stringify(error.keyValue) }`);
    }
    console.log(error);
    throw new InternalServerErrorException('Check log for more information')
  }
}
