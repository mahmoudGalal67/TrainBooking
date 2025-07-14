import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Select,
  message,
} from 'antd'
import 'antd/dist/reset.css'
import signup from '../../assets/Img/signup.png'
import { Link } from 'react-router-dom'
import { useSaveUserMutation } from '../../app/Feature/API/User'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import { parsePhoneNumber } from 'libphonenumber-js'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography
const { Option } = Select

const Signup = () => {
  const [form] = Form.useForm()
  const [saveUser, { isLoading, error }] = useSaveUserMutation()
  const [value, setValue] = useState()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    const type = 'user'
    let phone_country = ''
    let phone_number = ''
    if (value) {
      const phoneNumber = parsePhoneNumber(value)
      phone_country = phoneNumber?.country || ''
      phone_number = phoneNumber?.nationalNumber || ''
    }

    const userData = { ...values, type, phone_country, phone_number }

    try {
      await saveUser(userData).unwrap()
      message.success('Account created successfully!')
      navigate(`/verify-code/${encodeURIComponent(values.email)}`)
      form.resetFields()
    } catch (err) {
      console.error('Error saving user:', err)
      if (error) {
        message.error(`Failed to create account: ${error?.data?.message}`)
      } else if (error?.data?.message) {
        message.error(`Error: ${error?.data?.message}`)
      } else {
        message.error('Failed to create account. Please try again.')
      }
    }
  }

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Passwords do not match!'))
    },
  })
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="bg-white shadow-lg rounded-lg overflow-auto h-full flex w-4/5 max-w-7xl">
        <div className="hidden lg:flex lg:w-1/2 items-center">
          <img
            src={signup}
            alt="Sign up illustration"
            className="object-contain w-full h-[80%]"
            loading="lazy"
            width="100%"
          />
        </div>

        <div className="w-full lg:w-1/2 p-6 lg:p-10 lg:pb-0 lg:pl-0 overflow-auto">
          <Title level={3} className="text-gray-800">
            Sign Up
          </Title>
          <Text className="text-gray-500">
            Let’s get you all set up so you can access your personal account.
          </Text>

          <Form
            form={form}
            layout="vertical"
            className="mt-4"
            onFinish={onFinish}
            autoComplete="off"
            aria-labelledby="signup-form"
          >
            <div id="signup-form" className="sr-only">
              Signup Form
            </div>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="User Name"
                  name="name"
                  rules={[
                    { required: true, message: 'Please enter your user name!' },
                  ]}
                >
                  <Input placeholder="Enter your user name" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please enter a valid email!',
                    },
                  ]}
                >
                  <Input placeholder="john.doe@gmail.com" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your phone number!',
                    },
                  ]}
                >
                  <PhoneInput
                    className="phone-input"
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[
                    { required: true, message: 'Please select your gender!' },
                  ]}
                >
                  <Select placeholder="Select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
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
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    validateConfirmPassword,
                  ]}
                >
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                aria-label="Create Account"
                loading={isLoading}
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-0 text-semibold text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
