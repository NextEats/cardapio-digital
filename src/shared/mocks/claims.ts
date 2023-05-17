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
        title: 'Criar produto',
        value: 'product.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir produto',
        value: 'product.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar produto',
        value: 'product.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os produtos',
        value: 'product.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
      {
        title: 'Mudar o status produtos',
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
        title: 'Criar adicional',
        value: 'additional.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir adicional',
        value: 'additional.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar adicional',
        value: 'additional.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os adicionals',
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
        title: 'Criar categoria do adicional',
        value: 'additional_category.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir categoria do adicional',
        value: 'additional_category.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar categoria do adicional',
        value: 'additional_category.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todas as categorias do adicional',
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
        title: 'Criar categoria do produto',
        value: 'product_category.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir categoria do produto',
        value: 'product_category.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar categoria do produto',
        value: 'product_category.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todas as categorias do produto',
        value: 'product_category.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-user',
    type: 'selects',
    title: 'Personalização',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar personalizações',
        value: 'selects.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir personalização',
        value: 'selects.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar personalização',
        value: 'selects.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todas as personalizações',
        value: 'selects.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-user',
    type: 'options',
    title: 'Opção',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar opção',
        value: 'options.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir opção',
        value: 'options.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar opção',
        value: 'options.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todas as opções',
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
        title: 'Criar pedido da mesa',
        value: 'order_table.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir pedido da mesa',
        value: 'order_table.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar pedido da mesa',
        value: 'order_table.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os pedidos da mesa',
        value: 'order_table.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-flag',
    type: 'order_table',
    title: 'Mesa',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar mesa',
        value: 'order_table.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir mesa',
        value: 'order_table.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar mesa',
        value: 'order_table.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todas as mesas',
        value: 'order_table.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-flag',
    type: 'delivery_fee',
    title: 'Taxa de entrega',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Criar taxa de entrega',
        value: 'delivery_fee.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir taxa de entrega',
        value: 'delivery_fee.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar taxa de entrega',
        value: 'delivery_fee.update',
        color: '#f5bd00',
      },
      {
        title: 'Listar todas as taxas de entrega',
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
        title: 'Criar horário de abertura',
        value: 'week_operation_day.create',
        color: '#5AA454',
      },
      {
        title: 'Excluir horário de abertura',
        value: 'week_operation_day.delete',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Editar horário de abertura',
        value: 'week_operation_day.update',
        color: '#f5bd00',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Mudar o status do horário de abertura',
        value: 'week_operation_day.changeStatus',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os horário de abertura',
        value: 'week_operation_day.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
      },
    ],
  },
  {
    icon: 'fa-solid fa-flag',
    type: 'whatsapp',
    title: 'WhatsApp',
    selected: false,
    claims: [
      {
        icon: 'fa-solid fa-square-plus',
        title: 'Escaner qr code whatsapp',
        value: 'whatsapp.readQrCode',
        color: '#5AA454',
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
        title: 'Mudar o status do pedido',
        value: 'order.changeStatus',
        color: '#5AA454',
      },
      {
        title: 'Cancelar pedido',
        value: 'order.cancel',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Imprimir o pedido',
        value: 'order.print',
        color: '#f5bd00',
      },
      {
        title: 'Listar todos os pedido',
        value: 'order.listAll',
        icon: 'fa-solid fa-square-poll-horizontal',
        color: '#23A6F0',
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
        title: 'Abrir o caixa',
        value: 'cach_box.open',
        color: '#5AA454',
      },
      {
        title: 'Fechar o caixa',
        value: 'cach_box.close',
        icon: 'fa-solid fa-square-minus',
        color: '#f93e3e',
      },
      {
        icon: 'fa-solid fa-square-pen',
        title: 'Ver o as informações do caixa',
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
        title: 'Mudar o status do metódo de pagamento',
        value: 'payment_mathod.changeStatus',
        color: '#5AA454',
      },
      {
        title: 'Listar todos os metódos de pagamento',
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
