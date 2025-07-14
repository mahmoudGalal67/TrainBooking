import { useState } from 'react'
import { Table, Button, Modal, Input, Form, message } from 'antd'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useShowCategoryQuery } from '../../../app/Feature/API/Shop'
import {
  useAddCategoryMutation,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
} from '../../../app/Feature/API/Admin/Product'

const Category = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const { data: categoryData, refetch } = useShowCategoryQuery()
  const [saveCategory] = useAddCategoryMutation()
  const [removeCategory] = useRemoveCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
            icon={<AiOutlineDelete className="text-2xl " />}
            onClick={() => handleDelete(record.id)}
            disabled={loading}
          />
        </div>
      ),
    },
  ]

  const handleEdit = (record) => {
    setEditCategory(record)
    form.setFieldsValue({
      name: record.name,
    })
    setIsModalVisible(true)
  }

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      await removeCategory(id).unwrap()
      message.success('Category deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete category')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditCategory(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleModalOk = () => {
    form.validateFields().then(async (values) => {
      setLoading(true)
      if (editCategory) {
        try {
          await updateCategory({ id: editCategory.id, data: values }).unwrap()
          message.success('Category updated successfully')
          refetch()
          setIsModalVisible(false)
        } catch (error) {
          message.error('Failed to update category')
          console.error(error)
        } finally {
          setLoading(false)
        }
      } else {
        try {
          await saveCategory(values).unwrap()
          message.success('Category added successfully')
          refetch()
          setIsModalVisible(false)
          form.resetFields()
        } catch (error) {
          message.error('Failed to add category')
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Category</h2>
      <Button
        type="primary"
        onClick={handleAdd}
        className="mb-4"
        disabled={loading}
      >
        Add Category
      </Button>
      <Table
        dataSource={categoryData?.data}
        columns={columns}
        className="mt-4"
        rowKey="id"
      />
      <Modal
        title={editCategory ? 'Edit Category' : 'Add Category'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editCategory ? 'Update' : 'Add'}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: '',
          }}
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              { required: true, message: 'Please enter the category name!' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Category
