import { useState } from 'react'
import { Modal, Input, Form } from 'antd'
import img from '../../assets/Img/req.png'

const Requests = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [form] = Form.useForm()

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
    setIsReviewModalVisible(true)
  }

  const handleReviewCancel = () => {
    setIsReviewModalVisible(false)
    form.resetFields()
  }

  const handleAccept = () => {
    console.log('Request accepted:', form.getFieldsValue())
    setIsReviewModalVisible(false)
    form.resetFields()
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
                <p className="text-lg font-semibold">Spirit Airlines Company</p>
                <div className="mt-4 flex justify-between gap-8 2xl:flex-nowrap flex-wrap">
                  <button
                    className="bg-blue-500 flex-1 text-nowrap text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => showReviewModal(index)}
                  >
                    Review the request
                  </button>
                  <button
                    className="bg-red-500 flex-1 text-white text-nowrap px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => showModal(index)}
                  >
                    Delete Request
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
        <p>Are you sure you want to delete request?</p>
      </Modal>

      <Modal
        title="Review Request"
        visible={isReviewModalVisible}
        onCancel={handleReviewCancel}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleAccept}>
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[
              { required: true, message: 'Please input the company name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please input the phone number!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Website" name="website">
            <Input />
          </Form.Item>
          <Form.Item label="Social Media" name="socialMedia">
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: 'Please select the country!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 w-full rounded hover:bg-second"
            >
              Accept
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Requests
