const payment_method_list = [
  'Dinheiro',
  'Crédito',
  'Débito',
  'Pix/Transferência',
  'outro',
];

const expense_type_list = [
  'Despesas da casa',
  'Benfeitorias para casa',
  'Despesas fixas',
  'Despesas animais',
  'Despesas automóvel',
  'Superfluo',
  'Outros',
];

exports.up = (knex) =>
  knex.schema.createTable('expenses', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').notNull();
    table.enum('payment_method', payment_method_list).default('Dinheiro');
    table.enum('expense_type', expense_type_list);
    table.decimal('expense_amount', 12, 2).notNullable();
    table.string('description');
    table.boolean('paid_out').notNull().default(false);
    table.date('expense_date').notNull();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('expenses');
