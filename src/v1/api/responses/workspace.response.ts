import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkspaceResponse {
  @ApiProperty({
    description: 'Id of the workspace',
  })
    id: string;

  @ApiProperty({
    description: 'Name of the workspace',
  })
    name: string;

  @ApiPropertyOptional({
    description: 'Description of the workspace',
  })
    description?: string;

  @ApiProperty({
    description: 'Date when the workspace was created',
  })
    createdAt: Date;

  @ApiProperty({
    description: 'Date when the workspace was updated last time',
  })
    updatedAt: Date;
}
