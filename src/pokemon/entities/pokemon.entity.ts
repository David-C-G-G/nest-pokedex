//entidades: usados como referencia para saber como queremos grabar en la BD
//también hacen una relación con las BD
//cada instancia hace un registro de BD
//aquí se conocen como colecciones y documentos

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document { //extendemos para que sea considerado como Documento ("de mongoose")

    // id: string // Mongo lo proporciona dentro de la BD
    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}

//cuando inicia la BD indicamos que definiciones se quiere que usen
//mediante la exportación de el esquema de abajo (reglas, columnas, etc.)

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
