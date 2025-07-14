import { Table } from 'antd'
import {
  FaTimes,
  FaUserCog,
  FaUsers,
  FaCar,
  FaPlane,
  FaWallet,
  FaBed,
  FaRegCheckCircle,
  FaMoneyBill,
} from 'react-icons/fa'
import { useState } from 'react'
import { useGetAllUsersQuery } from '../../app/Feature/API/Admin/ShowUsers'

const stats = [
  { icon: <FaUsers />, label: 'Users', count: 10, color: 'text-blue-500' },
  { icon: <FaBed />, label: 'Hotels', count: 5, color: 'text-green-500' },
  { icon: <FaCar />, label: 'Cars', count: 8, color: 'text-red-500' },
  {
    icon: <FaUserCog />,
    label: 'Services',
    count: 12,
    color: 'text-purple-500',
  },
  {
    icon: <FaPlane />,
    label: 'Booked Flights',
    count: 20,
    color: 'text-yellow-500',
  },
  {
    icon: <FaRegCheckCircle />,
    label: 'Trips Done',
    count: 15,
    color: 'text-teal-500',
  },
  { icon: <FaTimes />, label: 'Cancelled', count: 3, color: 'text-orange-500' },
  {
    icon: <FaWallet />,
    label: 'Profits',
    count: '$1,500',
    color: 'text-indigo-500',
  },
  {
    icon: <FaMoneyBill />,
    label: 'Hotel reserved',
    count: '13,105',
    color: 'text-green-500',
  },
]

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: Users, isLoading } = useGetAllUsersQuery({
    type: 'user',
    page: currentPage,
  })

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
  ]

  const dataSource = Users?.users?.data?.map((user) => ({
    key: user.id,
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    country: user.country,
    gender: user.gender,
  }))

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
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

      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <Table
          dataSource={dataSource}
          columns={columns}
          className="mt-4"
          loading={isLoading}
          pagination={{
            current: Users?.users?.current_page,
            pageSize: Users?.users?.per_page,
            total: Users?.users?.last_page,
            onChange: (page) => {
              setCurrentPage(page)
            },
          }}
        />
      </div>
    </>
  )
}

export default Index
