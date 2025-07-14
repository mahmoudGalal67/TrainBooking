import { Form, Input, Button, Typography, message } from 'antd'
import login from '../../assets/Img/login.png'
import {  useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../app/Feature/API/User'

const { Title, Text } = Typography

const LoginAdmin = () => {
  const [form] = Form.useForm()
  const [loginUser, { isLoading, error }] = useLoginUserMutation()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      const response = await loginUser(values).unwrap()
      message.success('Account logged in successfully!')
      localStorage.setItem('userData', JSON.stringify(response?.data))
      localStorage.setItem('token-matroshka-admin', response?.data?.token_value)
      form.resetFields()
      navigate('/Dashboard')
    } catch (err) {
      console.error('Error logging in:', error?.data?.message)
      if (err?.data?.message) {
        message.error(`Error: ${error?.data?.message}`)
      } else {
        message.error('Login failed. Please try again.')
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="bg-white shadow-lg rounded-lg overflow-auto h-full flex w-4/5 max-w-7xl text-black">
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center overflow-hidden">
          <Title level={3} className="text-gray-800">
            Log In
          </Title>
          <Text className="text-gray-900 overflow-hidden">Login to access</Text>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            aria-labelledby="signup-form"
            className="mt-6 overflow-hidden"
          >
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

            <Form.Item className="overflow-hidden">
              <Button
                type="primary"
                htmlType="submit"
                block
                aria-label="Login"
                loading={isLoading}
                className="overflow-hidden"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="hidden lg:flex lg:w-1/2 items-center">
          <img
            src={login}
            alt="Sign up illustration"
            className="object-contain w-full h-[80%]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default LoginAdmin
