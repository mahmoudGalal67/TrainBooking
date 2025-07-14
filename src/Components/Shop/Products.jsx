import React, { useState } from 'react'
import { FaTh, FaList } from 'react-icons/fa'
import {
  useAddToCartMutation,
  useShowCategoryQuery,
  useShowProductQuery,
} from '../../app/Feature/API/Shop'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Spinner from '../../Shared/Spinner'
import ReactPaginate from 'react-paginate'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

const Products = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [addToCart] = useAddToCartMutation()
  const [addCartError, setAddCartError] = useState(null)
  const [addingProductId, setAddingProductId] = useState(null)
  const [categoryId, setCategoryId] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const token = localStorage.getItem('token-matroshka-user')

  const {
    data: ProductData,
    isLoading: productLoading,
    error: productError,
  } = useShowProductQuery({ categoryId, page: currentPage })

  const { data: categoryData } = useShowCategoryQuery()
  const {t} = useTranslation()
  React.useEffect(() => {
    setTotalPages(ProductData?.meta?.last_page)
    setCurrentPage(ProductData?.meta?.current_page)
  }, [ProductData?.meta?.current_page, ProductData?.meta?.last_page])

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
  }

  const handleAddToCart = async (product_id, quantity = 1) => {
    if (!token) {
      message.warning(t('You need to be logged in to add products to cart.'))
      return
    }
    try {
      setAddCartError(null)
      setAddingProductId(product_id)
      await addToCart({ product_id, quantity }).unwrap()
      setAddingProductId(null)
      message.success(t('Product has been successfully added to your cart.'))
    } catch (err) {
      setAddCartError('Failed to add product to cart. Please try again.', err)
      setAddingProductId(null)
    }
  }

  return (
    <div className="container mx-auto py-10 mb-16">
      <div className="flex justify-between items-center mb-12">
        <p className="lg:text-4xl text-3xl text-black font-bold">
          {t('Our Best Product')}
        </p>

        <div>
          <button
            className={`mx-2 bg-white p-2 rounded-md ${viewMode === 'grid' ? 'text-primary' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <FaTh size={24} />
          </button>
          <button
            className={`mx-2 bg-white p-2 rounded-md ${viewMode === 'list' ? 'text-primary' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FaList size={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-center mb-12 gap-4">
        <button
          className={`p-2 rounded-md ${!categoryId ? 'bg-primary text-white' : 'bg-white'}`}
          onClick={() => setCategoryId(0)}
        >
          {t('All')}
        </button>

        {categoryData?.data?.map((category, idx) => (
          <button
            key={idx}
            className={`p-2 rounded-md ${categoryId === category?.id ? 'bg-primary text-white' : 'bg-white'}`}
            onClick={() => setCategoryId(category?.id)}
          >
            {category?.name}
          </button>
        ))}
      </div>

      {productLoading && (
        <div
          className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'grid-cols-1 gap-6'}`}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <Skeleton height={250} />
              <Skeleton height={20} width="70%" className="mt-4" />
              <Skeleton height={15} width="90%" className="mt-2" />
              <Skeleton height={40} width="100%" className="mt-4" />
            </div>
          ))}
        </div>
      )}

      {productError && (
        <div className="text-center text-red-500 font-bold">
          <p>
            Something went wrong while fetching products. Please try again
            later.
          </p>
        </div>
      )}

      {!productLoading && !productError && (
        <div
          className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'grid-cols-1 gap-6'}`}
        >
          {ProductData?.data?.map((PdtData) => (
            <div
              key={PdtData.id}
              className={`bg-white rounded-lg shadow overflow-hidden flex ${viewMode === 'list' ? 'flex-row' : 'flex-col'}`}
            >
              <div className="relative group pt-4">
                <img
                  src={
                    PdtData?.image?.includes('http://localhost')
                      ? PdtData.image.replace(
                          'http://localhost',
                          'https://matroshka-travel.com'
                        )
                      : PdtData?.image
                  }
                  alt={PdtData?.name}
                  className={`w-full object-contain max-w-[450px] h-[250px] ${viewMode === 'list' ? 'w-1/3' : ''} group-hover:scale-110 transition-transform duration-300`}
                />
              </div>

              <div
                className={`p-6 ${viewMode === 'list' ? 'w-2/3' : 'w-full'}`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {PdtData.name}
                </h3>
                <p className="text-gray-600 mb-4">{PdtData.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-primary">
                    ${PdtData.price}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(PdtData?.id)}
                  disabled={addingProductId === PdtData?.id}
                  className={`bg-primary hover:bg-second text-white py-2 px-4 rounded-lg transition-all duration-300 w-full font-semibold ${addingProductId === PdtData?.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {addingProductId === PdtData?.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner /> ...
                    </div>
                  ) : (
                    t('Add To Cart')
                  )}
                </button>

                {addCartError && (
                  <p className="text-red-500 text-sm mt-2">{addCartError}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {!ProductData?.data?.length > 0 && (
        <p className="text-3xl text-black text-semibold text-center w-full">
          {t('No Data Available')}
        </p>
      )}
      <div className="mt-12">
        {ProductData?.data?.length > 0 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            containerClassName="pagination"
            activeClassName="active"
          />
        )}
      </div>
    </div>
  )
}

export default Products
