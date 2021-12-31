import {MigrationInterface, QueryRunner} from "typeorm";

export class initialize1639566631052 implements MigrationInterface {
    name = 'initialize1639566631052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_category" ("id" character varying NOT NULL, "categoryName" character varying NOT NULL, CONSTRAINT "UQ_89adc92bf83a24c875fc5a7e87b" UNIQUE ("categoryName"), CONSTRAINT "PK_2f133fd8aa7a4d85ff7cd6f7c98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_role" ("id" character varying NOT NULL, "roleName" character varying NOT NULL, CONSTRAINT "UQ_d0de24b67e93878c5beb80a24ce" UNIQUE ("roleName"), CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "roleId" character varying NOT NULL DEFAULT 'student', "phoneNumber" character varying DEFAULT '', "profilePicture" character varying DEFAULT '', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enroll" ("userId" integer NOT NULL, "courseId" integer NOT NULL, "active" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_20fef8b84ef332379b851c00a6f" PRIMARY KEY ("userId", "courseId"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "courseName" character varying NOT NULL, "courseCode" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "userId" integer NOT NULL, "categoryId" character varying NOT NULL, "view" integer NOT NULL DEFAULT '0', "numberOfStudent" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enroll" ADD CONSTRAINT "FK_835d20e5eed0e0f3e4496235be2" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enroll" ADD CONSTRAINT "FK_7530922a88a2c9fdb9496677dc6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_bceb52bbd16679020822f6d6f5d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_c6c48d73b3b32e47e9cc1cfc4c4" FOREIGN KEY ("categoryId") REFERENCES "course_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_c6c48d73b3b32e47e9cc1cfc4c4"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_bceb52bbd16679020822f6d6f5d"`);
        await queryRunner.query(`ALTER TABLE "enroll" DROP CONSTRAINT "FK_7530922a88a2c9fdb9496677dc6"`);
        await queryRunner.query(`ALTER TABLE "enroll" DROP CONSTRAINT "FK_835d20e5eed0e0f3e4496235be2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "enroll"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP TABLE "course_category"`);
    }

}
