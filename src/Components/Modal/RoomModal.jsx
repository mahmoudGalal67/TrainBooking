/* eslint-disable react/prop-types */
import { Modal, Tabs } from 'antd'
import { FaStar, FaWifi } from 'react-icons/fa'
import { GiConcentrationOrb } from 'react-icons/gi'
import {
  MdOutlineFastfood,
  MdOutlineHealthAndSafety,
  MdAirlineSeatIndividualSuite,
} from 'react-icons/md'
import { RiChatPrivateFill } from 'react-icons/ri'
import { TbIroning, TbAirConditioning } from 'react-icons/tb'
import { IoLogoNoSmoking, IoTvOutline } from 'react-icons/io5'
import { LuWheat, LuRefrigerator } from 'react-icons/lu'
import { FaHouseCircleCheck } from 'react-icons/fa6'

const { TabPane } = Tabs

const RoomModal = ({ open, room, onClose }) => {
  // if (!room) return null

  return (
    <Modal
      title={`Book ${room.name}`}
      open={open}
      onOk={onClose}
      onCancel={onClose}
      width={800}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          <div>
            <h3 className="text-xl font-bold mb-2">{room.name}</h3>
            <img src={room.image} alt={room.name} className="w-full mb-4" />
            <p className="mb-4">{room.description}</p>
            <p className="font-semibold mb-4">Price: ${room.price} / night</p>
            <p className="text-yellow-500 flex items-center">
              <FaStar /> <span className="ml-1">{room.rating}</span>
            </p>
          </div>
        </TabPane>
        <TabPane tab="Property amenities" key="2">
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <FaWifi />
            Free High Speed Internet (WI FI)
          </p>
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <GiConcentrationOrb />
            Concierge
          </p>
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <MdOutlineFastfood /> Free Breakfast in the room{' '}
          </p>
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <RiChatPrivateFill />
            Private check-in / check-out
          </p>
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <TbIroning />
            Ironing service
          </p>
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <IoLogoNoSmoking />
            Non-smoking Room
          </p>
        </TabPane>
        <TabPane tab="Room Feature" key="3">
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <LuWheat />
            Minibar
          </p>
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <FaHouseCircleCheck />
            Housekeeping
          </p>
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <LuRefrigerator /> Refrigerator
          </p>
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <TbAirConditioning />
            Air conditioning
          </p>
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <MdOutlineHealthAndSafety />
            Safe
          </p>
          <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
            <IoTvOutline />
            Flatscreen TV
          </p>
        </TabPane>
        <TabPane tab="Room Type" key="4">
          <ul>
            <p className="flex gap-2 text-xl text-gray-500 items-center mt-6">
              <MdAirlineSeatIndividualSuite />
              Bridal suite
            </p>
          </ul>
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default RoomModal
