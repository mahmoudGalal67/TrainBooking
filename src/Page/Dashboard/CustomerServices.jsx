import { useState } from 'react'
import { Col, Table, Button, Modal, Form, Input, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useGetAllUsersQuery } from '../../app/Feature/API/Admin/ShowUsers'
import { useSaveUserMutation } from '../../app/Feature/API/User'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const CustomerServices = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [saveUser, { isLoading: saveLoading }] = useSaveUserMutation()
  const { data: Users, isLoading } = useGetAllUsersQuery({
    type: 'customerServices',
    page: currentPage,
  })

  const [form] = Form.useForm()

  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneCountry, setPhoneCountry] = useState('')

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

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleSaveUser = async () => {
    const values = await form.validateFields()
    saveUser({
      name: values.username,
      email: values.email,
      password: values.password,
      phone: phoneNumber,
      country: 'US',
      phone_country: phoneCountry,
      gender: values.gender,
      type: 'customerServices',
    })
  }

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
    <div className="p-6 pt-4 bg-white rounded-lg shadow">
      <Col xl={24} xs={24} sm={24} className="text-end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          style={{ marginBottom: '16px' }}
        >
          Add Customer Services
        </Button>
      </Col>
      <Col xl={24} xs={24} sm={24}>
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
      </Col>

      <Modal
        title="Add Customer Services"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={saveLoading}
            onClick={handleSaveUser}
          >
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter username!' }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters',
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message:
                  'Password must contain at least one uppercase, one lowercase, one number, and one special character.',
              },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter email!' }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please enter phone number!' }]}
          >
            <PhoneInput
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              international
              defaultCountry="US"
              onCountryChange={setPhoneCountry}
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select placeholder="Select gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CustomerServices
