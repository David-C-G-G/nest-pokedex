import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';
import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {

    //Estos valores comentados ya no son necesarios escribirlos aqui ya que el extends lo hace
    // @IsInt()
    // @IsPositive()
    // @MinLength(1)
    // no: number;

    // @IsString()
    // @MinLength(1)
    // name: string;
    
}
