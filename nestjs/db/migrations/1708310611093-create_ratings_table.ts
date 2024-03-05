import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRatingsTable1708310611093 implements MigrationInterface {
    name = 'CreateRatingsTable1708310611093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`rating\``);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD \`rating\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`comment\``);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD \`comment\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rating\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`rating\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`rating\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`image\` \`image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`status\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`categoryId\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_a6c53dfc89ba3188b389ef29a62\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_1fdf6f092aa907177771948f6a1\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_1fdf6f092aa907177771948f6a1\``);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_a6c53dfc89ba3188b389ef29a62\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`rating\` CHANGE \`productId\` \`productId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rating\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rating\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`comment\``);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD \`comment\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`rating\``);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD \`rating\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL DEFAULT ''1''`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`productId\` int NULL DEFAULT 'NULL'`);
    }

}
