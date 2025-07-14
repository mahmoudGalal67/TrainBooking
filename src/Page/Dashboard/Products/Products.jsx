/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  message,
  Upload,
  Select,
} from 'antd'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { UploadOutlined } from '@ant-design/icons'
import {
  useAddProductMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
} from '../../../app/Feature/API/Admin/Product'
import {
  useShowCategoryQuery,
  useShowProductQuery,
} from '../../../app/Feature/API/Shop'

const Products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [pagination, setPagination] = useState({ current: 1 })
  const [file, setFile] = useState(null)

  const [addProduct] = useAddProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [removeProduct] = useRemoveProductMutation()

  const {
    data: productData,
    isLoading,
    refetch,
  } = useShowProductQuery({
    page: pagination.current,
  })
  const { data: categoryData } = useShowCategoryQuery(1)

  const [form] = Form.useForm()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={image} alt="product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<AiOutlineEdit className="text-2xl mr-6" />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            icon={<AiOutlineDelete className="text-2xl" />}
            onClick={() => {
              handleDelete(record.id)
              console.log(record.id)
            }}
          />
        </div>
      ),
    },
  ]

  const handleEdit = (record) => {
    setEditingProduct(record)
    form.setFieldsValue({
      category_id: record.category,
      name: record.name,
      price: record.price,
      description: record.description,
      stock: record.stock,
    })
    setIsModalVisible(true)
    refetch()
  }

  const handleDelete = (id) => {
    removeProduct(id)
      .then(() => {
        message.success('Product deleted successfully')
      })
      .catch(() => {
        message.error('Failed to delete the product')
      })
    refetch()
  }

  const handleAdd = () => {
    setEditingProduct(null)
    form.resetFields()
    setIsModalVisible(true)
    refetch()
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const formData = new FormData()

      Object.keys(values).forEach((key) => {
        if (key !== 'main_image') {
          formData.append(key, values[key])
        }
      })

      if (file) {
        formData.append('main_image', file)
      }

      const action = editingProduct
        ? () => updateProduct({ id: editingProduct.id, data: formData })
        : () => addProduct(formData)

      action()
        .then(() => {
          message.success(
            editingProduct
              ? 'Product updated successfully'
              : 'Product added successfully'
          )
          refetch()
        })
        .catch(() => {
          message.error(
            editingProduct
              ? 'Failed to update the product'
              : 'Failed to add the product'
          )
        })

      setIsModalVisible(false)
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleCategoryChange = () => {
    setPagination((prev) => ({ ...prev, current: 1 }))
  }

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ current: page, pageSize })
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="flex mb-4">
        <Button type="primary" onClick={handleAdd}>
          Add Product
        </Button>
      </div>
      <Table
        dataSource={productData?.data}
        columns={columns}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: productData?.meta?.current_page || 1,
          pageSize: productData?.meta?.per_page,
          total: productData?.meta?.total,
          onChange: handlePaginationChange,
        }}
        className="mt-4"
      />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingProduct ? 'Update' : 'Add'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              placeholder="Select Category"
              style={{ width: '100%' }}
              onChange={handleCategoryChange}
            >
              {categoryData?.data?.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Product Name"
            name="name"
            className="mt-4"
            rules={[
              { required: true, message: 'Please enter the product name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            className="mt-4"
            rules={[{ required: true, message: 'Please enter the price!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Description" className="mt-4" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Stock"
            name="stock"
            className="mt-4"
            rules={[{ required: true, message: 'Please enter the stock!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Image"
            className="mt-4"
            name="main_image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Upload
              name="image"
              listType="picture"
              beforeUpload={(file) => {
                setFile(file)
                return false
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Products
