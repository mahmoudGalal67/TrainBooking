import { useState } from 'react'
import { Table, Button, Modal, Input, Form, Upload, message, Spin } from 'antd'
import {
  useGetStoriesQuery,
  useSaveStoryMutation,
  useDelStoryMutation,
  useUpdateStoryMutation,
} from '../../../app/Feature/API/Admin/Story'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { UploadOutlined } from '@ant-design/icons'

const Story = () => {
  const { data: storiesData, isLoading, refetch } = useGetStoriesQuery()
  const [saveStory, { isLoading: isSaving }] = useSaveStoryMutation()
  const [delStory] = useDelStoryMutation()
  const [updateStory] = useUpdateStoryMutation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editStory, setEditStory] = useState(null)
  const [file, setFile] = useState(null)
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
        <img src={image} alt="story" style={{ width: 50, height: 50 }} />
      ),
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
          />
        </div>
      ),
    },
  ]

  const handleEdit = (record) => {
    setEditStory(record)
    form.setFieldsValue({
      name: record.name,
    })
    setIsModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      await delStory(id).unwrap()
      message.success('Story deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete the story', error)
    }
  }

  const handleAdd = () => {
    setEditStory(null)
    form.resetFields()
    setFile(null)
    setIsModalVisible(true)
  }

  const handleModalOk = () => {
    form.validateFields().then(async (values) => {
      const formData = new FormData()
      Object.keys(values).forEach((key) => {
        if (key !== 'file') {
          formData.append(key, values[key])
        }
      })

      if (file) {
        formData.append('file', file)
      }

      try {
        if (editStory) {
          await updateStory({ id: editStory.id, data: formData }).unwrap()
          message.success('Story updated successfully')
        } else {
          await saveStory(formData).unwrap()
          message.success('Story added successfully')
        }

        setIsModalVisible(false)
        form.resetFields()
        setFile(null)

        refetch()
      } catch (error) {
        message.error(
          editStory ? 'Failed to update the story' : 'Failed to add the story',
          error
        )
      }
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setFile(null)
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Story</h2>
      <Button type="primary" onClick={handleAdd} className="mb-4">
        Add Story
      </Button>
      <Table
        dataSource={storiesData?.data}
        columns={columns}
        loading={isLoading}
        className="mt-4"
        rowKey="id"
      />
      <Modal
        title={editStory ? 'Edit Story' : 'Add Story'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={isSaving ? <Spin /> : editStory ? 'Update' : 'Add'}
        cancelButtonProps={{ disabled: isSaving }}
        confirmLoading={isSaving}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Story Name"
            name="name"
            rules={[
              { required: true, message: 'Please enter the story name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Story Image"
            name="file"
            rules={[
              { required: true, message: 'Please upload the story image!' },
            ]}
          >
            <Upload
              name="file"
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

export default Story
