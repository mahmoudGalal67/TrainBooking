import { Col, Table } from 'antd'
import { useGetPaymentsStripeUserQuery } from '../../app/Feature/API/Payment'
import Spinner from '../../Shared/Spinner'

const MyOrders = () => {
  const { data, isLoading } = useGetPaymentsStripeUserQuery()
  console.log(data)

  if (isLoading) {
    return <Spinner />
  }

  if (!data?.payments?.length) {
    return (
      <div className="flex justify-center min-h-screen w-full">
        <p className="text-3xl text-gray-700 mb-8 text-center font-semibold">
          No Data Available
        </p>
      </div>
    )
  }

  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: ['user', 'name'],
      key: '',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `$${parseFloat(text).toFixed(2)}`,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Products',
      dataIndex: 'description',
      key: 'description',
      render: (description) =>
        description
          ?.map((product) => `${product.name} (x${product.quantity})`)
          .join(', '),
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
    },
    {
      title: 'Cashback',
      dataIndex: ['cashback', 'cashback_amount'],
      key: 'cashback',
      render: (text) => (text ? `$${parseFloat(text).toFixed(2)}` : '-'),
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleString(),
    },
  ]

  return (
    <div className="flex justify-center min-h-screen w-full">
      <div className="px-8 rounded-lg w-full">
        <p className="text-3xl text-gray-700 mb-8 text-center font-semibold">
          My Orders
        </p>
        <Col xl={24} xs={24} sm={24}>
          <Table
            dataSource={data?.payments || []}
            columns={columns}
            className="mt-4"
            pagination
            rowKey="id"
          />
        </Col>
      </div>
    </div>
  )
}

export default MyOrders
