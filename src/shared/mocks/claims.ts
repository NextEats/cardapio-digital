export const claims: claimType[] = [
  {
    icon: 'fa-solid fa-user',
    type: 'User',
    title: 'Usuário',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar usuário',
        value: 'User.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir usuário',
        value: 'User.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar usuário',
        value: 'User.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os usuários',
        value: 'User.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-layer-group',
    type: 'product',
    title: 'Produto',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar repositório',
        value: 'product.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir repositório',
        value: 'product.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar repositório',
        value: 'product.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os repositórios',
        value: 'product.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
      {
        title: 'Listar todos os repositórios',
        value: 'product.changeStatus',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-file',
    type: 'additional',
    title: 'Adicional',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar arquivo',
        value: 'additional.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir arquivo',
        value: 'additional.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar arquivo',
        value: 'additional.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar arquivos dos usuários',
        value: 'additional.listAll',
        icon: 'fa-brands fa-odnoklassniki-square',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-user',
    type: 'additional_category',
    title: 'Categoria do adicional',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar usuário',
        value: 'additional_category.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir usuário',
        value: 'additional_category.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar usuário',
        value: 'additional_category.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os usuários',
        value: 'additional_category.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-user',
    type: 'product_category',
    title: 'Categoria do produto',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar usuário',
        value: 'product_category.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir usuário',
        value: 'product_category.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar usuário',
        value: 'product_category.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os usuários',
        value: 'product_category.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-user',
    type: 'selects',
    title: 'Personalizações',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar usuário',
        value: 'selects.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir usuário',
        value: 'selects.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar usuário',
        value: 'selects.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os usuários',
        value: 'selects.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-user',
    type: 'options',
    title: 'Personalizações',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar usuário',
        value: 'options.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir usuário',
        value: 'options.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar usuário',
        value: 'options.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os usuários',
        value: 'options.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-flag',
    type: 'order_table',
    title: 'Pedido da mesa',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar cargo',
        value: 'order_table.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir cargo',
        value: 'order_table.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar cargo',
        value: 'order_table.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os cargos',
        value: 'order_table.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-flag',
    type: 'delivery_fee',
    title: 'Taca de entrega',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar cargo',
        value: 'delivery_fee.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir cargo',
        value: 'delivery_fee.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar cargo',
        value: 'delivery_fee.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os cargos',
        value: 'delivery_fee.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-flag',
    type: 'week_operation_day',
    title: 'Horário de abertura',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar cargo',
        value: 'week_operation_day.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir cargo',
        value: 'week_operation_day.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar cargo',
        value: 'week_operation_day.update',
        color: '#f5bd00',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar cargo',
        value: 'week_operation_day.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os cargos',
        value: 'week_operation_day.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-flag',
    type: 'order',
    title: 'Pedido da mesa',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar cargo',
        value: 'order.changeStatus',
        color: '#5AA454',
      },
    ],
  },
  {
    icon: 'fa-solid fa-flag',
    type: 'cach_box',
    title: 'Caixa',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar cargo',
        value: 'cach_box.open',
        color: '#5AA454',
      },
      {
        title: 'Excluir cargo',
        value: 'cach_box.close',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar cargo',
        value: 'cach_box.view',
        color: '#f5bd00',
      },
    ],
  },
  {
    icon: 'fa-solid fa-flag',
    type: 'payment_mathod',
    title: 'Metódo de pagamento',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar cargo',
        value: 'payment_mathod.changeStatus',
        color: '#5AA454',
      },
      {
        title: 'Listar todos os cargos',
        value: 'payment_mathod.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-chart-column',
    type: 'Dashboard',
    title: 'Painel Administrativo',
    selected: false,
    claims: [
      {
        title: 'Ver painel administrativo',
        value: 'Dashboard.read',
        icon: 'fa-solid fa-square-poll-vertical',
        color: '#23A6F0',
      },
    ],
  },
];

export interface claimType {
  icon?: string;
  type: string;
  title: string;
  claims: IClaim[];
  selected?: boolean;
}

export interface IClaim {
  icon?: string;
  title: string;
  value: string;
  selected?: boolean;
  color?: string;
}
