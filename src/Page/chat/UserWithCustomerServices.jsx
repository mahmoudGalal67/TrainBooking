import { useEffect, useState, useRef } from 'react'

import { MdOutlineChat } from 'react-icons/md'
import { FcAddImage } from 'react-icons/fc'
import { IoIosSend } from 'react-icons/io'
import { BiSupport } from 'react-icons/bi'
import { MdDone } from 'react-icons/md'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'

import {
  useGetUserConversationsQuery,
  useGetUserMessagesQuery,
  useSendImageMutation,
  useSendMessageMutation,
} from '../../app/Feature/API/Chat'
import { message } from 'antd'

const UserWithCustomerServices = () => {
  const [showChat, setShowChat] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [conversationsId, setConversationsId] = useState(0)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')

  const { data, refetch } = useGetUserMessagesQuery(conversationsId)
  const { data: convData } = useGetUserConversationsQuery()
  const { data: unReadMessageCount } =
    useGetUserConversationsQuery(conversationsId)
  const [sendMessage] = useSendMessageMutation()
  const [sendImage] = useSendImageMutation()  

  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (showChat) {
      const interval = setInterval(() => {
        refetch()
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [showChat, refetch])

  useEffect(() => {
    if (data?.messages) {
      setMessages(data?.messages)
    }
  }, [data])

  useEffect(() => {
    if (unReadMessageCount?.unread_messages_count) {
      setUnreadMessages(unReadMessageCount?.unread_messages_count)
    }
  }, [unReadMessageCount?.unread_messages_count])

  useEffect(() => {
    if (convData?.conversations) {
      setConversationsId(convData?.conversations?.map((e) => e.id))
    }
  }, [convData?.conversations])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, showChat])

  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      try {
        await sendMessage({ message: messageInput.trim() })
        setMessageInput('')
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  const handleSendImage = async (file) => {
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        message.success('The file must be an image.')
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
    <div>
      <div
        className="fixed bottom-5 right-5 bg-primary text-white w-12 h-12 z-[1000] flex items-center justify-center rounded-full cursor-pointer shadow-lg transition-all duration-300 hover:bg-second"
        onClick={() => setShowChat(!showChat)}
      >
        <span className="relative">
          <MdOutlineChat className="text-3xl" />
          {unreadMessages > 0 && (
            <span className="absolute top-[-18px] right-[25px] bg-white text-primary text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center">
              {unreadMessages}
            </span>
          )}
        </span>
      </div>

      {showChat && (
        <div className="fixed bottom-20 right-5 w-96 z-[600] bg-white shadow-2xl rounded-xl transition-transform transform">
          <div className="flex p-4 items-center gap-2 bg-primary rounded-t-xl">
            <BiSupport className="text-3xl text-white" />
            <div>
              <p className="text-lg font-bold text-white">
                Matroshka - Customer Support
              </p>
              <p className="text-sm text-gray-300">
                Welcome to Matroshka customer support chat!
              </p>
            </div>
          </div>
          <div className="h-80 overflow-auto space-y-4 px-6 py-2">
            {messages.map((message, index) => (
              <div key={index} className="flex flex-col">
                <div
                  className={`p-4 flex ${
                    message?.user?.type === 'user'
                      ? 'flex-row-reverse bg-blue-100 self-end rounded-tl-xl rounded-b-xl'
                      : 'flex-row bg-gray-200  self-start rounded-tr-xl rounded-b-xl'
                  }`}
                >
                  {message.message_type === 'image' ? (
                    <img
                      src={message.message}
                      alt="message"
                      className="w-full h-auto max-h-84 rounded-lg object-fill"
                    />
                  ) : (
                    <p className="text-sm">{message.message}</p>
                  )}
                </div>
                {message?.user?.type === 'user' && (
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <p className="text-sm text-gray-500">
                      {new Date(message.created_at).toLocaleTimeString(
                        'en-US',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        }
                      )}
                    </p>
                    {message.read_at ? (
                      <div className="flex items-center gap-1 text-green-500">
                        <IoCheckmarkDoneSharp className="text-xl" />
                        <p className="text-sm text-gray-500">
                          {new Date(message.read_at).toLocaleTimeString(
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
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-4 px-6 py-4 border-t">
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleSendImage(e.target.files[0])}
              />
              <FcAddImage className="text-3xl cursor-pointer" />
            </label>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-grow border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary text-white p-2 rounded-xl hover:bg-second focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <IoIosSend className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserWithCustomerServices
