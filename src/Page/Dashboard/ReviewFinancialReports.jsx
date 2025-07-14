import { Row, Col, Table, Tabs, DatePicker, Typography } from 'antd'
import { MdOutlineAccountBalance } from 'react-icons/md'
import { GiStairsGoal } from 'react-icons/gi'
import { SiExpensify } from 'react-icons/si'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import Avatar from 'antd/lib/avatar'
import { UserOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Title } = Typography

const FinancialDashboard = () => {
  const dataSource = [
    {
      key: '1',
      avatar: <Avatar icon={<UserOutlined />} />,
      user: 'John Doe',
      transaction: 'Bill Payment',
      date: '2024-10-01',
      amount: '200.00',
      method: 'Credit Card',
    },
    {
      key: '2',
      avatar: <Avatar icon={<UserOutlined />} />,
      user: 'Jane Smith',
      transaction: 'Product Purchase',
      date: '2024-10-02',
      amount: '150.00',
      method: 'PayPal',
    },
    {
      key: '3',
      avatar: <Avatar icon={<UserOutlined />} />, // Avatar placeholder
      user: 'Michael Johnson',
      transaction: 'Hotel Revenue',
      date: '2024-10-03',
      amount: '300.00',
      method: 'Cash',
    },
    {
      key: '1',
      avatar: <Avatar icon={<UserOutlined />} />, // Avatar placeholder
      user: 'John Doe',
      transaction: 'Bill Payment',
      date: '2024-10-01',
      amount: '200.00',
      method: 'Credit Card',
    },
    {
      key: '2',
      avatar: <Avatar icon={<UserOutlined />} />, // Avatar placeholder
      user: 'Jane Smith',
      transaction: 'Product Purchase',
      date: '2024-10-02',
      amount: '150.00',
      method: 'PayPal',
    },
  ]

  const columns = [
    {
      title: 'User',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {record.avatar}
          <span style={{ marginLeft: 8 }}>{record.user}</span>
        </div>
      ),
    },
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `$${parseFloat(text).toFixed(2)}`,
    },
    {
      title: 'Payment Method',
      dataIndex: 'method',
      key: 'method',
    },
  ]

  const stats = [
    {
      label: 'Balance',
      count: '$10,000',
      color: 'text-green-500',
      icon: <MdOutlineAccountBalance />,
    },
    {
      label: 'Incomes',
      count: '$150',
      color: 'text-blue-500',
      icon: <GiStairsGoal />,
    },
    {
      label: 'Expenses',
      count: '$20',
      color: 'text-orange-500',
      icon: <SiExpensify />,
    },
  ]

  const pieData = [
    { name: 'Hotels', value: 300 },
    { name: 'Credit Card', value: 200 },
    { name: 'Carts', value: 150 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="p-6 pt-4 bg-white rounded-lg shadow">
      <Row justify="space-between" align="middle" className="mb-4">
        <Col>
          <Tabs defaultActiveKey="1" animated>
            <TabPane tab="This Month" key="1" />
            <TabPane tab="Last Month" key="2" />
            <TabPane tab="This Year" key="3" />
            <TabPane tab="Last 12 Months" key="4" />
          </Tabs>
        </Col>
        <Col>
          <RangePicker style={{ width: 300 }} />
        </Col>
      </Row>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 mb-8 rounded-lg border flex items-center transition-transform transform"
          >
            <div className={`${stat.color} mr-4 text-4xl`}>{stat.icon}</div>
            <div>
              <h3 className="font-bold text-xl">{stat.label}</h3>
              <p className="text-xl text-gray-600 text-extrabold">
                {stat.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Row gutter={16}>
        <Col xl={8} xs={24} sm={24}>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx={200}
              cy={200}
              labelLine={false}
              label={(entry) => `${entry.name}: ${entry.value}`}
              outerRadius={80}
              fill="#8884d8"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>
        <Col xl={16} xs={24} sm={24}>
          <Title level={4}>Last Transactions</Title>
          <Table
            dataSource={dataSource}
            columns={columns}
            className="mt-4"
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  )
}

export default FinancialDashboard
