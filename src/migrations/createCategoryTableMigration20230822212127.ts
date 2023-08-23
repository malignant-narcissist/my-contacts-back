import { Migration } from '@mikro-orm/migrations';

export class createCategoryTableMigration20230822212127 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE TABLE "category" ( "id" uuid not null, "created_at" timestamptz(0) not null, "updatet_at" timestamptz(0) not null, "name" varchar(255) not null, constraint "category_pkey" primary key ("id"));`,
    );
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE "category";');
  }
}
