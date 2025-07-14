/* eslint-disable react/prop-types */
import { Modal } from 'antd'
import 'antd/dist/reset.css'

const CustomModal = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
    >
      {children}
    </Modal>
  )
}

export default CustomModal
