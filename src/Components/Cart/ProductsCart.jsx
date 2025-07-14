import { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import CheckOutCart from './CheckOutCart'
import {
  useRemoveFromCartMutation,
  useShowProductCartQuery,
  useUpdateProductInCartMutation,
} from '../../app/Feature/API/Shop'
import { message } from 'antd'
import { useGetCashbackUserQuery } from '../../app/Feature/API/Payment'
import { useTranslation } from 'react-i18next'

const ProductsCart = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const { data: cartItems, isLoading, error } = useShowProductCartQuery()
  const [removeFromCart] = useRemoveFromCartMutation()
  const [updateCartItem] = useUpdateProductInCartMutation()
  const { data: cashback } = useGetCashbackUserQuery()
  const {t} = useTranslation()
  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
  }

  const updateQuantity = async (product_id, quantity) => {
    try {
      const response = await updateCartItem({ product_id, quantity: quantity })
      if (response.error) {
        message.warning(response.error.data.data)
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
      message.warning('حدث خطأ أثناء تحديث الكمية. الرجاء المحاولة لاحقًا.')
    }
  }

  const removeItem = async (productId) => {
    try {
      const response = await removeFromCart(productId)
      if (response.error) {
        message.warning(response.error.data.data)
      }
    } catch (err) {
      console.error('Error removing item:', err)
      return false
    }
  }

  const calculateTotal = () =>
    cartItems?.data?.cart_items.reduce((acc, item) => {
      const total = parseFloat(item?.total)
      if (isNaN(total)) {
        return acc
      }
      return acc + total
    }, 0)

  if (isLoading) return <p>...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t('Shopping Cart')}</h1>
      <a target="_self"></a>
      <div className="bg-white shadow-md rounded-lg p-6 overflow-auto">
        {cartItems?.data?.cart_items.length === 0 ? (
          <p className="text-center text-gray-500">{t('Your cart is empty')}</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 min-w-[200px] text-left">{t('Product')}</th>
                <th className="px-4 py-2 text-left">{t('Price')}</th>
                <th className="px-4 py-2 text-left">{t('Quantity')}</th>
                <th className="px-4 py-2 text-left">{t('Total')}</th>
                <th className="px-4 py-2 text-center">{t('Action')}</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.data?.cart_items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-4 flex items-center">
                    <img
                      src={item?.product.image}
                      alt={item?.product.name}
                      className="w-16 h-16 object-cover mr-4 rounded-lg"
                    />
                    {item?.product.name}
                  </td>
                  <td className="px-4 py-4 text-nowrap">
                    $
                    {isNaN(parseFloat(item?.product.price))
                      ? '0.00'
                      : parseFloat(item?.product.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      value={item?.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      className="w-16 text-center border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-nowrap">
                    ${item?.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      className="text-red-600 hover:text-red-800 bg-red-100 p-1 rounded-md font-bold"
                      onClick={() => removeItem(item?.id)}
                    >
                      <MdDelete className="text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {cartItems?.data?.cart_items.length > 0 && (
          <div className="mt-6 text-right">
            <p className="text-xl text-gray-600 font-bold">
              {t('Total')}:{' '}
              <span className="text-primary">
                ${calculateTotal().toFixed(2)}
              </span>
            </p>
            {cashback?.cashback !== null && (
              <p className="text-xl mt-2 text-gray-600 font-bold">
                {t('Cashback')}:{' '}
                <span className="text-primary">
                  ${Number(cashback?.cashback?.cashback_amount)}
                </span>
              </p>
            )}
            {cashback?.cashback !== null && (
              <p className="text-xl border- mt-4 pt-2 text-gray-600 font-bold">
                {t('Total After Cashback')}:{' '}
                <span className="text-primary">
                  $
                  {(
                    calculateTotal().toFixed(2) -
                    Number(cashback?.cashback?.cashback_amount)
                  ).toFixed(2)}
                </span>
              </p>
            )}

            <button
              onClick={showDrawer}
              className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-second"
            >
              {t('Checkout')}
            </button>
          </div>
        )}

        <CheckOutCart
          drawerVisible={drawerVisible}
          onClose={onClose}
          cartItems={cartItems}
          Total={calculateTotal()}
          cashback={cashback?.cashback?.cashback_amount}
          calculateTotal={(
            calculateTotal() -
            (Number(cashback?.cashback?.cashback_amount) || 0)
          ).toFixed(2)}
        />
      </div>
    </div>
  )
}

export default ProductsCart
