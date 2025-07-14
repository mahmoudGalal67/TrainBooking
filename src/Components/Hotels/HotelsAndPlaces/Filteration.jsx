/* eslint-disable react/prop-types */
import { FaStar } from 'react-icons/fa'

const Filteration = ({ filter, setFilter }) => {
  return (
    <div className="md:w-1/4 w-full p-6 border-r border-gray-300 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-primary">Filter</h2>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-800">
          Deal
        </label>
        <div className="flex flex-col space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="deal"
              value=""
              checked={filter.deal === ''}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">All Deals</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="deal"
              value="Fully Refundable"
              checked={filter.deal === 'Fully Refundable'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Fully Refundable</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="deal"
              value="Properties With Special Offers"
              checked={filter.deal === 'Properties With Special Offers'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">
              Properties With Special Offers
            </span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="deal"
              value="No Payment Needed"
              checked={filter.deal === 'No Payment Needed'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">No Payment Needed</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-800">
          Popular
        </label>
        <div className="flex flex-col space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="popular"
              value="4 Stars"
              checked={filter.deal === '4 Stars'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">4 Stars</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="popular"
              value="Breakfast included"
              checked={filter.deal === 'Breakfast included'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Breakfast included</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="popular"
              value="Mid-Range"
              checked={filter.deal === 'Mid-Range'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Mid-Range</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-800">
          Property Types
        </label>
        <div className="flex flex-col space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Property Types"
              value="Hostels"
              checked={filter.deal === 'Hostels'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Hostels</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Property Types"
              value="Special Lodgings"
              checked={filter.deal === 'Special Lodgings'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Special Lodgings</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-800">
          Amenities
        </label>
        <div className="flex flex-col space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Amenities"
              value="WI-FI"
              checked={filter.deal === 'WI-FI'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">WI-FI</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Amenities"
              value="Breakfast included."
              checked={filter.deal === 'Breakfast included.'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Breakfast included.</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Amenities"
              value="Pool"
              checked={filter.deal === 'Pool'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Pool</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Amenities"
              value="Free parking"
              checked={filter.deal === 'Free parking'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Free parking</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-800">
          Price
        </label>
        <div className="flex flex-col space-y-4">
          <input
            type="range"
            min="0"
            max="500"
            value={filter.price}
            onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${filter.price}</span>
            <span>$500</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-800">
          Distance From{' '}
        </label>
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{filter.price} Mi</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            value={filter.price}
            onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Distance From "
              value="Red Square"
              checked={filter.deal === 'Red Square'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Red Square</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Distance From"
              value="Moscow Metro"
              checked={filter.deal === 'Moscow Metro'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Moscow Metro</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Distance From "
              value="Moscow Kremlin"
              checked={filter.deal === 'Moscow Kremlin'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Moscow Kremlin</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Distance From "
              value="Saint Basil’s Cathedral"
              checked={filter.deal === 'Saint Basil’s Cathedral'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">
              Saint Basil’s Cathedral
            </span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-800">
          Traveler Rating
        </label>
        <div className="flex flex-col space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Traveler Rating"
              value="1"
              checked={filter.deal === 'Red Square'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-yellow-500">
              <FaStar />
            </span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Traveler Rating"
              value="2"
              checked={filter.deal === '2'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-yellow-500 flex gap-1">
              <FaStar /> <FaStar />
            </span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Traveler Rating"
              value="3"
              checked={filter.deal === '3'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-yellow-500 flex gap-1">
              <FaStar /> <FaStar /> <FaStar />
            </span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Traveler Rating"
              value="4"
              checked={filter.deal === '4'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-yellow-500 flex gap-1">
              <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Traveler Rating"
              value="5"
              checked={filter.deal === '5'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-yellow-500 flex gap-1">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-800">
          Hotel Class
        </label>
        <div className="flex flex-col space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Hotel Class"
              value="5 star"
              checked={filter.deal === '5 star'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">5 star</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Hotel Class"
              value="4 star"
              checked={filter.deal === '4 star'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">4 star</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Hotel Class"
              value="3 star"
              checked={filter.deal === '3 star'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">3 star</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Hotel Class"
              value="2 star"
              checked={filter.deal === '2 star'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">2 star</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Hotel Class"
              value="1 star"
              checked={filter.deal === '1 star'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">1 star</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-800">
          Style{' '}
        </label>
        <div className="flex flex-col space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Style"
              value="Budget"
              checked={filter.deal === 'Budget'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Budget</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Style"
              value="Mid-Range"
              checked={filter.deal === 'Mid-Range'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Mid-Range</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Style"
              value="Luxury"
              checked={filter.deal === 'Luxury'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Luxury</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="Style"
              value="Family-Friendly"
              checked={filter.deal === 'Family-Friendly'}
              onChange={(e) => setFilter({ ...filter, deal: e.target.value })}
              className="text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Family-Friendly</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Filteration
