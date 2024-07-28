import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // console.log({ value, metadata });

    if ( !isValidObjectId(value) ){//validamos si es un MongoID
      throw new BadRequestException(`El valor [${ value }] no es un MongoID válido `);
    }

    return value;
  }
}
