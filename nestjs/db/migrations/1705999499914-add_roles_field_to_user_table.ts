import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesFieldToUserTable1705999499914 implements MigrationInterface {
    name = 'AddRolesFieldToUserTable1705999499914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL DEFAULT 'User'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`delete_at\` \`delete_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`categoryId\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`delete_at\` \`delete_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`image\` varchar(255) NOT NULL`);
    }

}
