import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CriarProduto1658863126542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'produto',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '40',
            isNullable: false,
          },
          {
            name: 'disponivel',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'preco',
            type: 'numeric(10, 2)',
            isNullable: false,
          },
          {
            name: 'foto',
            type: 'varchar',
            isNullable: false,
            length: '150',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('produto')
  }
}
