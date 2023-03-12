import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonScheme } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

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
    ]),
    ConfigModule
  ],
  exports:[ MongooseModule  ]
})
export class PokemonModule {}
