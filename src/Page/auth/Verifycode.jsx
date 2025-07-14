import { Form, Input, Button, Typography, message } from 'antd'
import login from '../../assets/Img/login.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from '../../app/Feature/API/User'

const { Title, Text } = Typography

const Verifycode = () => {
  const [form] = Form.useForm()
  const [verifyEmail, { isLoading, error }] = useVerifyEmailMutation()
  const [resendOtp] = useResendOtpMutation()
  const navigate = useNavigate()
  const params = useParams()
  const onFinish = async (values) => {
    try {
      await verifyEmail(values).unwrap()
      message.success('Email verified successfully!')
      navigate('/login')
    } catch (err) {
      console.error('Error verifying email:', err)
      if (error?.data?.message) {
        message.error(`Error: ${error.data.message}`)
      } else {
        message.error('Failed to verify email. Please try again.')
      }
    }
  }

  const handleResendCode = async () => {
    const email = form.getFieldValue('email')
    if (!email) {
      message.warning('Please enter your email before resending the code.')
      return
    }

    try {
      await resendOtp({ email }).unwrap()
      message.success('Code resent successfully!')
    } catch (err) {
      console.error('Error resending code:', err)
      message.error('Failed to resend code. Please try again.')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="bg-white shadow-lg rounded-lg overflow-auto h-full flex w-4/5 max-w-7xl">
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center">
          <Title level={3} className="text-gray-800">
            Verify Code
          </Title>
          <Text className="text-gray-500">
            An authentication code has been sent to your email.
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
              rules={[{ required: true, message: 'Please enter your OTP!' }]}
            >
              <Input.Password placeholder="Enter your OTP" />
            </Form.Item>

            <Form.Item>
              Didn’t receive a code?{' '}
              <span
                className="text-primary cursor-pointer hover:text-primary"
                onClick={handleResendCode}
              >
                Resend
              </span>
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
                Verify
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-6 text-semibold text-gray-700">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary">
              Sign up
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 items-center">
          <img
            src={login}
            alt="Sign up illustration"
            className="object-contain w-full h-[80%]"
          />
        </div>
      </div>
    </div>
  )
}

export default Verifycode
