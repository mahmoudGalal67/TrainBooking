/* eslint-disable react/prop-types */
import { Col, Row, Form, Button, Tooltip, message } from 'antd'
// import master from '../../assets/Img/mastercard.png'
// import visa from '../../assets/Img/visa.png'
// import rupay from '../../assets/Img/rupay.png'
// import cashback from '../../assets/Img/chashback.png'
import SharedDrawer from './../../Shared/Drawer'
import { useState } from 'react'
import { usePaymentStripeMutation } from '../../app/Feature/API/Payment'
import Spinner from '../../Shared/Spinner'
import { useTranslation } from 'react-i18next'

const CheckOutCart = ({
  drawerVisible,
  onClose,
  calculateTotal,
  Total,
  cashback,
  cartItems,
}) => {
  const [form] = Form.useForm()
  const [cardType, setCardType] = useState('')
  const userData = JSON.parse(localStorage.getItem('userData'))
  const [savePaymentStripe, { isLoading: loadingPayment }] =
    usePaymentStripeMutation()
  const {t} = useTranslation()
  const handlePaymentStripe = async () => {
    try {
      const paymentData = {
        currency: 'usd',
        product_name: 'Cart Purchase',
        amount: Number(calculateTotal),
        total: Total,
        cashback: cashback ? Number(cashback) : 0,
        quantity: 1,
        user_id: userData?.user?.id,
        user_type: 'user',
        main_product: 'Cart',
        desc: cartItems?.data?.cart_items.map((item) => ({
          name: item?.product.name,
          price: Number(item?.product.price),
          total: Number(item?.total),
          quantity: item?.quantity,
        })),
      }

      const response = await savePaymentStripe(paymentData)
      if (response?.data?.success) {
        message.success(
          t('Payment Successful! Redirecting to:'),
          response.data.success
        )
        const a = response.data.success
        console.log(a)
        window.open(a, '_self')
      } else {
        message.warning('Payment failed. Please try again.')
      }
    } catch (error) {
      console.error('Error processing payment:', error)
      message.warning(
        'An error occurred while processing your payment. Please try again later.'
      )
    }
  }

  const handleCardTypeSelection = (type) => {
    setCardType(type)
    handlePaymentStripe()
  }

  return (
    <SharedDrawer
      visible={drawerVisible}
      onClose={onClose}
      title={t("Payment Details")}
    >
      <Form
        form={form}
        onFinish={handleCardTypeSelection}
        layout="vertical"
        initialValues={{ cardType }}
      >
        <Form.Item
          label="Payment Method"
          name="cardType"
          rules={[
            { required: true, message: 'Please select the Payment Method' },
          ]}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Tooltip title="Stripe">
                <div
                  className={`flex items-center mt-3 h-16 justify-center border-2 rounded-lg p-2 cursor-pointer transition-colors duration-300 ${
                    cardType === 'Stripe' ? 'border-primary' : ''
                  }`}
                  onClick={() => handleCardTypeSelection('Stripe')}
                >
                  {/* <img src={master} alt="MasterCard" /> */}
                  <span className="text-3xl font-bold text-gray-800">
                    Stripe
                  </span>
                </div>
              </Tooltip>
            </Col>

            {/* <Col span={6}>
              <Tooltip title="Visa">
                <div
                  className={`flex items-center justify-center border-2 rounded-lg p-2 cursor-pointer transition-colors duration-300 ${
                    cardType === 'visa'
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                  onClick={() => handleCardTypeSelection('visa')}
                >
                  <img src={visa} alt="Visa" />
                </div>
              </Tooltip>
            </Col>

            <Col span={6}>
              <Tooltip title="RuPay">
                <div
                  className={`flex items-center justify-center border-2 rounded-lg p-2 cursor-pointer transition-colors duration-300 ${
                    cardType === 'rupay'
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                  onClick={() => handleCardTypeSelection('rupay')}
                >
                  <img src={rupay} alt="RuPay" />
                </div>
              </Tooltip>
            </Col>

            <Col span={6}>
              <Tooltip title="Cash Back">
                <div
                  className={`flex items-center justify-center border-2 rounded-lg p-2 cursor-pointer transition-colors duration-300 ${
                    cardType === 'cashback'
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                  onClick={() => handleCardTypeSelection('cashback')}
                >
                  <img src={cashback} alt="CashBack" />
                </div>
              </Tooltip>
            </Col> */}
          </Row>
        </Form.Item>

        {/* <Form.Item
          label="Cardholder Name"
          name="cardholderName"
          rules={[
            { required: true, message: 'Please enter the cardholder name' },
          ]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Card Number"
          name="cardNumber"
          rules={[{ required: true, message: 'Please enter your card number' }]}
        >
          <Input placeholder="1234 5678 9012 3456" />
        </Form.Item>

        <Form.Item
          label="Expiration Date"
          name="expirationDate"
          rules={[
            { required: true, message: 'Please enter the expiration date' },
          ]}
        >
          <Input placeholder="MM/YY" />
        </Form.Item>

        <Form.Item
          label="CVV"
          name="cvv"
          rules={[{ required: true, message: 'Please enter your CVV' }]}
        >
          <Input type="password" placeholder="123" />
        </Form.Item> */}

        <Form.Item className="mt-8">
          <Button type="primary" htmlType="submit" className="w-full py-2">
            {loadingPayment ? <Spinner /> : t('Complete Payment')}
          </Button>
        </Form.Item>
      </Form>
    </SharedDrawer>
  )
}

export default CheckOutCart
