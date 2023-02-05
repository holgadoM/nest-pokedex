import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonScheme } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Pokemon.name,
        useFactory: ()=>{
          const scheme = PokemonScheme;
          scheme.plugin(require('mongoose-unique-validator'));
          return scheme
        }
        
      }
    ])
  ],
  exports:[ MongooseModule  ]
})
export class PokemonModule {}
