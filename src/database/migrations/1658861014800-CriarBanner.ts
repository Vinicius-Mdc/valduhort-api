import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CriarBanner1658861014800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'banner',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'url',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'disponivel',
            type: 'boolean',
            isNullable: false,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('banner')
  }
}
