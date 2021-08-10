import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createOrphanages1628616317921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orphanages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'latitude',
            type: 'decimal',
            precision: 10,
            scale: 6
          },
          {
            name: 'longitude',
            type: 'decimal',
            precision: 10,
            scale: 6
          },
          {
            name: 'about',
            type: 'varchar'
          },
          {
            name: 'instructions',
            type: 'varchar'
          },
          {
            name: 'opening_hours',
            type: 'varchar'
          },
          {
            name: 'open_on_weekends',
            type: 'boolean',
            default: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages')
  }
}
