import { Migration } from '@mikro-orm/migrations';

export class Migration20230827035511_CreateContactTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "contacts" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updatet_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) null, "category_id" varchar(255) null, constraint "contacts_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "contacts" add constraint "contacts_email_unique" unique ("email");',
    );

    this.addSql(
      'alter table "contacts" add constraint "contacts_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "contacts" cascade;');
  }
}
