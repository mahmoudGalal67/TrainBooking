import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const PlanDetailsCard = ({ plan }) => {
  const cleanPrice = (priceStr) => parseFloat(priceStr.replace(/[^\d.]/g, ''))
  const originalPrice = cleanPrice(plan?.price)
  const nettoPrice = cleanPrice(plan?.netto_price)
  const discount = originalPrice - nettoPrice
  const hasDiscount = discount > 0
  const discountPercentage = Math.round(
    ((originalPrice - nettoPrice) / originalPrice) * 100
  )

  return (
    <Link
      to={`/plan/${plan?.id}`}
      className="max-w-full bg-white rounded-xl shadow-lg overflow-hidden border hover:bg-slate-100"
    >
      <div className="relative">
        <img
          src={plan?.image_big}
          alt={plan?.title}
          className="w-full h-48 object-cover"
        />
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-sm px-2 py-1 rounded">
            Discount {discountPercentage}%
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 text-white text-sm px-3 py-1">
           Car and walking tour
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="text-blue-600 text-sm flex items-center gap-4">
          <span>{plan?.product_type}</span>
          <span>👥 4</span>
          <span>⏱ {plan?.duration}</span>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 h-14 line-clamp-2">
          {plan?.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-3">{plan?.short_info}</p>

        <div className="flex gap-2 mt-2 justify-between">
          <span className="bg-gray-100 px-2 py-1 rounded text-sm line-clamp-2 h-10 flex items-center">
            {plan?.order_options[0]?.schedule?.name || 'Unknown'}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded text-sm flex items-center">
            📅
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 ">
          <div className="text-left">
            {hasDiscount && (
              <div className="text-sm text-gray-400 line-through">
                от {plan?.price}
              </div>
            )}
            <div className="text-green-600 font-bold text-lg">
              от {plan?.netto_price}
            </div>
            <div className="text-sm text-gray-500">for the excursion</div>
          </div>

          <div className="text-right">
            <div className="text-yellow-500 flex items-center gap-1">
              <p className="flex">
                {Array(Math.round(plan?.customers_review_rating || 0))
                  .fill()
                  .map((_, i) => (
                    <AiFillStar key={i} className={'w-4 h-4 text-yellow-500'} />
                  ))}
              </p>
              <p>{plan?.customers_review_rating}</p>
            </div>
            <div className="text-sm text-gray-500">
              {plan?.reviews_with_text} reviews
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlanDetailsCard
