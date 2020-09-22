import { Document } from 'mongoose'
import {ApiProperty} from "@nestjs/swagger";

export class Planet extends Document{
    /**
     * The name of the Planet
     * @example Terra
     */
    @ApiProperty({ example: "Terra", description: 'Nome do planeta' })
     name: string;

    @ApiProperty({ example: "quente", description: 'Clima do planeta' })
    climate: string;
    
    @ApiProperty({ example: "plano", description: 'Terreno do planeta' })
    terrain: string;

    @ApiProperty({ example: "plano", description: 'Terreno do planeta',nullable: true, readOnly:true })    
    apparetions: number;
}
