import PropTypes from 'prop-types'
import { Drawer } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const SharedDrawer = ({ visible, width = 500, onClose, title, children }) => {
  return (
    <Drawer
      title={title}
      placement="right"
      closable={true}
      onClose={onClose}
      open={visible}
      width={width}
      closeIcon={<CloseOutlined />}
    >
      {children}
    </Drawer>
  )
}

// SharedDrawer.propTypes = {
//   visible: PropTypes.bool.isRequired,
//   width: PropTypes.number,
//   onClose: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   children: PropTypes.node,
// }

// SharedDrawer.defaultProps = {
//   width: 500,
// }

export default SharedDrawer
