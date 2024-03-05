import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldsToUserTableAndProductTable1706861615727 implements MigrationInterface {
    name = 'AddFieldsToUserTableAndProductTable1706861615727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deleted_at\``);
    }

}
