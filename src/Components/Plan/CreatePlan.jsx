/* eslint-disable react/prop-types */

import { Form, Input, DatePicker } from 'antd'
import SharedDrawer from '../../Shared/Drawer'
import { SearchOutlined } from '@ant-design/icons'

const CreatePlan = ({ drawerVisible, onClose }) => {
  const onFinish = (values) => {
    console.log('Form values:', values)
  }

  return (
    <SharedDrawer
      visible={drawerVisible}
      onClose={onClose}
      title="Create a Trip"
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          tripName: '',
          destination: '',
          departing: null,
          returning: null,
        }}
      >
        <Form.Item
          label="Trip Name"
          name="tripName"
          rules={[{ required: true, message: 'Please input the trip name!' }]}
        >
          <Input
            placeholder="e.g., Summer Vacation in Russia"
            className="py-3"
          />
        </Form.Item>

        <Form.Item
          label="Destination"
          name="destination"
          rules={[{ required: true, message: 'Please input the destination!' }]}
        >
          <Input
            placeholder="Where To ?"
            prefix={<SearchOutlined />}
            className="py-3"
          />
        </Form.Item>

        <Form.Item
          label="Departing"
          name="departing"
          rules={[
            { required: true, message: 'Please select the departure date!' },
          ]}
        >
          <DatePicker
            placeholder="Select departure date"
            style={{ width: '100%' }}
            className="py-3"
          />
        </Form.Item>

        <Form.Item
          label="Returning"
          name="returning"
          rules={[
            { required: true, message: 'Please select the return date!' },
          ]}
        >
          <DatePicker
            placeholder="Select return date"
            style={{ width: '100%' }}
            className="py-3"
          />
        </Form.Item>

        <Form.Item className="mt-12 flex justify-center">
          <button className="py-4 px-24 bg-black text-white rounded-lg">
            Create Trip
          </button>
        </Form.Item>
      </Form>
    </SharedDrawer>
  )
}

export default CreatePlan
