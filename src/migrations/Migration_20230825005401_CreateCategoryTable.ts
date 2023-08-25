import { Migration } from '@mikro-orm/migrations';

export class Migration20230825005401_CreateCategoryTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "category" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updatet_at" timestamptz(0) not null, "name" varchar(255) not null, constraint "category_pkey" primary key ("id"));',
    );
  }
}
