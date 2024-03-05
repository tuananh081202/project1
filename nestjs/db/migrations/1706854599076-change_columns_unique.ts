import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnsUnique1706854599076 implements MigrationInterface {
    name = 'ChangeColumnsUnique1706854599076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`delete_at\` \`delete_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`categoryId\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`delete_at\` \`delete_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL DEFAULT ''1''`);
    }

}
