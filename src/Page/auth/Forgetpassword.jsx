import { Form, Input, Button, Typography, message } from 'antd'
import ForgetpasswordImg from '../../assets/Img/Forgetpassword.png'
import { useResendOtpMutation } from '../../app/Feature/API/User'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const Forgetpassword = () => {
  const [form] = Form.useForm()
  const [resendOtp, { isLoading, error }] = useResendOtpMutation()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      await resendOtp(values).unwrap()
      message.success('Account created successfully!')
      navigate(`/set-password/${encodeURIComponent(values.email)}`)
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
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="bg-white shadow-lg rounded-lg overflow-auto h-full flex w-4/5 max-w-7xl">
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center">
          <Title level={3} className="text-gray-800">
            Forgot your password?
          </Title>
          <Text className="text-gray-500">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </Text>
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                aria-label="Login"
                loading={isLoading}
                className="overflow-hidden"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="hidden lg:flex lg:w-1/2 items-center">
          <img
            src={ForgetpasswordImg}
            alt="Sign up illustration"
            className="object-contain w-full h-[80%]"
          />
        </div>
      </div>
    </div>
  )
}

export default Forgetpassword
