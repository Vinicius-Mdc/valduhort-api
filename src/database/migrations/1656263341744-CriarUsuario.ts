import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CriarUsuario1656263341744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuario',
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
            name: 'email',
            type: 'varchar',
            length: '40',
            isNullable: false,
          },
          {
            name: 'senha',
            type: 'varchar',
            length: '60',
            isNullable: false,
          },
          {
            name: 'tokenRedefinirSenha',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('usuario')
  }
}
