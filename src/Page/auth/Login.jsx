import { Form, Input, Button, Typography, Row, Col, message } from 'antd'
import login from '../../assets/Img/login.png'
// import appleLogo from '../../assets/Img/apple.png'
import googleLogo from '../../assets/Img/google.png'
// import facebookLogo from '../../assets/Img/facebook.png'
import { Link, useNavigate } from 'react-router-dom'
import {
  useAuthGoogleMutation,
  useLoginUserMutation,
} from '../../app/Feature/API/User'
import Spinner from '../../Shared/Spinner'

const { Title, Text } = Typography

const Login = () => {
  const [form] = Form.useForm()
  const [loginUser, { isLoading, error }] = useLoginUserMutation()
  const [googleLogin, { isLoading: googleLoading, error: errGoogle }] =
    useAuthGoogleMutation()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      const response = await loginUser(values).unwrap()
      message.success('Account logged in successfully!')
      localStorage.setItem('userData', JSON.stringify(response?.data))
      localStorage.setItem('token-matroshka-user', response?.data?.token_value)
      form.resetFields()
      navigate('/')
    } catch (err) {
      console.error('Error logging in:', error?.data?.message)
      if (err?.data?.message) {
        message.error(`Error: ${error?.data?.message}`)
      } else {
        message.error('Login failed. Please try again.')
      }
    }
  }

  const handleSocialLogin = async () => {
    try {
      const response = await googleLogin().unwrap()
      console.log('Login successful:', response)
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  if (errGoogle) return <p>error: {errGoogle}</p>

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="bg-white shadow-lg rounded-lg overflow-auto h-full flex w-4/5 max-w-7xl text-black">
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center overflow-hidden">
          <Title level={3} className="text-gray-800">
            Log In
          </Title>
          <Text className="text-gray-900 overflow-hidden">
            Login to access your travelwise account
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

            <Form.Item>
              <Row justify="space-between" align="middle">
                <Col>
                  {/* <Checkbox name="terms" valuePropName="checked">
                      Remember me
                    </Checkbox> */}
                </Col>
                <Col>
                  <div className="text-center mt-6 text-semibold text-gray-700">
                    <Link
                      to="/forget-password"
                      className="text-red-700 hover:text-red-700"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </Col>
              </Row>
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
          <div className="text-center mt-6 text-semibold text-gray-700">
            Don’t have an account ?{' '}
            <Link to="/signup" className="text-primary hover:text-second">
              Sign up
            </Link>
          </div>
          <div className="mt-6 pb-8">
            <Row gutter={16} justify="center">
              <Col span={8}>
                <Button
                  className="social-button w-full"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <img
                    src={googleLogo}
                    alt="Google logo"
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '8px',
                    }}
                  />
                  {googleLoading ? <Spinner /> : 'Google'}
                </Button>
              </Col>
              {/* <Col span={8}>
                <Button
                  className="social-button w-full"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  <img
                    src={facebookLogo}
                    alt="Facebook logo"
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '8px',
                    }}
                  />
                  Facebook
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  className="social-button w-full"
                  onClick={() => handleSocialLogin('Apple')}
                >
                  <img
                    src={appleLogo}
                    alt="Apple logo"
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '8px',
                    }}
                  />
                  Apple
                </Button>
              </Col> */}
            </Row>
          </div>
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

export default Login
