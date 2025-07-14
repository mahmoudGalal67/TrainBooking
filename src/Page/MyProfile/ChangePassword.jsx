import { Form, Input, Button, message } from 'antd'
import { useChangeYourPasswordMutation } from '../../app/Feature/API/User'
import Spinner from '../../Shared/Spinner'

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangeYourPasswordMutation()
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    const { oldPassword, newPassword, confirmPassword } = values

    if (newPassword !== confirmPassword) {
      message.error('New password and confirm password do not match!')
      return
    }

    try {
      await changePassword({
        current_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      }).unwrap()
      message.success('Password changed successfully!')
      form.resetFields()
    } catch (error) {
      message.error(error?.data?.message || 'Failed to change password')
      if (error?.data?.current_password) {
        message.error(error.data.current_password[0])
      }
      if (error?.data?.new_password) {
        message.error(error.data.new_password[0])
      }
    }
  }

  const onFinishFailed = (errorInfo) => {
    message.error('Form submission failed')
    console.log(errorInfo)
  }

  const formItemClass = `bg-white text-black input-custom`
  const labelClass = `text-black`
  const buttonClass = `bg-primary-yellow text-white hover:bg-[goldenrod] mt-5 mb-5 p-5 w-full`

  return (
    <div className="flex justify-center min-h-screen w-full">
      <div className="px-8 rounded-lg w-full">
        <Form
          name="change-password"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="text-3xl text-gray-700 mb-8 text-center font-semibold">
            Change Password
          </p>
          <Form.Item
            label={<span className={labelClass}>Old Password</span>}
            name="oldPassword"
            rules={[
              { required: true, message: 'Please enter your old password!' },
            ]}
          >
            <Input.Password
              placeholder="Enter old password"
              className={formItemClass}
            />
          </Form.Item>

          <Form.Item
            label={<span className={labelClass}>New Password</span>}
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter your new password!' },
              { min: 8, message: 'Password must be at least 8 characters!' },
              {
                pattern: /(?=.*[a-z])(?=.*[A-Z])/,
                message:
                  'Password must include both uppercase and lowercase letters!',
              },
              {
                pattern: /(?=.*[!@#$%^&*(),.?":{}|<>])/,
                message: 'Password must include at least one symbol!',
              },
            ]}
          >
            <Input.Password
              placeholder="Enter new password"
              className={formItemClass}
            />
          </Form.Item>

          <Form.Item
            label={<span className={labelClass}>Confirm New Password</span>}
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              { min: 8, message: 'Password must be at least 8 characters!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm new password"
              className={formItemClass}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className={buttonClass}>
            {isLoading ? <Spinner /> : 'Change Password'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ChangePassword
