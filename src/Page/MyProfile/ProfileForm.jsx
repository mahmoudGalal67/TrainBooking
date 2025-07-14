import { Form, Input, Button, Select, message } from 'antd'
import { useState, useRef } from 'react'
import {
  useGetProfileDataQuery,
  useUpdateProfileMutation,
} from '../../app/Feature/API/User'
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumber } from 'libphonenumber-js'
import Spinner from '../../Shared/Spinner'

const { Option } = Select

const UpdateProfile = () => {
  const { data: userData, isLoading } = useGetProfileDataQuery()
  const [phone, setPhone] = useState('')
  const formRef = useRef(null)

  const [updateProfile, { isLoading: loadingUpdate }] =
    useUpdateProfileMutation()


  

  const initialValues = userData?.users || {}

  const onFinish = async () => {
    const values = formRef.current.getFieldsValue()
    let phone_country = userData.users.country
    let phone_number = userData.users.phone

    if (phone) {
      const phoneNumber = parsePhoneNumber(phone)
      phone_country = phoneNumber?.country || ''
      phone_number = phoneNumber?.nationalNumber || ''
    }

    try {
      const formData = {
        ...values,
        phone_country,
        phone_number,
      }

      await updateProfile(formData).unwrap()
      message.success('Data updated successfully!')
    } catch (error) {
      console.error('Failed to update user:', error)
      message.error('An error occurred')
    }
  }

  const onFinishFailed = (errorInfo) => {
    message.error('Form submission failed')
    console.log(errorInfo)
  }

  const formItemClass = `bg-white text-black input-custom`
  const labelClass = `text-black`
  const buttonClass = `bg-primary-yellow text-white hover:bg-[goldenrod] mt-5 mb-5 p-5 w-full`

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex justify-center  min-h-screen w-full">
      <div className="px-8 rounded-lg w-full">
        <Form
          name="update-profile"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          ref={formRef}
          initialValues={initialValues}
        >
          <p className="text-3xl text-gray-700 mb-8 text-center font-semibold">
            My Profile
          </p>
          <Form.Item
            label={<span className={labelClass}>name</span>}
            name="name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input placeholder="Enter your name" className={formItemClass} />
          </Form.Item>

          <Form.Item
            label={<span className={labelClass}>Phone</span>}
            name="phone"
          >
            <PhoneInput
              className="phone-input"
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
            />
          </Form.Item>

          <Form.Item
            label={<span className={labelClass}>Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter your email" className={formItemClass} />
          </Form.Item>

          <Form.Item
            label={<span className={labelClass}>Gender</span>}
            name="gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select placeholder="Select Gender" className="select-custom">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" className={buttonClass}>
            {loadingUpdate ? <Spinner /> : 'Update'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default UpdateProfile
