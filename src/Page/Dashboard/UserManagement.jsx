import { useState } from 'react'
import { Modal, Input, Form, Button } from 'antd'
import img from '../../assets/Img/img.png'
import img2 from '../../assets/Img/2.png'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

const transactions = [
  {
    id: 1,
    name: 'Payment from Sarah',
    amount: 200,
    date: 'Today, 29 Aug at 09.00',
    profit: true,
  },
  {
    id: 2,
    name: 'Refund to John',
    amount: 75,
    date: 'Today, 29 Aug at 11.30',
    profit: false,
  },
  {
    id: 3,
    name: 'Payment from Emma',
    amount: 300,
    date: 'Today, 29 Aug at 12.00',
    profit: true,
  },
  {
    id: 4,
    name: 'Payment from Mike',
    amount: 120,
    date: 'Today, 29 Aug at 14.15',
    profit: true,
  },
  {
    id: 5,
    name: 'Payment from Lisa',
    amount: 90,
    date: 'Today, 29 Aug at 15.00',
    profit: false,
  },
  {
    id: 6,
    name: 'Payment from Alex',
    amount: 250,
    date: 'Today, 29 Aug at 16.45',
    profit: true,
  },
  {
    id: 7,
    name: 'Refund to David',
    amount: 60,
    date: 'Today, 29 Aug at 17.30',
    profit: false,
  },
  {
    id: 8,
    name: 'Payment from Rachel',
    amount: 180,
    date: 'Today, 29 Aug at 18.00',
    profit: true,
  },
  {
    id: 9,
    name: 'Payment from James',
    amount: 70,
    date: 'Today, 29 Aug at 19.15',
    profit: false,
  },
]

const UserManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isUserModalVisible, setIsUserModalVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)

  const showModal = (index) => {
    setCurrentIndex(index)
    setIsModalVisible(true)
  }

  const handleDelete = () => {
    console.log(`Request ${currentIndex + 1} deleted.`)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showReviewModal = (index) => {
    setCurrentIndex(index)
  }

  const showUserModal = () => {
    setIsUserModalVisible(true)
  }

  const handleUserModalCancel = () => {
    setIsUserModalVisible(false)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <div key={index} className="relative rounded-lg shadow-md bg-white">
              <div className="relative">
                <img
                  src={img}
                  alt={`Item ${index + 1}`}
                  className="w-full h-[325px] object-cover rounded-t-lg"
                />
              </div>
              <div className="mt-4 px-4 pb-4">
                <p className="text-lg font-semibold">Mohamed Ahmed</p>
                <div className="mt-4 flex justify-between gap-8 2xl:flex-nowrap flex-wrap">
                  <button
                    className="bg-blue-500 flex-1 text-nowrap text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => {
                      showUserModal()
                      showReviewModal(index)
                    }}
                  >
                    View Profile
                  </button>
                  <button
                    className="bg-red-500 flex-1 text-white text-nowrap px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => showModal(index)}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        centered
      >
        <p>Are you sure you want to delete Profile?</p>
      </Modal>
      <Modal
        visible={isUserModalVisible}
        onCancel={handleUserModalCancel}
        footer={
          <Button type="primary" style={{ marginBottom: '16px' }}>
            Freeze account
          </Button>
        }
        width="100%"
        bodyStyle={{ padding: '20px' }}
        style={{ top: 0, width: '100%' }}
        wrapClassName="full-width-modal"
      >
        <div className="flex items-center mb-4">
          <img src={img} alt="User Avatar" className="w-20 h-20 rounded-full" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Mohamed Ahmed</h2>
            <p className="text-gray-500">User</p>
          </div>
        </div>
        <div className="flex gap-12 md:flex-row flex-col">
          <Form layout="vertical" className="md:flex-[.5] flex-1">
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Card Number" name="cardNum">
              <Input />
            </Form.Item>
            <Form.Item label="Currency" name="currency">
              <Input />
            </Form.Item>
            <Form.Item label="Country" name="country">
              <Input />
            </Form.Item>
          </Form>
          <div className="flex-1 p-4 pt-0 bg-white shadow-md rounded-lg">
            <h3 className="mt-6 text-lg font-semibold text-gray-800">
              Last Transactions
            </h3>
            <ul className="mt-2 max-h-[487px] overflow-auto pr-2">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="flex items-center justify-between border-b py-2 hover:bg-gray-100 transition duration-300"
                >
                  <div className="flex items-center">
                    <img
                      src={img2}
                      alt={transaction.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-700 font-medium">
                        {transaction.name}
                      </span>
                      <span className="text-gray-500">{transaction.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`${transaction.profit ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}`}
                    >
                      {transaction.profit ? '+' : '-'}${transaction.amount}
                    </span>
                    {transaction.profit ? (
                      <FaArrowUp className="ml-2 text-green-600" />
                    ) : (
                      <FaArrowDown className="ml-2 text-red-600" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UserManagement
