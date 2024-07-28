import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    // return 'This action adds a new pokemon';
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {

      //insertando en tabla
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;

    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if ( !isNaN(+term) ){
      pokemon = await this.pokemonModel.findOne({ no: term })
    }

    //verificación por MongoID
    if ( !pokemon && isValidObjectId( term ) ){
      pokemon = await this.pokemonModel.findById( term );
    }

    //verificación por Name
    if ( !pokemon ){
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }

    if( !pokemon )throw new NotFoundException(`El pokemon con el termino: "${ term }" no existe `);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    const pokemon = await this.findOne( term );
    if ( updatePokemonDto.name )
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {

      await pokemon.updateOne( updatePokemonDto );

      return { ...pokemon.toJSON(), ...updatePokemonDto };
      
    }catch (error){
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {

    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();
    // return {id};

    //opción de eliminación 1 pero puede dar un falso positivo (que haya eliminado algo inexistente)
    // const result = await this.pokemonmodel.findByIdAndDelete(id);

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if ( deletedCount === 0 )
      throw new BadRequestException(`El Pokemon con el id [${ id }] no existe`);


    return;
  }

  private handleExceptions( error: any) {
    if( error.code === 11000 ){
      throw new BadRequestException(`El pokemon con "${JSON.stringify( error.keyValue )}" ya se encuentra en la BD..`)
    }
    throw new InternalServerErrorException(`No se puede crear Pokemon - verifica logs del servidor`)
  }
}
