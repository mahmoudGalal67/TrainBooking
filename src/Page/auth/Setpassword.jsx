import { Form, Input, Button, Typography, message } from 'antd'
import forget from '../../assets/Img/Forgetpassword.png'
import { useResetPasswordMutation } from '../../app/Feature/API/User'
import { useNavigate, useParams } from 'react-router-dom'

const { Title, Text } = Typography

const SetPassword = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation()
  const params = useParams()
  const onFinish = async (values) => {
    if (values.password !== values.password_confirmation) {
      message.error('Passwords do not match!')
      return
    }

    try {
      await resetPassword(values).unwrap()
      message.success('Password has been set successfully!')
      form.resetFields()
      navigate('/login')
    } catch (err) {
      console.error('Error setting password:', err)
      if (error?.data?.message) {
        message.error(`Error: ${error.data.message}`)
      } else {
        message.error('Failed to set password. Please try again.')
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="bg-white shadow-lg rounded-lg overflow-auto h-full flex w-4/5 max-w-7xl">
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center">
          <Title level={3} className="text-gray-800">
            Set a password
          </Title>
          <Text className="text-gray-500">
            Your previous password has been reset. Please set a new password for
            your account.
          </Text>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            aria-labelledby="reset-password-form"
            className="mt-6 overflow-hidden"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
              initialValue={params?.email}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="OTP"
              name="otp"
              rules={[{ required: true, message: 'Please enter the OTP!' }]}
            >
              <Input placeholder="Enter the OTP" />
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

            <Form.Item
              label="Confirm Password"
              name="password_confirmation"
              rules={[
                { required: true, message: 'Please confirm your password!' },
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                aria-label="Set Password"
                loading={isLoading}
                className="overflow-hidden"
              >
                Set Password
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="hidden lg:flex lg:w-1/2 items-center">
          <img
            src={forget}
            alt="Password reset illustration"
            className="object-contain w-full h-[80%]"
          />
        </div>
      </div>
    </div>
  )
}

export default SetPassword
