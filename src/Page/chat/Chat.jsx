import { useEffect, useRef, useState } from 'react'

import { FaArrowLeft, FaCheck, FaListUl } from 'react-icons/fa'
import { CiMenuKebab } from 'react-icons/ci'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { UploadOutlined } from '@ant-design/icons'
import { CiImageOn } from 'react-icons/ci'
import { BsChatLeftText } from 'react-icons/bs'
import { IoIosSend } from 'react-icons/io'

import { Layout, Input, Button, List, Avatar, message } from 'antd'
import { Upload } from 'antd'

import {
  useGetChatsQuery,
  useGetUserMessagesQuery,
  useSendImageMutation,
  useSendMessageMutation,
} from '../../app/Feature/API/Chat'
import { MdDone } from 'react-icons/md'

const { Header, Content, Sider } = Layout
const { TextArea } = Input

const Chat = () => {
  const [inputValue, setInputValue] = useState('')
  const [contactsVisible, setContactsVisible] = useState(true)
  const [chatVisible, setChatVisible] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [conversationsId, setConversationsId] = useState(0)
  const messagesEndRef = useRef(null)

  const { data: chatData } = useGetChatsQuery()
  const { data: userMessage } = useGetUserMessagesQuery(conversationsId)
  const [sendMessage] = useSendMessageMutation()
  const [sendImage] = useSendImageMutation()

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [userMessage, selectedContact])

  const currentUser = {
    name: selectedContact,
    avatar:
      'https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg',
  }

  const toggleContacts = () => {
    setContactsVisible(!contactsVisible)
  }

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      try {
        await sendMessage({ message: inputValue.trim() })
        setInputValue('')
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  const handleSendImage = async (file) => {
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        message.warning('The file must be an image.')
        return
      }

      try {
        const formData = new FormData()
        formData.append('image', file)

        await sendImage(formData)
      } catch (error) {
        console.error('Error sending image:', error)
      }
    }
  }

  return (
    <Layout className="h-screen">
      {/* sidevar */}
      <Sider
        width={contactsVisible ? 350 : 75}
        className={`transition-all duration-300 ${contactsVisible ? 'bg-gray-200' : 'bg-gray-300'} overflow-auto`}
      >
        <Button onClick={toggleContacts} className="m-2">
          {contactsVisible ? <FaListUl /> : <CiMenuKebab />}
        </Button>
        {contactsVisible ? (
          <List
            onClick={() => setChatVisible(true)}
            size="small"
            dataSource={chatData?.conversations}
            renderItem={(item) => {
              return (
                <List.Item
                  onClick={() => {
                    setSelectedContact(
                      item?.lastMessage?.lastMessage?.user?.name
                    )
                    setConversationsId(item?.conversation_id)
                  }}
                  style={{
                    cursor: 'pointer',
                    padding: '10px',
                    borderBottom: '1px solid #e5e5e5',
                  }}
                >
                  <Avatar
                    className="mr-2 min-w-[40px] min-h-[40px] object-fill"
                    src="https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        {item?.lastMessage?.lastMessage?.user?.name}
                      </span>
                      {item?.unread_messages_count > 0 && (
                        <div className="bg-primary text-white text-xs rounded-full px-2 py-1">
                          {item?.unread_messages_count}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-500 flex items-center gap-1">
                      {item?.lastMessage?.lastMessage?.user?.email ===
                        item?.lastMessage?.from_user?.email && <>you: </>}
                      {item?.lastMessage?.lastMessage?.message_type ===
                      'text' ? (
                        item?.lastMessage?.lastMessage?.message
                      ) : (
                        <p className="flex items-center gap-1 text-md">
                          <CiImageOn />
                          Image
                        </p>
                      )}
                    </span>
                  </div>
                </List.Item>
              )
            }}
          />
        ) : (
          <div className="flex justify-start items-start h-full overflow-hidden">
            <List
              size="small"
              dataSource={chatData?.conversations}
              onClick={() => {
                setSelectedContact(
                  chatData?.conversations?.map(
                    (e) => e?.lastMessage?.lastMessage?.user?.name
                  )
                )
                setConversationsId(
                  chatData?.conversations?.map((e) => e?.conversation_id)
                )
              }}
              style={{
                cursor: 'pointer',
                borderBottom: '1px solid #e5e5e5',
              }}
              renderItem={() => (
                <List.Item>
                  <Avatar
                    className="mr-2 min-w-[40px] min-h-[40px] object-fill"
                    src="https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg"
                  />
                  <div className="flex flex-col"></div>
                </List.Item>
              )}
            />
          </div>
        )}
      </Sider>

      {/* chat content */}
      <Layout className={chatVisible ? 'active-ant-layout' : ''}>
        {!selectedContact && (
          <div className="flex justify-center items-center h-full flex-col gap-6">
            <BsChatLeftText className="text-8xl text-primary" />
            <p className="text-3xl font-semibold text-gray-700">
              Please select a chat to start messaging.
            </p>
          </div>
        )}
        {selectedContact && (
          <>
            <Header className="bg-white flex items-center justify-start pl-4">
              <p
                onClick={() => setChatVisible(false)}
                className="display-left-chat cursor-pointer text-xs text-gray-500 hover:text-gray-700 transition-colors border-none box-shadow-none mr-3"
              >
                <FaArrowLeft />
              </p>
              <Avatar src={currentUser.avatar} className="mr-2" />
              <span className="text-lg font-semibold">{currentUser.name}</span>
            </Header>
            <Content className="p-4 bg-gray-100">
              <div className="h-[74vh] overflow-auto border border-gray-200 p-4 mb-4 bg-gray-100 rounded-lg shadow-sm">
                {userMessage?.messages?.map((msg, index) => (
                  <>
                    {msg?.message_type === 'image' ? (
                      <div
                        key={index}
                        className={`my-2 ${msg?.user?.type !== 'user' ? 'text-right' : 'text-left'}`}
                      >
                        <div className={`inline-block p-3 rounded-lg max-w-md`}>
                          <div className="flex items-center gap-1">
                            <img
                              src={`${msg.message}`}
                              className="max-w-64 max-h-42 object-fit"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={index}
                        className={`my-2 ${msg?.user?.type !== 'user' ? 'text-right' : 'text-left'}`}
                      >
                        <div
                          className={`inline-block p-3  max-w-md ${msg.user?.type !== 'user' ? 'bg-blue-500 text-white rounded-tl-xl rounded-b-xl' : 'bg-gray-200 text-black rounded-tr-xl rounded-b-xl'}`}
                        >
                          <div className="flex items-center gap-1">
                            {msg.message}
                            {msg.message_type !== 'text' && (
                              <span className={`text-xs ml-1`}>
                                {msg.read_at ? (
                                  <IoCheckmarkDoneSharp className="text-green-500" />
                                ) : (
                                  <FaCheck className="text-red-500" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                        {msg?.user?.type !== 'user' && (
                          <div className="flex items-center justify-end gap-2 mt-1">
                            <p className="text-sm text-gray-500">
                              {new Date(msg.created_at).toLocaleTimeString(
                                'en-US',
                                {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true,
                                }
                              )}
                            </p>
                            {msg.read_at ? (
                              <div className="flex items-center gap-1 text-green-500">
                                <IoCheckmarkDoneSharp className="text-xl" />
                                <p className="text-sm text-gray-500">
                                  {new Date(msg.read_at).toLocaleTimeString(
                                    'en-US',
                                    {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true,
                                    }
                                  )}
                                </p>
                              </div>
                            ) : (
                              <span className="text-gray-400">
                                <MdDone className="text-xl" />
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ))}
                <div ref={messagesEndRef}></div>
              </div>
              <Input.Group compact>
                <div className="flex w-full gap-1">
                  <Upload
                    beforeUpload={(file) => {
                      handleSendImage(file)
                      return false
                    }}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />} />
                  </Upload>
                  <TextArea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleSendMessage}
                    placeholder="Type your message..."
                    className="border border-gray-300 rounded-md"
                    autoSize={{ minRows: 1, maxRows: 3 }}
                  />
                  <Button
                    type="primary"
                    onClick={handleSendMessage}
                    className="hover:bg-blue-600 transition-colors"
                  >
                    <IoIosSend className="text-xl" />
                  </Button>
                </div>
              </Input.Group>
            </Content>
          </>
        )}
      </Layout>
    </Layout>
  )
}

export default Chat
